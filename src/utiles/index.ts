import { ITableRelation } from "@/Types/table";

export function relationExist(relations: ITableRelation[], relation: ITableRelation): boolean {

    return relations.some(r => (
        (r.startTableField === relation.startTableField
            && r.startTableId === relation.startTableId)
        ||
        (r.startTableField === relation.endTableField
            && r.startTableId) === relation.endTableId)
    )
}