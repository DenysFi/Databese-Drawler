import { FieldsWiithRelations, ITable, ITableRelation, ITableRelations, Itransform } from "@/Types/table";
import { elementTypesUnion } from "@/store/undoRedo";

export function isPan(object: elementTypesUnion): object is Partial<Itransform> {
    return 'pan' in object;
}
export function isTableWithReltaions(object: elementTypesUnion): object is ITableRelations {
    return 'table' in object && 'table' in object;
}
export function isTable(object: elementTypesUnion): object is ITable {
    return 'fields' in object
}
export function isRelation(object: elementTypesUnion): object is ITableRelation {
    return 'connectionName' in object
}
export function isTableWithFildsForUpdate(object: elementTypesUnion): object is FieldsWiithRelations {
    return 'tid' in object && 'fields' in object && 'relations' in object
}
