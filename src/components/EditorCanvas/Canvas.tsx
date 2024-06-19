import { canvasActionType, connectionType, objectType } from "@/Constants/enums";
import { useAppDispatch, useAppSelector } from "@/redux-hooks";
import { setSelected } from "@/store/selected";
import { addRelation, updateTable } from "@/store/tables";
import { setPan, setScale } from "@/store/transform";
import { Toast } from "@douyinfe/semi-ui";
import { FC, MouseEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Relation from "./Relation";
import { ITable, ITableRelation } from "@/Types/table";
import { relationExist } from "@/utiles";
import Tables from "./Tables";
import { nullRedoStack, pushUndoStack } from "@/store/undoRedo";

export interface ILinking {
    startTableField: number,
    startTableId: number,
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    isLinking: boolean
}

const Canvas: FC = memo(() => {
    const dispatch = useAppDispatch();
    const [dragging, setDragging] = useState({
        id: -1,
        element: objectType.None,
        x: 0,
        y: 0
    });

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
    const [oldPan, setOldPan] = useState({ x: 0, y: 0 })
    const [cursor, setCursor] = useState<string>('auto');
    const canvasRef = useRef<SVGSVGElement>(null);
    const { tables, relations } = useAppSelector(state => state.tables)
    const { selected } = useAppSelector(state => state.selected)
    const { scale, pan } = useAppSelector(state => state.transform)
    const coords = useRef({
        mouseX: 0,
        mouseY: 0,
        tableX: 0,
        tableY: 0,
    })
    const onMouseDownOnElement = useCallback((event: MouseEvent<SVGForeignObjectElement>, table: ITable, type: objectType) => {
        if (type === objectType.Table) {
            coords.current = {
                mouseX: event.clientX,
                mouseY: event.clientY,
                tableX: table.x,
                tableY: table.y,
            }
            setDragging({
                id: table.id,
                element: type,
                x: table.x,
                y: table.y
            });

            dispatch(setSelected({ id: table.id, element: type }))
        }

    }, [dispatch])

    const offset = useMemo(() => {
        const x = coords.current.mouseX / scale - coords.current.tableX;
        const y = coords.current.mouseY / scale - coords.current.tableY;
        return { x, y }
    }, [scale, selected])

    function onMouseMove(event: MouseEvent<SVGSVGElement>) {

        if (linking.isLinking) {
            const canvasOffset = canvasRef.current?.getBoundingClientRect();
            const mouseX = (event.clientX - pan.x - canvasOffset!.x) / scale;
            const mouseY = (event.clientY - pan.y - canvasOffset!.y) / scale;

            setLinking({
                ...linking,
                endX: linking.startX! > mouseX ? mouseX + 2 : mouseX - 2,
                endY: linking.startY! > mouseY ? mouseY + 2 : mouseY - 2
            })
        } else if (dragging.id >= 0 && dragging.element === objectType.Table) {
            const x = event.clientX / scale - offset.x,
                y = event.clientY / scale - offset.y;
            const id = selected.id as number
            dispatch(updateTable({ id, x, y }))
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
        } else if (dragging.id >= 0 && dragging.element === objectType.Table) {
            const table = tables.find(t => t.id === selected.id)
            if (!(Math.ceil(dragging.x) === Math.ceil(table!.x) && Math.ceil(dragging.y) === Math.ceil(table!.y))) {
                dispatch(pushUndoStack({
                    element: {
                        ...table,
                        x: dragging.x,
                        y: dragging.y,
                    } as ITable,
                    objectType: objectType.Table,
                    actionType: canvasActionType.MOVE
                }))
                dispatch(nullRedoStack())
            }
        } else if (panning.isPanning && (dragging.id === -1 || dragging.element === objectType.None)) {
            if (!(Math.ceil(oldPan.x) === Math.ceil(pan.x) && Math.ceil(oldPan.y) === Math.ceil(pan.y))) {
                dispatch(pushUndoStack({
                    actionType: canvasActionType.PANMOVE,
                    objectType: objectType.None,
                    element: { pan: { x: oldPan.x, y: oldPan.y } }
                }))
                dispatch(nullRedoStack())
            }
        }

        setDragging({
            id: -1,
            element: objectType.None,
            x: 0,
            y: 0
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
        setOldPan({ x: pan.x, y: pan.y });
    }
    const onStartLinking = useCallback((data: ILinking) => {
        setLinking((prev) => ({
            ...prev,
            ...data,
        }))
        setDragging({
            id: -1,
            element: objectType.None,
            x: 0,
            y: 0
        })
        setPanning({
            isPanning: false,
            dx: -1,
            dy: -1
        })
    }, [])


    function handleLinking() {
        if (linking.startTableId === -1 || hoveredTable.tid === -1) {
            Toast.warning('Cancel.')
            return
        }
        if (linking.startTableId === hoveredTable.tid) {
            Toast.warning('Cannot connect field with same table.')
            return;
        }
        const startTable = tables.find(t => t.id === linking.startTableId)!
        const endTable = tables.find(t => t.id === hoveredTable.tid)!;
        if (startTable!.fields[linking.startTableField!].type !== endTable!.fields[hoveredTable.fid].type) {
            Toast.warning('Cannot connect field with different types.')
            return;
        }
        const newRelation: ITableRelation = {
            startTableField: linking.startTableField!,
            startTableId: linking.startTableId!,
            endTableField: hoveredTable.fid,
            endTableId: hoveredTable.tid,
            connectionType: connectionType.ONE_TO_ONE,
            connectionName: `${startTable.name}_${startTable.fields[linking.startTableField!].name}-${endTable.name}_${endTable.fields[hoveredTable.fid].name}`
        }
        if (relationExist(relations, newRelation)) {
            Toast.warning('Relation already exist.')
            return;
        }
        dispatch(pushUndoStack({
            element: newRelation,
            objectType: objectType.Relation,
            actionType: canvasActionType.ADD
        }))
        dispatch(nullRedoStack())
        dispatch(addRelation(newRelation))
    }


    useEffect(() => {
        function onMouseWheel(event: WheelEvent) {
            dispatch(setScale({ deltaY: event!.deltaY }))
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
                    transformOrigin: "0 0",
                }}
                id="diagram"
            >
                {relations.map((r, i) => <Relation key={i} data={r} />)}
                <Tables
                    onMouseDownOnElement={onMouseDownOnElement}
                    onStartLinking={onStartLinking}
                    setHoveredTable={setHoveredTable}
                    tables={tables} />

                {linking.isLinking && <path d={`M ${linking.startX} ${linking.startY} L ${linking.endX!} ${linking.endY}`} strokeDasharray="10" fill="none" stroke="red" strokeWidth='2px' />}
            </g>
        </svg>
    </>
    );
});

export default Canvas;