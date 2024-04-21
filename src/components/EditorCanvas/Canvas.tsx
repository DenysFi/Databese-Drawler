import { connectionType, dataType, objectType } from "@/Constants/enums";
import { useAppDispatch, useAppSelector } from "@/redux-hooks";
import { setSelected } from "@/store/selected";
import { addRelation, addTable, updateTable } from "@/store/tables";
import { setPan, setScale } from "@/store/transform";
import { Toast } from "@douyinfe/semi-ui";
import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import Table from "./Table";
import Relation from "./Relation";
import { ITableRelation } from "@/Types/table";
import { relationExist } from "@/utiles";
import { scaleStep } from "@/Constants/constants";

export interface ILinking {
    startTableField: number,
    startTableId: number,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    isLinking: boolean
}

const Canvas: FC = () => {
    const dispatch = useAppDispatch();
    const [dragging, setDragging] = useState({
        id: -1,
        element: objectType.None
    });
    const [offset, setOffset] = useState({
        x: 0,
        y: 0
    })
    const [panning, setPanning] = useState({
        isPanning: false,
        dx: 0,
        dy: 0
    });
    const [hoveredTable, setHoveredTable] = useState({ tid: -1, fid: -1 });
    const [linking, setLinking] = useState<Partial<ILinking>>({
        isLinking: false,
        startTableField: -1,
        startTableId: -1,
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0
    })
    const [cursor, setCursor] = useState<string>('auto');
    const canvasRef = useRef<SVGSVGElement>(null);
    const { tables, relations } = useAppSelector(state => state.tables)
    const { selected } = useAppSelector(state => state.selected)
    const { scale, pan } = useAppSelector(state => state.transform)
    function onMouseDownOnElement(event: MouseEvent<SVGForeignObjectElement>, id: number, type: objectType) {

        if (type === objectType.Table) {
            const table = tables.find(t => t.id === id)
            setOffset({
                x: event.clientX / scale - table!.x,
                y: event.clientY / scale - table!.y
            })
            setDragging({
                id,
                element: type
            })
            dispatch(setSelected({ id, element: type }))
        }

    }

    // function onClick() {
    //     dispatch(addTable({ scale: scale, x: pan.x, y: pan.y }))
    // }

    function onMouseMove(event: MouseEvent<SVGSVGElement>) {

        if (linking.isLinking) {
            const mouseX = (event.clientX - pan.x) / scale;
            const mouseY = (event.clientY - pan.y) / scale;
            setLinking({
                ...linking,
                endX: linking.startX! > mouseX ? mouseX + 2 : mouseX - 2,
                endY: linking.startY! > mouseY ? mouseY + 2 : mouseY - 2
            })
        } else if (dragging.id >= 0 && dragging.element === objectType.Table) {
            const x = event.clientX / scale - offset.x,
                y = event.clientY / scale - offset.y;
            dispatch(updateTable({ id: selected.id, x, y }))
        } else if (panning.isPanning && (dragging.id === -1 || dragging.element === objectType.None)) {
            dispatch(setPan(
                {
                    x: (event.clientX - panning.dx),
                    y: (event.clientY - panning.dy),
                }
            ))

            setCursor('grabbing')
        }
    }

    function onMouseUpNdLeave() {
        if (linking.isLinking) {
            handleLinking();
        }

        setDragging({
            id: -1,
            element: objectType.None
        })
        setPanning({
            isPanning: false,
            dx: 0,
            dy: 0
        })
        setCursor('auto')
        setLinking({
            isLinking: false,
            startTableField: -1,
            startTableId: -1,
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0
        })
    }

    function onMouseDown(e: MouseEvent) {
        setPanning({
            isPanning: true,
            dx: e.clientX - pan.x,
            dy: e.clientY - pan.y
        })
    }

    const onStartLinking = (data: ILinking) => {

        setLinking({
            ...linking,
            ...data,
        })
        setDragging({
            id: -1,
            element: objectType.None
        })
        setPanning({
            isPanning: false,
            dx: -1,
            dy: -1
        })
    }

    function handleLinking() {
        if (linking.startTableId === -1 || hoveredTable.tid === -1) {
            Toast.warning('Cancel.')
            return
        }
        if (linking.startTableId === hoveredTable.tid) {
            Toast.warning('Cannot connect field with same table.')
            return;
        }
        const startTable = tables.find(t => t.id === linking.startTableId)
        const endTable = tables.find(t => t.id === hoveredTable.tid);
        if (startTable!.fields[linking.startTableField!].type !== endTable!.fields[hoveredTable.fid].type) {
            Toast.warning('Cannot connect field with different types.')
            return;
        }
        const newRelation: ITableRelation = {
            startTableField: linking.startTableField!,
            startTableId: linking.startTableId!,
            endTableField: hoveredTable.fid,
            endTableId: hoveredTable.tid,
            connectionName: connectionType.ONE_TO_ONE
        }
        if (relationExist(relations, newRelation)) {
            Toast.warning('Relation already exist.')
            return;
        }

        dispatch(addRelation(newRelation))
    }

    useEffect(() => {
        function onMouseWheel(event: WheelEvent) {

            dispatch(setScale({ deltaY: event.deltaY }))
        }
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.addEventListener("wheel", onMouseWheel, { passive: true });

        return () => canvas.removeEventListener("wheel", onMouseWheel)
    }, [dispatch])

    return (<>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUpNdLeave}
            onMouseLeave={onMouseUpNdLeave}
            style={{
                cursor: cursor
            }}
            ref={canvasRef}
        >
            <defs>
                <pattern
                    x={0}
                    y={0}
                    id="canvas-bg"
                    width="20"
                    height="20"
                    viewBox='0 0 20 20'
                    patternUnits="userSpaceOnUse"
                >
                    <circle
                        fill="rgb(99, 152, 191)"
                        cx="4"
                        cy="4"
                        r="0.85"
                        id="pattern-circle">
                    </circle>
                </pattern>
            </defs>
            <rect fill='url(#canvas-bg)' width={'100%'} height={'100%'}></rect>
            <g
                style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
                }}
                id="diagram"
            >
                {relations.map((r, i) => <Relation key={i} data={r} />)}
                {tables.map((f) => <Table
                    onMouseDownOnElement={onMouseDownOnElement}
                    onStartLinking={onStartLinking}
                    setHoveredTable={setHoveredTable}
                    key={f.id}
                    tableData={f} />)}
                {linking.isLinking && <path d={`M ${linking.startX} ${linking.startY} L ${linking.endX!} ${linking.endY}`} stroke-dasharray="10" fill="none" stroke="red" strokeWidth='2px' />}
            </g>
        </svg>
    </>
    );
};

export default Canvas;