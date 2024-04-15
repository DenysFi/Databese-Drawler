import { tableDefaultColor } from "@/Constants/constants";
import { ITable } from "@/Types/table";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ITables {
    tables: ITable[]
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
        addTable(state) {
            const newTable = {
                id: state.tables.length,
                name: `Table_${state.tables.length}`,
                comment: '',
                x: 10,
                y: 10,
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
        updateTable(state, action) {
            const { id, ...values } = action.payload;
            console.log(id, values);
            state.tables[id] = { ...state.tables[id], ...values };
        },
        updateField(state, action) {

        },
        addField(state, action) {

        },
        removeField(state, action) {
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