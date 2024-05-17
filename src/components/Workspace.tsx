import { FC, useCallback, useEffect, useState } from "react";
import Canvas from "./EditorCanvas/Canvas";
import ControllPanel from "./EditorHeader/ControllPanel";
import EditorSideBar from "./EditorSidebar/EditorSideBar";
import { db } from "@/Constants/db";
import { useAppDispatch, useAppSelector } from "@/redux-hooks";
import { setPan, setScale } from "@/store/transform";
import { addRelation, addTable, setUniqueId } from "@/store/tables";
import { setSettingsValues } from "@/store/settings";
import { saveType } from "@/Constants/enums";

const Workspace: FC = () => {
    const dispatch = useAppDispatch();
    const { uniqueId: lastId, tables, relations } = useAppSelector(state => state.tables)
    const { pan, scale } = useAppSelector(state => state.transform)
    const settings = useAppSelector(state => state.settings)
    const [saving, setSaving] = useState(saveType.NONE)

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

    useEffect(() => {
        if (!settings.autosave) return;

        save()
    }, [save, settings.autosave])


    useEffect(() => {
        loadData()
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