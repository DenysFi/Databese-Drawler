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

interface ITableFieldDetails {
    nulable: boolean,
    primary: boolean,
    unique: boolean,
    defaultValue: string,
    autoinc: boolean
}
