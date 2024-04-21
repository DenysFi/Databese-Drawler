import { tableDefaultColor, tableDefaultRowHeight, tableDefaultWidth, tableHeaderHeight, tagColors } from "@/Constants/constants";
import { objectType } from "@/Constants/enums";
import { ITableField, ITable as TableType } from '@/Types/table';
import { useAppDispatch, useAppSelector } from "@/redux-hooks";
import { nullSelected } from "@/store/selected";
import { removeField, removeTable } from "@/store/tables";
import {
    IconDeleteStroked,
    IconEdit,
    IconMinus,
    IconMore,
    IconKey
} from "@douyinfe/semi-icons";
import { Button, Popover, Space, Tag, Toast } from "@douyinfe/semi-ui";
import { TagColor } from "@douyinfe/semi-ui/lib/es/tag";
import { FC, MouseEvent, useState } from "react";
import { ILinking } from "./Canvas";

interface ITable {
    tableData: TableType,
    onMouseDownOnElement: (event: MouseEvent<SVGForeignObjectElement>, id: number, type: objectType) => void;
    onStartLinking: (data: ILinking) => void;
    setHoveredTable: (data: { tid: number, fid: number }) => void
}
const Table: FC<ITable> = ({ tableData, onMouseDownOnElement, onStartLinking, setHoveredTable }) => {
    const dispatch = useAppDispatch();
    const { mode } = useAppSelector(state => state.settings)
    const { selected } = useAppSelector(state => state.selected);
    const [hoveredField, setHoveredField] = useState(-1);
    const totaltableHeight = (tableData.fields.length * tableDefaultRowHeight) + tableHeaderHeight + 3;

    return (
        <foreignObject
            x={tableData.x}
            y={tableData.y}
            width={tableDefaultWidth}
            height={totaltableHeight}
            onMouseDown={(e) => {
                onMouseDownOnElement(e, tableData.id, objectType.Table);
            }}
            className="group drop-shadow-lg rounded-md cursor-move group select-none"
        >
            <article
                className={`border-2 ${!(selected.id === tableData.id) && 'border-zinc-500'} w-full h-full overflow-hidden rounded table-theme hover:border-dashed hover:border-blue-500
            ${mode === "light" ? "bg-zinc-100 text-zinc-800" : "bg-zinc-800 text-zinc-200"}`}
                style={{ borderColor: selected.id === tableData.id && tableData.color || '' }}
            >
                <div className="w-full h-[10px]" style={{ backgroundColor: tableData.color }}></div>
                <div className={`h-[36px] px-[6px] border-b border-gray-400 flex justify-between ${mode === "light" ? "bg-zinc-200" : "bg-zinc-900"} items-center `}>
                    <div>
                        <h4 className={`font-medium text-base  `} >{tableData.name}</h4>
                    </div>
                    <div className={`hidden group-hover:block`}>
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
                            <Popover
                                showArrow
                                key={i}
                                className="popover-theme"
                                content={
                                    <div >
                                        <div className="flex justify-between border-b-[1px] border-slate-400 pb-[10px] mb-[10px]" >
                                            <h4 className="font-medium ">{f.name}</h4>
                                            <span className=" opacity-[0.7]">{f.type}</span>
                                        </div>
                                        {(f.details.autoinc || !f.details.nulable || f.details.primary || f.details.unique) && <Space className="mb-[5px]">
                                            {
                                                f.details.autoinc && <Tag color={tagColors[0] as TagColor}> Increment </Tag>
                                            }
                                            {
                                                !f.details.nulable && <Tag color={tagColors[1] as TagColor}> Not Null </Tag>
                                            }
                                            {
                                                f.details.primary && <Tag color={tagColors[2] as TagColor}> Primary </Tag>
                                            }
                                            {
                                                f.details.unique && <Tag color={tagColors[3] as TagColor}> unique </Tag>
                                            }
                                        </Space>}
                                        <div> <span className="font-medium">Default: </span> {f.details.defaultValue || 'Not set'}</div>
                                    </div>
                                }
                                position="right"
                            >
                                {field(f, i)}
                            </Popover >

                        )
                    })
                }
            </article >
        </foreignObject >
    );

    function field(f: ITableField, i: number) {
        return (
            <div
                key={i}
                className={`h-[${tableDefaultRowHeight}px] px-[6px] py-[5px] flex justify-between items-center  
                ${i === tableData.fields.length - 1 ? '' : 'border-b border-gray-400'} `}
                onMouseEnter={() => {
                    setHoveredTable({ fid: i, tid: tableData.id })
                    setHoveredField(i)
                }}
                onMouseLeave={() => {
                    setHoveredTable({ fid: -1, tid: -1 })
                    setHoveredField(-1);
                }}
            >
                <div className=" flex items-center gap-x-[5px] ">
                    <button
                        className={`rounded-full w-[9px] h-[9px] p-0 `} style={{ backgroundColor: tableDefaultColor }}
                        onMouseDown={() => {
                            const xOffset = 12;
                            const startX = xOffset + tableData.x;
                            const startY = tableData.y + tableHeaderHeight + i * tableDefaultRowHeight + tableDefaultRowHeight / 2;
                            onStartLinking({
                                isLinking: true,
                                startTableId: tableData.id,
                                startTableField: i,
                                startX,
                                startY,
                                endX: startX,
                                endY: startY
                            })
                        }}
                    ></button>
                    <p className={`${hoveredField === i && 'opacity-[0.7]' || ''}`}>{f.name}</p>
                </div>
                {
                    (hoveredField === i) ? <Button
                        icon={<IconMinus />}
                        className="h-[21px]"
                        theme="solid"
                        type="danger"
                        size="small"
                        onClick={() => {
                            dispatch(removeField({ tid: tableData.id, fid: i }))
                            dispatch(nullSelected())
                        }}
                    /> :
                        (<div className=" opacity-[0.7]">
                            {f.details.primary && <IconKey className="pr-[4px]" size="small" />}
                            <span >{f.type}</span>
                        </div>
                        )
                }
            </div>
        )
    }
};

export default Table;