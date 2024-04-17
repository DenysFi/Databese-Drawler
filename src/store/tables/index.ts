import { tableDefaultColor } from "@/Constants/constants";
import { connectionType } from "@/Constants/enums";
import { ITable, ITableField, ITableRelation } from "@/Types/table";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ITables {
    uniqueId: number
    tables: ITable[]
    relations: ITableRelation[]
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
    uniqueId: 2,
    tables: [
        {
            id: 0,
            name: 'test1',
            x: 10,
            y: 20,
            comment: 'Comment',
            indices: 'ind',
            fields: [
                { name: 'id', type: 'INT', details: { nulable: false, primary: true, autoinc: true, unique: true, defaultValue: '' } },
                { name: 'test', type: 'CHAR', details: { nulable: false, primary: true, autoinc: true, unique: true, defaultValue: '' } },
            ],
            color: tableDefaultColor
        },
        {
            id: 1,
            name: 'test2',
            x: 400,
            y: 70,
            comment: '',
            indices: '',
            fields: [
                { name: 'id', type: 'INT', details: { nulable: false, primary: true, autoinc: true, unique: true, defaultValue: '' } },
                { name: 'test', type: 'CHAR', details: { nulable: false, primary: true, autoinc: true, unique: true, defaultValue: '' } },
            ],
            color: tableDefaultColor
        },
        // {
        //     id: 3,
        //     name: 'test',
        //     x: 200,
        //     y: 70,
        //     comment: '',
        //     indices: '',
        //     fields: [
        //         { name: 'id', type: 'INT', details: { nulable: false, primary: true, autoinc: true, unique: true, defaultValue: '' } },
        //         { name: 'test', type: 'CHAR', details: { nulable: false, primary: true, autoinc: true, unique: true, defaultValue: '' } },
        //     ],
        //     color: tableDefaultColor
        // }
    ],
    relations: [
        {
            startTableId: 0,
            startTableField: 0,
            endTableField: 1,
            endTableId: 1,
            connectionName: connectionType.ONE_TO_ONE
        },
        // {
        //     startTableId: 0,
        //     startTableField: 0,
        //     endTableId: 3,
        //     endTableField: 0,
        //     connectionName: connectionType.ONE_TO_ONE
        // }
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