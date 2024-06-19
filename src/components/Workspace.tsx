import { db } from "@/Constants/db";
import { saveType } from "@/Constants/enums";
import { useAppDispatch, useAppSelector } from "@/redux-hooks";
import { setSettingsValues } from "@/store/settings";
import { addRelation, addTable, setUniqueId } from "@/store/tables";
import { setPan, setScale } from "@/store/transform";
import { FC, useCallback, useEffect, useState } from "react";
import ControllPanel from "./EditorHeader/ControllPanel";
import Canvas from "./EditorCanvas/Canvas";

const Workspace: FC = () => {
    const dispatch = useAppDispatch();
    const { uniqueId: lastId, tables, relations } = useAppSelector(state => state.tables)
    const { pan, scale } = useAppSelector(state => state.transform)
    const settings = useAppSelector(state => state.settings)
    const [_, setSaving] = useState(saveType.NONE)

    const loadData = useCallback(async () => {
        const data = await db.diagrams.orderBy('lastModified').last();
        if (data) {
            const { pan, scale, relations, tables, lastModified, lastId } = data;
            dispatch(setPan(pan))
            dispatch(addTable({ data: tables }))
            dispatch(setUniqueId(lastId))
            dispatch(setScale(scale))
            dispatch(addRelation(relations))
            dispatch(setSettingsValues({ lastModified }))
        }

    }, [dispatch])

    const save = useCallback(async () => {
        const count = await db.diagrams.count()
        const lastModified = Date.now().toString();
        setSaving(saveType.SAVING)
        if (!count) {
            await db.diagrams.add({
                lastModified,
                tables,
                relations,
                pan,
                scale,
                lastId
            })

        } else {
            await db.diagrams.update(count, {
                lastModified,
                tables,
                relations,
                pan,
                scale,
                lastId
            })
        }
        dispatch(setSettingsValues({ lastModified }))
        setSaving(saveType.SAVED)
    }, [dispatch, tables, pan, relations, scale, lastId])

    //Autosave on any data changes with debounce 
    useEffect(() => {
        if (!settings.autosave) return;

        const timeoutId = setTimeout(save, 300)
        return () => clearTimeout(timeoutId)
    }, [save, settings.autosave])


    useEffect(() => {
        const timeoutId = setTimeout(loadData)

        return () => clearTimeout(timeoutId)
    }, [loadData])

    return (
        <div className='app-wrapper h-[100vh] overflow-hidden theme'>
            <ControllPanel save={save} />
            <div className='flex h-full overflow-hidden'>
                {/* <EditorSideBar /> */}
                <div className='relative flex grow '>
                    <Canvas />
                </div>
            </div>
        </div>
    );
};

export default Workspace;