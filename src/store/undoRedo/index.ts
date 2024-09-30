import { canvasActionType, objectType } from "@/Constants/enums";
import { FieldsWiithRelations, ITable, ITableRelation, ITableRelations, Itransform } from "@/Types/table";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export type elementTypesUnion = Partial<Itransform> | ITableRelations | ITable | ITableRelation | FieldsWiithRelations
export interface IUndoRedoAction {
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
            },
            pushRedoStack: (state, action: PayloadAction<IUndoRedoAction>) => {
                state.redo.push(action.payload)
            },
            popRedoStack: (state) => {
                state.redo.pop()
            },
            nullRedoStack: (state) => {
                state.redo = []
            },
            nullUndoStack: (state) => {
                state.undo = []
            }

        }
    }
)
export default undoRedoSlice.reducer;
export const {
    pushUndoStack,
    popUndoStack,
    pushRedoStack,
    popRedoStack,
    nullRedoStack,
    nullUndoStack
} = undoRedoSlice.actions;