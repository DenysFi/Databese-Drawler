import { canvasActionType, objectType } from "@/Constants/enums";
import { ITable, ITableRelations, Itransform } from "@/Types/table";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type elementTypesUnion = Partial<Itransform> | ITableRelations | ITable
interface IUndoRedoAction {
    actionType: canvasActionType,
    objectType: objectType,
    element: elementTypesUnion
}

interface IUndoRedo {
    undo: IUndoRedoAction[],
    redo: IUndoRedoAction[]
}

const initialState: IUndoRedo = {
    undo: [],
    redo: []
}
const undoRedoSlice = createSlice(
    {
        name: 'undoRedo',
        initialState,
        reducers: {
            pushUndoStack: (state, action: PayloadAction<IUndoRedoAction>) => {
                state.undo.push(action.payload)
            },
            popUndoStack: (state) => {
                state.undo.pop()
            }
        }
    }
)
export default undoRedoSlice.reducer;
export const { pushUndoStack, popUndoStack } = undoRedoSlice.actions;