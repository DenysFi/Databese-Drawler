import { tableDefaultRowHeight, tableDefaultWidth, tableHeaderHeight } from "@/Constants/constants";
import { ITableRelation } from "@/Types/table";
import { useAppSelector } from "@/redux-hooks";
import { FC } from "react";
interface IRelation {
    data: ITableRelation
}

const Relation: FC<IRelation> = ({ data }) => {
    const { tables } = useAppSelector(state => state.tables);
    const { scale } = useAppSelector(state => state.transform);
    const width = tableDefaultWidth;
    let path = ''
    const table1 = tables.find(t => t.id === data.startTableId)!
    const table2 = tables.find(t => t.id === data.endTableId)!

    const x1 = table1.x
    const x2 = table2.x
    const y1 = table1.y + tableHeaderHeight + ((data.startTableField * tableDefaultRowHeight) + tableDefaultRowHeight) - tableDefaultRowHeight / 2;
    const y2 = table2.y + tableHeaderHeight + ((data.endTableField * tableDefaultRowHeight) + tableDefaultRowHeight) - tableDefaultRowHeight / 2;
    const midX = (x2 + x1 + width) / 2;
    let radius = 10;

    if (Math.abs(y1 - y2) <= 30) {
        radius = Math.abs(y2 - y1) / 3;
        // если радиус оказался меньше двух, то рисовать полукруг нет смысла, и мы рисуем прямую линию
        if (radius <= 2) {
            if (x1 + width <= x2) path = `M ${x1 + width} ${y1} L ${x2} ${y2 + 0.1}`;
            else if (x2 + width < x1)
                path = `M ${x1} ${y1} L ${x2 + width} ${y2}`;
        }
    }
    if (y1 < y2) {
        if (x1 + width < x2) {
            path = `M ${x1 + width} ${y1} 
            L ${midX - radius} ${y1 + 0.1} 
            A ${radius} ${radius} 0 0 1 ${midX} ${y1 + radius} 
            L ${midX} ${y2 - radius} 
            A ${radius} ${radius} 0 0 0 ${midX + radius} ${y2} 
            L ${x2} ${y2}`;
        } else if (x1 >= x2 + width) {
            path = `M ${x1} ${y1} 
            L ${midX + radius} ${y1 + 0.1} 
            A ${radius} ${radius} 0 0 0 ${midX} ${y1 + radius} 
            L ${midX} ${y2 - radius} 
            A ${radius} ${radius} 0 0 1 ${midX - radius} ${y2} 
            L ${x2} ${y2}`;
        } else if (x1 > x2 && x2 <= x1 + width) {
            const x2offset = x2 - 20;
            path = `M ${x1} ${y1} 
            L ${x2offset} ${y1 + 0.1} 
            A ${radius} ${radius} 0 0 0 ${x2offset - radius} ${y1 + radius} 
            L ${x2offset - radius} ${y2 - radius} 
            A ${radius} ${radius} 0 0 0 ${x2offset} ${y2} 
            L ${x2} ${y2}`;
        } else if (x2 > x1 && x2 <= x1 + width) {
            const x2offset = x2 + width + 20;
            path = `M ${x1} ${y1} 
            L ${x2offset} ${y1 + 0.1} 
            A ${radius} ${radius} 0 0 1 ${x2offset + radius} ${y1 + radius} 
            L ${x2offset + radius} ${y2 - radius} 
            A ${radius} ${radius} 0 0 1 ${x2offset} ${y2} 
            L ${x2} ${y2}`;
        }
    } else {
        if (x1 + width < x2) {
            path = `M ${x1 + width} ${y1} 
            L ${midX - radius} ${y1 + 0.1} 
            A ${radius} ${radius} 0 0 0 ${midX} ${y1 - radius} 
            L ${midX} ${y2 + radius} 
            A ${radius} ${radius} 0 0 1 ${midX + radius} ${y2} 
            L ${x2} ${y2}`;
        } else if (x1 >= x2 + width) {
            path = `M ${x1} ${y1} 
            L ${midX + radius} ${y1 + 0.1} 
            A ${radius} ${radius} 0 0 1 ${midX} ${y1 - radius} 
            L ${midX} ${y2 + radius} 
            A ${radius} ${radius} 0 0 0 ${midX - radius} ${y2} 
            L ${x2} ${y2}`;
        } else if (x1 > x2 && x2 <= x1 + width) {
            const x2offset = x2 - 20;
            path = `M ${x1} ${y1} 
            L ${x2offset} ${y1 + 0.1} 
            A ${radius} ${radius} 0 0 1 ${x2offset - radius} ${y1 - radius} 
            L ${x2offset - radius} ${y2 + radius} 
            A ${radius} ${radius} 0 0 1 ${x2offset} ${y2} 
            L ${x2} ${y2}`;
        } else if (x2 > x1 && x2 <= x1 + width) {
            const x2offset = x2 + width + 20;
            path = `M ${x1} ${y1} 
            L ${x2offset} ${y1 + 0.1} 
            A ${radius} ${radius} 0 0 0 ${x2offset + radius} ${y1 - radius} 
            L ${x2offset + radius} ${y2 + radius} 
            A ${radius} ${radius} 0 0 0 ${x2offset} ${y2} 
            L ${x2} ${y2}`;
        }
    }

    return (
        <g className="select-none">
            <path d={path} strokeWidth='2px' stroke="gray" fill="none" />
        </g>
    );
};

export default Relation;