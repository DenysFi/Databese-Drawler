import { useAppDispatch, useAppSelector } from "@/redux-hooks";
import { addTable, updateTable } from "@/store/tables";
import { Button } from "@douyinfe/semi-ui";
import Table from "./Table";
import React, { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { objectType } from "@/Constants/enums";
import { setSelected } from "@/store/selected";
import { setScale, setTransform } from "@/store/transform";

const Canvas: FC = () => {
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
    const [cursor, setCursor] = useState('auto');
    const canvasRef = useRef<SVGSVGElement>(null);
    const { tables } = useAppSelector(state => state.tables)
    const { selected } = useAppSelector(state => state.selected)
    const { transform } = useAppSelector(state => state.transform)

    const dispatch = useAppDispatch();

    function onMouseDownOnElement(event: MouseEvent<SVGForeignObjectElement>, id: number, type: objectType) {
        const table = tables.find(t => t.id === id)
        setOffset({
            x: event.clientX / transform.scale - table!.x,
            y: event.clientY / transform.scale - table!.y
        })
        setDragging({
            id,
            element: type
        })
        dispatch(setSelected({ id, element: type }))
    }

    function onClik() {
        dispatch(addTable({ scale: transform.scale, x: transform.pan.x, y: transform.pan.y }))
    }
    function onMouseMove(event: MouseEvent<SVGSVGElement>) {
        if (dragging.id >= 0 && dragging.element === objectType.Table) {
            const x = event.clientX / transform.scale - offset.x,
                y = event.clientY / transform.scale - offset.y;
            dispatch(updateTable({ id: selected.id, x, y }))
        } else if (panning.isPanning && (dragging.id === -1 || dragging.element === objectType.None)) {
            dispatch(setTransform({
                pan: {
                    x: (event.clientX - panning.dx),
                    y: (event.clientY - panning.dy),
                }
            }))
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
            dx: e.clientX - transform.pan.x,
            dy: e.clientY - transform.pan.y
        })

    }
    console.log(transform.scale);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.addEventListener("wheel", (event) => {
            dispatch(setScale(event.deltaY))
        });
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
                    transform: `translate(${transform.pan.x}px, ${transform.pan.y}px) scale(${transform.scale})`,
                }}
                id="diagram"
            >
                {tables.map((f, i) => <Table onMouseDownOnElement={onMouseDownOnElement} key={f.id} index={i} tableData={f} />)}
            </g>
        </svg>
    </>
    );
};

export default Canvas;