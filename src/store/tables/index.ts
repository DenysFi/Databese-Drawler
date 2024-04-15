import { tableDefaultColor } from "@/Constants/constants";
import { ITable, ITableField } from "@/Types/table";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ITables {
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
    payload: Partial<ITableField> & { id: number },
}
const initialState: ITables = {
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
                id: state.tables.length,
                name: `Table_${state.tables.length}`,
                comment: '',
                x: (20 - tx) / scale,
                y: (20 - ty) / scale,
                indices: '',
                fields: [
                    { name: 'id', type: 'INT', details: { nulable: false, primary: true, autoinc: true, unique: true, defaultValue: '' } },
                ],
                color: tableDefaultColor
            }
            state.tables.push(newTable);
        },
        removeTable(state, action: PayloadAction<number>) {
            state.tables = state.tables.filter(tb => tb.id !== action.payload)
        },
        updateTable(state, { payload }: IUpdateTableAction) {
            const { id, ...values } = payload;
            console.log(id, values);
            state.tables[id] = { ...state.tables[id], ...values };
        },
        updateField(state, action) {

        },
        addField(state, action) {

        },
        removeField(state, action: IRemoveTableAction) {
            const { tid, fid } = action.payload;
            state.tables[tid].fields = state.tables[tid].fields.filter((_, i) => i !== fid)
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