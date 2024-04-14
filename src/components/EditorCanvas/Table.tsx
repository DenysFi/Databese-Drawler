import { FC, useState } from "react";
import { ITable as TableType } from '@/Types'
import { tabelHeaderHeight, tableDefaultColor, tableDefaultRowHeight, tableDefaultWidth } from "@/Constants/constants";
import { useAppSelector } from "@/redux-hooks";
import { Button } from "@douyinfe/semi-ui";
import {
    IconEdit,
    IconMore,
    IconKey,
    IconMinus,
    IconDeleteStroked,
    IconKeyStroked,

} from "@douyinfe/semi-icons";
interface ITable {
    index: number,
    tableData: TableType
}
const Table: FC<ITable> = ({ index, tableData }) => {
    const { mode } = useAppSelector(state => state.settings)
    const totalTabelHeight = tableData.fields.length * tableDefaultRowHeight + tabelHeaderHeight;

    return (
        <foreignObject
            x={tableData.x}
            y={tableData.y}
            width={tableDefaultWidth}
            height={totalTabelHeight}
            className="group drop-shadow-lg rounded-md cursor-move group select-none"
        >
            <article
                className={`border-2 border-zinc-500 w-full h-full overflow-hidden rounded table-theme  hover:border-dashed hover:border-blue-500 
            ${mode === "light" ? "bg-zinc-100 text-zinc-800" : "bg-zinc-800 text-zinc-200"}`}>
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
                    </div>
                </div>

                {
                    tableData.fields.map((f, i) => {
                        return (
                            <div className="pt-[6px] pl-[6px] pr-[6px] pb-[6px] flex justify-between items-center border-b border-gray-400">
                                <div className="flex items-center gap-x-[5px]">
                                    <Button className={`rounded-full w-[9px] h-[9px] p-0 `} style={{ backgroundColor: tableDefaultColor }} ></Button>
                                    {f.name}
                                </div>
                                <p className=" opacity-[0.7]">{f.type}</p>
                            </div>
                        )
                    })
                }

            </article>
        </foreignObject>
    );
};

export default Table;