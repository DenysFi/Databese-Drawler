import { ITable, ITableField, ITableRelation } from "@/Types/table";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createNewTable, tableHasRelations } from "./helpers";

interface ITables {
    uniqueId: number
    tables: ITable[]
    relations: ITableRelation[],
}
type IAddTableAction = {
    x?: number,
    y?: number,
    scale?: number
    data?: ITable[] | ITable
}

type IRemoveTableAction = {
    tid?: number,
    fid?: number,
    fields?: ITableField[],
    relations?: ITableRelation[]
}

type IUpdateTableAction =
    Partial<ITable>

type ITableRelationAddAction = ITableRelation | ITableRelation[];

const initialState: ITables = {
    uniqueId: 2,
    tables: [
        // {
        //     id: 0,
        //     name: 'test0',
        //     x: 10,
        //     y: 20,
        //     comment: 'Comment',
        //     indices: 'ind',
        //     fields: [
        //         { name: 'id', type: dataType.INT, details: { nulable: false, primary: true, autoinc: true, unique: true, defaultValue: '' } },
        //         { name: 'test', type: dataType.CHAR, details: { nulable: false, primary: false, autoinc: true, unique: true, defaultValue: '' } },
        //     ],
        //     color: tableDefaultColor
        // },
        // {
        //     id: 1,
        //     name: 'test1',
        //     x: 500,
        //     y: 70,
        //     comment: '',
        //     indices: '',
        //     fields: [
        //         { name: 'id', type: dataType.INT, details: { nulable: false, primary: true, autoinc: true, unique: true, defaultValue: '' } },
        //         { name: 'test', type: dataType.DATATIME, details: { nulable: false, primary: false, autoinc: true, unique: true, defaultValue: '' } },
        //     ],
        //     color: tableDefaultColor
        // },
        // {
        //     id: 2,
        //     name: 'test2',
        //     x: 200,
        //     y: 270,
        //     comment: '',
        //     indices: '',
        //     fields: [
        //         { name: 'id', type: dataType.INT, details: { nulable: false, primary: true, autoinc: true, unique: true, defaultValue: '' } },
        //         { name: 'test', type: dataType.CHAR, details: { nulable: true, primary: false, autoinc: false, unique: false, defaultValue: '' } },
        //     ],
        //     color: tableDefaultColor
        // }
    ],
    relations: [
        // {
        //     startTableId: 0,
        //     startTableField: 0,
        //     endTableField: 1,
        //     endTableId: 1,
        //     connectionName: connectionType.ONE_TO_ONE
        // },
        // {
        //     startTableId: 0,
        //     startTableField: 0,
        //     endTableId: 2,
        //     endTableField: 0,
        //     connectionName: connectionType.MANY_TO_MANY
        // }
    ],

}

const tablesSlice = createSlice({
    name: 'tables',
    initialState,
    reducers: {
        setUniqueId(state, action: PayloadAction<number>) {
            state.uniqueId = action.payload + 1;
        },
        addTable(state, action: PayloadAction<IAddTableAction>) {
            if (action.payload.data !== undefined) {
                if (Array.isArray(action.payload.data)) {
                    state.tables = [...action.payload.data];
                }
                else {
                    state.tables.push(action.payload.data)
                }
            } else {
                const { x, y, scale } = action.payload;
                if (x !== undefined && y !== undefined && scale !== undefined) {
                    const newTable = createNewTable(state.uniqueId, x, y, scale);
                    state.uniqueId += 1;
                    state.tables.push(newTable);

                    //return new table from action after dispatching
                    action.payload.data = newTable;
                }
            }
        },
        removeTable(state, action: PayloadAction<number>) {
            const tid = action.payload
            state.tables = state.tables.filter(tb => tb.id !== tid)
            state.relations = state.relations.filter(rel => !(rel.startTableId === tid || rel.endTableId === tid))
        },
        updateTable(state, action: PayloadAction<IUpdateTableAction>) {
            const { id, ...values } = action.payload;
            state.tables = state.tables.map(t => t.id === id ? { ...t, ...values } : t);
        },
        // @ts-expect-error  @ts-ignore (will be fixed in the next step)
        updateField(state, action) {

        },
        addFields(state, action) {
            const { tid, fields } = action.payload
            state.tables = state.tables.map(t => t.id === tid ? { ...t, fields: fields } : t)
        },
        removeField(state, action: PayloadAction<IRemoveTableAction>) {
            const { tid, fid } = action.payload;

            const oldFields = JSON.parse(JSON.stringify(state.tables.find(t => t.id === tid)!.fields));
            const oldRelations = JSON.parse(JSON.stringify(state.relations.filter(rel => (rel.startTableId === tid || rel.endTableId === tid))))

            state.tables = state.tables.map(t => t.id === tid ? { ...t, fields: t.fields.filter((_, i) => i !== fid) } : t)
            if (tableHasRelations(tid!, state.relations)) {
                state.relations = state.relations.map(r => {
                    if (r.startTableId === tid) {
                        if (r.startTableField > fid!) r.startTableField = r.startTableField - 1
                        else if (r.startTableField === fid! || r.endTableField === fid!) return null;
                    } else if (r.endTableId === tid) {
                        if (r.endTableField > fid!) r.endTableField = r.endTableField - 1
                        else if (r.endTableField === fid!) return null;
                    }
                    return r;
                }).filter(Boolean) as ITableRelation[];
            }

            //return old table fields and old relations to avoid necessary rerenderings in <Table> component
            action.payload.fields = oldFields
            action.payload.relations = oldRelations
        },
        addRelation(state, action: PayloadAction<ITableRelationAddAction>) {
            if (Array.isArray(action.payload)) {
                state.relations = [...state.relations, ...action.payload]
                console.log(action.payload);
            } else {
                state.relations.push(action.payload)
            }
        },
        removeRelationByName(state, action: PayloadAction<string>) {
            state.relations = state.relations.filter(r => r.connectionName !== action.payload)
        }
    }
})

export default tablesSlice.reducer;
export const {
    addTable,
    removeTable,
    updateTable,
    updateField,
    addFields,
    removeField,
    addRelation,
    setUniqueId,
    removeRelationByName
} = tablesSlice.actions