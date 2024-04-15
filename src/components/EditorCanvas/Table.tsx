import { tabelHeaderHeight, tableDefaultColor, tableDefaultRowHeight, tableDefaultWidth } from "@/Constants/constants";
import { objectType } from "@/Constants/enums";
import { ITableField, ITable as TableType } from '@/Types/table';
import { useAppDispatch, useAppSelector } from "@/redux-hooks";
import { removeField, removeTable } from "@/store/tables";
import {
    IconDeleteStroked,
    IconEdit,
    IconMinus,
    IconMore
} from "@douyinfe/semi-icons";
import { Button, Popover, Toast } from "@douyinfe/semi-ui";
import { FC, useState, MouseEvent } from "react";

interface ITable {
    tableData: TableType,
    onMouseDownOnElement: (event: MouseEvent<SVGForeignObjectElement>, id: number, type: objectType) => void;
}
const Table: FC<ITable> = ({ tableData, onMouseDownOnElement }) => {
    const dispatch = useAppDispatch();
    const { mode } = useAppSelector(state => state.settings)
    const { selected } = useAppSelector(state => state.selected);
    const [hoveredField, setHoveredField] = useState(-1)
    const totalTabelHeight = (tableData.fields.length * tableDefaultRowHeight) + tabelHeaderHeight + 3;
    return (
        <foreignObject
            x={tableData.x}
            y={tableData.y}
            width={tableDefaultWidth}
            height={totalTabelHeight}
            onMouseDown={(e) => {
                onMouseDownOnElement(e, tableData.id, objectType.Table);
            }}
            className="group drop-shadow-lg rounded-md cursor-move group select-none"
        >
            <article
                className={`border-2 ${!(selected.id === tableData.id) && 'border-zinc-500'} w-full h-full overflow-hidden rounded table-theme  hover:border-dashed hover:border-blue-500 
            ${mode === "light" ? "bg-zinc-100 text-zinc-800" : "bg-zinc-800 text-zinc-200"}`}
                style={{ borderColor: selected.id === tableData.id && tableData.color || '' }}
            >
                <div className="w-full h-[10px]" style={{ backgroundColor: tableData.color }}></div>
                <div className={`h-[36px] px-[6px] border-b border-gray-400 flex justify-between ${mode === "light" ? "bg-zinc-200" : "bg-zinc-900"} items-center `}>
                    <div>
                        <h4 className={`font-medium text-base  `} >{tableData.name}</h4>
                    </div>
                    <div className="hidden group-hover:block">
                        <Button
                            icon={<IconEdit />}
                            size='small'
                            theme="solid"
                            style={{
                                backgroundColor: "#2f68ad",
                                opacity: "0.7",
                                marginRight: "6px",
                            }}

                        />
                        <Popover
                            showArrow
                            trigger='click'
                            autoAdjustOverflow
                            position='rightTop'
                            className="popover-theme"
                            content={(
                                <div >
                                    <div className="mb-[10px]"> <b>Comment:</b> {tableData.comment.length ? <span className="opacity-[0.7]">{tableData.comment}</span> : 'No comment '}</div>
                                    <div className="mb-[10px]"> <b>Indices:</b> {tableData.indices.length ? <span className="opacity-[0.7]">{tableData.indices}</span> : 'No indices '}</div>
                                    <Button
                                        icon={<IconDeleteStroked />}
                                        block
                                        type='danger'
                                        onClick={() => {
                                            Toast.success('Table deleted succesfully!')
                                            dispatch(removeTable(tableData.id))
                                        }}
                                    >
                                        Delete table
                                    </Button>
                                </div>
                            )}
                        >
                            <Button
                                icon={<IconMore />}
                                size='small'
                                type="tertiary"
                                style={{
                                    opacity: "0.7",
                                    backgroundColor: "grey",
                                    color: "white",
                                }}
                            />
                        </Popover>

                    </div>
                </div>

                {
                    tableData.fields.map((f, i) => {
                        return (
                            field(f, i)
                        )
                    })
                }

            </article>
        </foreignObject>
    );
    function field(f: ITableField, i: number) {

        return (
            <div
                key={i}
                className={`h-[${tableDefaultRowHeight}px] px-[6px] py-[5px] flex justify-between items-center  ${i === tableData.fields.length - 1 ? '' : 'border-b border-gray-400'} `}

                onMouseEnter={() => setHoveredField(i)}
                onMouseLeave={() => setHoveredField(-1)}
            >
                <div className=" flex items-center gap-x-[5px] ">
                    <Button className={`rounded-full w-[9px] h-[9px] p-0 `} style={{ backgroundColor: tableDefaultColor }} ></Button>
                    <p className={`${hoveredField === i && 'opacity-[0.7]' || ''}`}>{f.name}</p>
                </div>

                {
                    hoveredField === i ? <Button
                        icon={<IconMinus />}
                        className="h-[21px]"
                        theme="solid"
                        type="danger"
                        size="small"
                        onClick={() => dispatch(removeField({ tid: tableData.id, fid: i }))}
                    />
                        : <span className=" opacity-[0.7]">{f.type}</span>
                }

            </div>
        )
    }
};

export default Table;