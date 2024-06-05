import { FC } from "react";
import {
    IconRedo,
    IconUndo
} from "@douyinfe/semi-icons";
import { Tooltip } from "@douyinfe/semi-ui";
import { useAppDispatch, useAppSelector } from "@/redux-hooks";
import { canvasActionType, objectType } from "@/Constants/enums";
import { setPan } from "@/store/transform";
import { popUndoStack } from "@/store/undoRedo";
import { addRelation, addTable, removeTable, updateTable } from "@/store/tables";
import { isPan, isTable, isTableWithReltaions } from "@/utiles/typeGuards";

const UndoRedo: FC = () => {
    const { undo, redo } = useAppSelector(state => state.undoRedo)
    const dispatch = useAppDispatch();

    function handleUndo() {
        const undoElement = undo.slice(-1)[0];
        if (undoElement.actionType === canvasActionType.PANMOVE) {
            if (isPan(undoElement.element)) {
                dispatch(setPan(undoElement.element.pan!))
            }
        } else if (undoElement.actionType === canvasActionType.MOVE) {
            if (undoElement.objectType === objectType.Table && isTable(undoElement.element)) {
                dispatch(updateTable(undoElement.element))
            }
        } else if (undoElement.actionType === canvasActionType.DELETE) {
            if (undoElement.objectType === objectType.Table && isTableWithReltaions(undoElement.element)) {
                dispatch(addTable({ data: undoElement.element.table }))
                dispatch(addRelation(undoElement.element.relations))
            }
        } else if (undoElement.actionType === canvasActionType.ADD) {
            if (undoElement.objectType === objectType.Table && isTable(undoElement.element)) {
                dispatch(removeTable(undoElement.element.id))
            }
        }
        dispatch(popUndoStack())
    }

    return (
        <div className="flex">
            <Tooltip content='Undo' position="bottom">
                <button className="px-2 py-1 flex items-center hover:bg-[#cbd5e1] rounded" onClick={handleUndo}>
                    <IconUndo style={!undo.length ? { color: 'rgb(149, 152, 166)' } : {}} size="large" />
                </button>
            </Tooltip>
            <Tooltip content='Redo' position="bottom">
                <button className="px-2 py-1 flex items-center hover:bg-[#cbd5e1] rounded">
                    <IconRedo style={!redo.length ? { color: 'rgb(149, 152, 166)' } : {}} size="large" />
                </button>
            </Tooltip>
        </div>
    );
};

export default UndoRedo;