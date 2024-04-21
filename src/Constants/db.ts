import { ITable, ITableRelation } from "@/Types/table";
import Dexie, { Table } from "dexie";

interface IDiagrams {
    id?: number,
    lastModified: string,
    tables: ITable[],
    relations: ITableRelation[],
    pan: { x: number, y: number }
    scale: number,
    lastId: number
}

class DbDrawler extends Dexie {
    diagrams!: Table<IDiagrams>;

    constructor() {
        super('dbdrawler');
        this.version(5).stores({
            diagrams: '++id, lastModified, scale, tables, relationships'
        })
    }
}
export const db = new DbDrawler();