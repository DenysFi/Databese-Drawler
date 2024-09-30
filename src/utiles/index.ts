import { ITableRelation } from "@/Types/table";

export function relationExist(relations: ITableRelation[], relation: ITableRelation): boolean {
    console.table(relations[0],)
    console.table(relation)
    return relations.some(r => {
        const existRelName = r.connectionName;
        const newRelName = relation.connectionName;
        console.log(existRelName, newRelName);
        return existRelName === newRelName || existRelName.split('-').reverse().join('-') === newRelName
    })
}

export function findUnique<T>(array: T[]): T[] {
    return array.filter((item) => array.indexOf(item) === array.lastIndexOf(item))
}
export const is_mobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/BlackBerry/i);
