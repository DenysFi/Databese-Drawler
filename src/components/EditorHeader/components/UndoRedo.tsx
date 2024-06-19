import { canvasActionType, objectType } from "@/Constants/enums";
import { useAppDispatch, useAppSelector } from "@/redux-hooks";
import { addFields, addRelation, addTable, removeRelationByName, removeTable, updateTable } from "@/store/tables";
import { setPan } from "@/store/transform";
import { IUndoRedoAction, popRedoStack, popUndoStack, pushRedoStack, pushUndoStack } from "@/store/undoRedo";
import { isPan, isRelation, isTable, isTableWithFildsForUpdate, isTableWithReltaions } from "@/utiles/typeGuards";
import {
    IconRedo,
    IconUndo
} from "@douyinfe/semi-icons";
import { Tooltip } from "@douyinfe/semi-ui";
import { FC } from "react";


const UndoRedo: FC = () => {
    const { undo, redo } = useAppSelector(state => state.undoRedo)
    const dispatch = useAppDispatch();
    const { pan } = useAppSelector(state => state.transform)
    const { tables, relations } = useAppSelector(state => state.tables)

    function handleAction(action: IUndoRedoAction): IUndoRedoAction {
        const { element, actionType } = action;

        let returnAction: IUndoRedoAction;

        switch (actionType) {
            case canvasActionType.PANMOVE: {
                if (isPan(element)) {
                    dispatch(setPan(element.pan!))

                    returnAction = {
                        ...action,
                        element: {
                            pan: pan
                        }
                    }
                }
                break
            }
            case canvasActionType.MOVE: {
                if (action.objectType === objectType.Table && isTable(element)) {
                    dispatch(updateTable(element))
                    const id = element.id

                    //element.element is the last state of the table before moving
                    returnAction = {
                        ...action,
                        element: tables.find(t => t.id === id)!
                    }
                }
                break
            }
            case canvasActionType.DELETE: {
                if (action.objectType === objectType.Table && isTableWithReltaions(element)) {
                    dispatch(addTable({ data: element.table }))
                    dispatch(addRelation(element.relations))

                    returnAction = {
                        objectType: objectType.Table,
                        element,
                        actionType: canvasActionType.ADD,
                    }
                } else if (action.objectType === objectType.TableFields && isTableWithFildsForUpdate(element)) {

                    returnAction = {
                        objectType: objectType.TableFields,
                        element,
                        actionType: canvasActionType.ADD,
                    }

                    
                    // save current state of table, find relations and add them to returnAction


                    dispatch(addFields({ tid: element.tid, fields: element.fields }))
                    //clearing prev existing connections by name
                    element.relations.forEach(r => dispatch(removeRelationByName(r.connectionName)))
                    dispatch(addRelation(element.relations))
                }
                break
            }
            case canvasActionType.ADD: {
                if (action.objectType === objectType.Table && isTableWithReltaions(element)) {
                    returnAction = {
                        objectType: objectType.Table,
                        element,
                        actionType: canvasActionType.DELETE,
                    }
                    dispatch(removeTable(element.table.id))
                } else if (action.objectType === objectType.Relation && isRelation(element)) {
                    dispatch(removeRelationByName(element.connectionName))
                    returnAction = {
                        objectType: objectType.Relation,
                        element,
                        actionType: canvasActionType.DELETE,
                    }
                } else if (action.objectType === objectType.TableFields && isTableWithFildsForUpdate(element)) {
                    returnAction = {
                        objectType: objectType.TableFields,
                        element,
                        actionType: canvasActionType.DELETE,
                    }

                    

                    dispatch(addFields({ tid: element.tid, fields: element.fields }))
                    // //clearing prev existing connections by name
                    // element.element.relations.forEach(r => dispatch(removeRelationByName(r.connectionName)))
                    // dispatch(addRelation(element.element.relations))
                }
                break
            }
        }
        return returnAction!
    }

    function handleUndo() {
        //taking last action
        const undoElement = undo.slice(-1)[0];
        if (!undoElement) return;

        const redoElement = handleAction(undoElement);
        dispatch(popUndoStack())
        dispatch(pushRedoStack(redoElement));
    }

    function handleRedo() {
        //taking last action
        const redoElement = redo.slice(-1)[0];
        if (!redoElement) return;

        const undoElement = handleAction(redoElement)
        dispatch(popRedoStack());
        dispatch(pushUndoStack(undoElement))
    }

    return (
        <div className="flex">
            <Tooltip content='Undo' position="bottom">
                <button className="px-2 py-1 flex items-center hover:bg-[#cbd5e1] rounded" onClick={handleUndo}>
                    <IconUndo style={!undo.length ? { color: 'rgb(149, 152, 166)' } : {}} size="large" />
                </button>
            </Tooltip>
            <Tooltip content='Redo' position="bottom">
                <button className="px-2 py-1 flex items-center hover:bg-[#cbd5e1] rounded" onClick={handleRedo}>
                    <IconRedo style={!redo.length ? { color: 'rgb(149, 152, 166)' } : {}} size="large" />
                </button>
            </Tooltip>
        </div>
    );
};

export default UndoRedo;