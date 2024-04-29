import Table from "./Table";
import { FC, memo, MouseEvent } from "react";
import { ITable } from '@/Types/table';
import { ILinking } from "./Canvas";
import { objectType } from "@/Constants/enums";
import { useAppSelector } from "@/redux-hooks";

interface IFCTables {
    tables: ITable[],
    onMouseDownOnElement: (event: MouseEvent<SVGForeignObjectElement>, table: ITable, type: objectType) => void;
    onStartLinking: (data: ILinking) => void;
    setHoveredTable: (data: { tid: number, fid: number }) => void
}

const Tables: FC<IFCTables> = memo(({ onMouseDownOnElement, onStartLinking, setHoveredTable, tables }) => {
    const { selected } = useAppSelector(state => state.selected)
    return (
        <>
            {tables.map((f) => <Table
                onMouseDownOnElement={onMouseDownOnElement}
                onStartLinking={onStartLinking}
                setHoveredTable={setHoveredTable}
                key={f.id}
                tableData={f}
                isSelected={selected.id === f.id}
            />
            )}
        </>
    );
});

export default Tables;