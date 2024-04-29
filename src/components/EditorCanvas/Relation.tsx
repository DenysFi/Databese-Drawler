import { tableDefaultRowHeight, tableDefaultWidth, tableHeaderHeight } from "@/Constants/constants";
import { connectionType } from "@/Constants/enums";
import { ITableRelation } from "@/Types/table";
import { useAppSelector } from "@/redux-hooks";
import { calcPath } from "@/utiles/calckPath";
import { FC, useEffect, useRef, useState } from "react";
interface IRelation {
    data: ITableRelation
}

const Relation: FC<IRelation> = ({ data }) => {
    const { tables } = useAppSelector(state => state.tables);
    const table1 = tables.find(t => t.id === data.startTableId)!
    const table2 = tables.find(t => t.id === data.endTableId)!
    const relationRef = useRef<SVGPathElement>(null);
    const circleRadius = 10;
    const [circlesCoords, setCirclesCoords] = useState({
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0
    })
    const [fromText, toText] = getRelationType(data.connectionType);
    useEffect(() => {
        if (!relationRef.current) return;

        const totalLength = relationRef.current.getTotalLength();
        const coord1 = relationRef.current.getPointAtLength(32);
        const coord2 = relationRef.current.getPointAtLength(totalLength - 32);

        setCirclesCoords({
            x1: coord1.x,
            x2: coord2.x,
            y1: coord1.y,
            y2: coord2.y
        })
    }, [tables])

    return (
        <g
            className="select-none group hover:cursor-pointer"
        >
            <path
                ref={relationRef}
                className="group-hover:stroke-sky-700"
                d={calcPath({
                    width: tableDefaultWidth,
                    x1: table1.x,
                    x2: table2.x,
                    y1: table1.y + tableHeaderHeight + ((data.startTableField * tableDefaultRowHeight) + tableDefaultRowHeight) - tableDefaultRowHeight / 2,
                    y2: table2.y + tableHeaderHeight + ((data.endTableField * tableDefaultRowHeight) + tableDefaultRowHeight) - tableDefaultRowHeight / 2
                })} strokeWidth='2px' stroke="gray" fill="none" />
            <circle className="group-hover:fill-sky-700" cx={circlesCoords.x1} cy={circlesCoords.y1} r={circleRadius} stroke="none" fill="gray" />
            <text x={circlesCoords.x1} y={circlesCoords.y1} fill="white" textAnchor="middle" dominantBaseline='middle'>{fromText}</text>
            <circle className="group-hover:fill-sky-700" cx={circlesCoords.x2} cy={circlesCoords.y2} r={circleRadius} stroke="none" fill="gray" />
            <text x={circlesCoords.x2} y={circlesCoords.y2} fill="white" textAnchor="middle" dominantBaseline='middle'>{toText}</text>
        </g>
    );
};

export default Relation;

function getRelationType(type: connectionType): string[] {
    switch (type) {
        case connectionType.MANY_TO_MANY:
            return ['n', 'n']
        case connectionType.ONE_TO_MANY:
            return ['1', 'n']
        case connectionType.ONE_TO_ONE:
        default:
            return ['1', '1']
    }
}