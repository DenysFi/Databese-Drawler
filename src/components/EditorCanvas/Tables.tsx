import Table from "./Table";
import { FC, memo, MouseEvent, useCallback } from "react";
import { ITable } from '@/Types/table';
import { ILinking } from "./Canvas";
import { canvasActionType, objectType } from "@/Constants/enums";
import { useAppDispatch, useAppSelector } from "@/redux-hooks";
import { Toast } from "@douyinfe/semi-ui";
import { removeTable } from "@/store/tables";
import { nullRedoStack, pushUndoStack } from "@/store/undoRedo";
import { nullSelected } from "@/store/selected";
import { findRelationsByTableId } from "@/store/tables/helpers";

interface IFCTables {
    tables: ITable[],
    onMouseDownOnElement: (event: MouseEvent<SVGForeignObjectElement>, table: ITable, type: objectType) => void;
    onStartLinking: (data: ILinking) => void;
    setHoveredTable: (data: { tid: number, fid: number }) => void
}

const Tables: FC<IFCTables> = memo(({ onMouseDownOnElement, onStartLinking, setHoveredTable, tables }) => {
    const { selected } = useAppSelector(state => state.selected)
    const { relations } = useAppSelector(state => state.tables)
    const dispatch = useAppDispatch();


    const handleTableDelete = useCallback((tableData: ITable) => {
        const findedRelations = findRelationsByTableId(relations, tableData.id)

        Toast.success('Table deleted succesfully!')
        dispatch(removeTable(tableData.id))

        dispatch(pushUndoStack({
            element: { table: tableData, relations: findedRelations },
            objectType: objectType.Table,
            actionType: canvasActionType.DELETE
        }))
        dispatch(nullRedoStack())
        dispatch(nullSelected())
    }, [dispatch, relations])

    return (
        <>
            {tables.map((f) => <Table
                onMouseDownOnElement={onMouseDownOnElement}
                onStartLinking={onStartLinking}
                setHoveredTable={setHoveredTable}
                handleTableDelete={handleTableDelete}
                key={f.id}
                tableData={f}
                isSelected={selected.id === f.id}
            />
            )}
        </>
    );
});

export default Tables;