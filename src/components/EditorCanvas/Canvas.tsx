import { useAppDispatch, useAppSelector } from "@/redux-hooks";
import { addTable, updateTable } from "@/store/tables";
import { Button } from "@douyinfe/semi-ui";
import Table from "./Table";
import { MouseEvent, useState } from "react";
import { objectType } from "@/Constants/enums";
import { setSelected } from "@/store/selected";

const Canvas = () => {
    const [dragging, setDragging] = useState({
        id: -1,
        element: objectType.None
    });
    const [offset, setOffset] = useState({
        x: 0,
        y: 0
    })
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
        dispatch(addTable())
    }
    function onMouseMove(event: MouseEvent<SVGSVGElement>) {
        if (dragging.id >= 0 && dragging.element === objectType.Table) {
            const x = event.clientX / transform.scale - offset.x, y = event.clientY / transform.scale - offset.y;
            dispatch(updateTable({ id: selected.id, x, y }))

        }
    }
    function onMouseUp() {
        setDragging({
            id: -1,
            element: objectType.None
        })
    }
    return (<>
        <Button onClick={onClik} />

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            onMouseDown={() => { }}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
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
            <g id="diagram">
                {tables.map((f, i) => <Table onMouseDownOnElement={onMouseDownOnElement} key={f.id} index={i} tableData={f} />)}
            </g>
        </svg>
    </>
    );
};

export default Canvas;