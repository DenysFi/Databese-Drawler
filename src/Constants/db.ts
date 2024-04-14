import Dexie, { Table } from "dexie";

interface IDiagrams {
    id?: number,
    lastModified: string,
    tables: [],
    relationships: [],
    pan: { x: number, y: number }
    zoom: number
}

class DbDrawler extends Dexie {

    diagrams!: Table<IDiagrams>;

    constructor() {
        super('dbdrawler');
        this.version(5).stores({
            diagrams: '++id, lastModified'
        })
    }
}
export const db = new DbDrawler();