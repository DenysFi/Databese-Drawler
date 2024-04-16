import { tableDefaultColor } from "@/Constants/constants";
import { ITable, ITableField } from "@/Types/table";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ITables {
    uniqueId: number
    tables: ITable[]
}

interface IAddTableAction {
    payload: {
        x: number,
        y: number,
        scale: number
    }
}

interface IRemoveTableAction {
    payload: {
        tid: number,
        fid: number,
    }
}

interface IUpdateTableAction {
    payload: Partial<ITableField> & { id: number, x: number, y: number },
}

const initialState: ITables = {
    uniqueId: 1,
    tables: [
        {
            id: 0,
            name: 'test',
            x: 10,
            y: 20,
            comment: 'Comment',
            indices: 'ind',
            fields: [
                { name: 'id', type: 'INT', details: { nulable: false, primary: true, autoinc: true, unique: true, defaultValue: '' } },
                { name: 'test', type: 'CHAR', details: { nulable: false, primary: true, autoinc: true, unique: true, defaultValue: '' } },
            ],
            color: tableDefaultColor
        }
    ]
}



const tablesSlice = createSlice({
    name: 'tables',
    initialState,
    reducers: {
        addTable(state, action: IAddTableAction) {
            const { x: tx, y: ty, scale } = action.payload
            const newTable = {
                id: state.uniqueId,
                name: `Table_${state.uniqueId}`,
                comment: '',
                x: (20 - tx) / scale,
                y: (20 - ty) / scale,
                indices: '',
                fields: [
                    { name: 'id', type: 'INT', details: { nulable: false, primary: true, autoinc: true, unique: true, defaultValue: '' } },
                ],
                color: tableDefaultColor
            }
            state.uniqueId += 1;
            state.tables.push(newTable);
        },
        removeTable(state, action: PayloadAction<number>) {
            state.tables = state.tables.filter(tb => tb.id !== action.payload)
        },
        updateTable(state, { payload }: IUpdateTableAction) {
            const { id, ...values } = payload;
            state.tables = state.tables.map(t => t.id === id ? { ...t, ...values } : t);
        },
        updateField(state, action) {

        },
        addField(state, action) {

        },
        removeField(state, action: IRemoveTableAction) {
            const { tid, fid } = action.payload;
            state.tables = state.tables.map(t => t.id === tid ? { ...t, fields: t.fields.filter((_, i) => i !== fid) } : t)
        },
    }
})
export default tablesSlice.reducer;
export const {
    addTable,
    removeTable,
    updateTable,
    updateField,
    addField,
    removeField
} = tablesSlice.actions