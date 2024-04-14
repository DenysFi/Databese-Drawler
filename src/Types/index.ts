export interface ITable {
    id: number,
    name: string,
    x: number,
    y: number,
    fields: { name: string, type: string }[]
    color: string
}