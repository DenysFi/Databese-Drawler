import { addTable } from "@/store/tablesSlice";
import Table from "./Table";
import { useAppDispatch, useAppSelector } from "@/redux-hooks";
import { Button } from "@douyinfe/semi-ui";

const Canvas = () => {
    const { tables } = useAppSelector(state => state.tables)
    const dispatch = useAppDispatch();
    function onClik() {
        dispatch(addTable({}))
    }
    return (<>
        <Button onClick={onClik} />

        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" >
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
                {tables.map((f, i) => <Table key={f.id} index={i} tableData={f} />)}
            </g>
        </svg>
    </>
    );
};

export default Canvas;