import { ITable, ITableRelations, Itransform } from "@/Types/table";
type union = Partial<Itransform> | ITableRelations | ITable
export function isPan(object: union): object is Partial<Itransform> {
    return 'pan' in object;
}
export function isTableWithReltaions(object: union): object is ITableRelations {
    return 'table' in object && 'table' in object;
}
export function isTable(object: union): object is ITable {
    return 'fields' in object
}