import { objectType } from "@/Constants/enums";
import { useAppDispatch, useAppSelector } from "@/redux-hooks";
import { setSelected } from "@/store/selected";
import { addTable, updateTable } from "@/store/tables";
import { setPan, setScale, setTransform } from "@/store/transform";
import { Button } from "@douyinfe/semi-ui";
import { FC, MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import Table from "./Table";
import Relation from "./Relation";

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
    const [cursor, setCursor] = useState<string>('auto');
    const canvasRef = useRef<SVGSVGElement>(null);
    const { tables, relations } = useAppSelector(state => state.tables)
    const { selected } = useAppSelector(state => state.selected)
    const { scale, pan } = useAppSelector(state => state.transform)

    function onMouseDownOnElement(event: MouseEvent<SVGForeignObjectElement>, id: number, type: objectType) {
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

    function onClik() {
        dispatch(addTable({ scale: scale, x: pan.x, y: pan.y }))
    }

    function onMouseMove(event: MouseEvent<SVGSVGElement>) {
        if (dragging.id >= 0 && dragging.element === objectType.Table) {
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
    }

    function onMouseDown(e: MouseEvent) {
        setPanning({
            isPanning: true,
            dx: e.clientX - pan.x,
            dy: e.clientY - pan.y
        })
    }

    useEffect(() => {
        function onMouseWheel(event: WheelEvent) {
            dispatch(setScale(event.deltaY))
        }
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.addEventListener("wheel", onMouseWheel);

        return () => canvas.removeEventListener("wheel", onMouseWheel)
    }, [dispatch])
    return (<>
        <Button onClick={onClik} />
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
                {relations.map(r => <Relation data={r} />)}
                {tables.map((f) => <Table onMouseDownOnElement={onMouseDownOnElement} key={f.id} tableData={f} />)}
            </g>
        </svg>
    </>
    );
};

export default Canvas;