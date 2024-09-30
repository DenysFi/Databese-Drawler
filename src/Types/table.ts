import { connectionType } from "@/Constants/enums"

export interface ITable {
    id: number,
    name: string,
    x: number,
    y: number,
    fields: ITableField[]
    color: string
    comment: string,
    indices: string
}

export interface ITableField {
    name: string,
    type: string
    details: ITableFieldDetails
}

export interface ITableRelation {
    startTableId: number,
    endTableId: number,
    startTableField: number,
    endTableField: number,
    connectionType: connectionType,
    connectionName: string
}
export interface ITableFieldDetails {
    nulable: boolean,
    primary: boolean,
    unique: boolean,
    defaultValue: string,
    autoinc: boolean
}

export interface Itransform {
    pan: { x: number, y: number }
    scale: number
}

export interface ITableRelations {
    table: ITable,
    relations: ITableRelation[]
}


export type FieldsWiithRelations = {
    tid: number,
    fields: ITableField[],
    relations: ITableRelation[]
    oldRelations?: ITableRelation[]
}
