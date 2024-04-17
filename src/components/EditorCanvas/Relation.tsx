import { tableDefaultRowHeight, tableDefaultWidth, tableHeaderHeight } from "@/Constants/constants";
import { ITableRelation } from "@/Types/table";
import { useAppSelector } from "@/redux-hooks";
import { calcPath } from "@/utiles/calckPath";
import { FC } from "react";
interface IRelation {
    data: ITableRelation
}

const Relation: FC<IRelation> = ({ data }) => {
    const { tables } = useAppSelector(state => state.tables);
    const table1 = tables.find(t => t.id === data.startTableId)!
    const table2 = tables.find(t => t.id === data.endTableId)!

    return (
        <g className="select-none">
            <path
                d={calcPath({
                    width: tableDefaultWidth,
                    x1: table1.x,
                    x2: table2.x,
                    y1: table1.y + tableHeaderHeight + ((data.startTableField * tableDefaultRowHeight) + tableDefaultRowHeight) - tableDefaultRowHeight / 2,
                    y2: table2.y + tableHeaderHeight + ((data.endTableField * tableDefaultRowHeight) + tableDefaultRowHeight) - tableDefaultRowHeight / 2
                })} strokeWidth='2px' stroke="gray" fill="none" />
        </g>
    );
};

export default Relation;