import { tableDefaultColor } from "@/Constants/constants";
import { ITable, ITableRelation } from "@/Types/table";

export function createNewTable(uniqueId: number, tx: number, ty: number, scale: number): ITable {
    const xOffset = 20;
    const yOffset = 20;
    return {
        id: uniqueId,
        name: `Table_${uniqueId}`,
        comment: '',
        x: (xOffset - tx) / scale,
        y: (yOffset - ty) / scale,
        indices: '',
        fields: [
            { name: 'id', type: 'INT', details: { nulable: false, primary: true, autoinc: true, unique: true, defaultValue: '' } },
        ],
        color: tableDefaultColor
    }
}
export function tableHasRelations(tid: number, relations: ITableRelation[]): boolean {
    return relations.some(rel => (rel.startTableId === tid || rel.endTableId === tid));
}