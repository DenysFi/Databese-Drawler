import { ITableRelation } from "@/Types/table";

export function relationExist(relations: ITableRelation[], relation: ITableRelation): boolean {
    console.table(relations[0],)
    console.table(relation)
    return relations.some(r => {
        const existRelName = r.connectionName;
        const newRelName = relation.connectionName;
        return existRelName === newRelName || existRelName.split('-').reverse().join('-') === newRelName
    })
}

