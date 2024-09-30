import { tableDefaultColor, tableDefaultRowHeight, tableDefaultWidth, tableHeaderHeight } from "@/Constants/constants";
import { canvasActionType, objectType } from "@/Constants/enums";
import { ITable, ITableField } from '@/Types/table';
import { useAppDispatch, useAppSelector } from "@/redux-hooks";
import { removeField } from "@/store/tables";
import {
    IconEdit,
    IconMinus,
    IconMore,
    IconKey
} from "@douyinfe/semi-icons";
import { Button, Popover } from "@douyinfe/semi-ui";
import { FC, MouseEvent, ReactElement, memo, useCallback, useState } from "react";
import { ILinking } from "./Canvas";
import { nullRedoStack, pushUndoStack } from "@/store/undoRedo";
import { settingsModeSelector, settingsShowFieldSummarySelector } from "@/store/settings";
import PopoverFieldContent from "./ui/PopoverFieldContent";
import PopoverTableMoreContent from "./ui/PopoverTableMoreContent";

interface IFCTable {
    tableData: ITable,
    onMouseDownOnElement: (event: MouseEvent<SVGForeignObjectElement>, table: ITable, type: objectType) => void;
    onStartLinking: (data: ILinking) => void;
    setHoveredTable: (data: { tid: number, fid: number }) => void,
    isSelected: boolean,
    handleTableDelete: (tableData: ITable) => void
}

const Table: FC<IFCTable> = memo(({
    tableData,
    onMouseDownOnElement,
    onStartLinking,
    setHoveredTable,
    isSelected,
    handleTableDelete
}) => {
    const dispatch = useAppDispatch();
    const mode = useAppSelector(settingsModeSelector);
    console.log(mode)
    const showFieldSummary = useAppSelector(settingsShowFieldSummarySelector);
    const [hoveredField, setHoveredField] = useState(-1);
    const totaltableHeight = (tableData.fields.length * tableDefaultRowHeight) + tableHeaderHeight + 3;

    const onMouseDown = useCallback((e: MouseEvent<SVGForeignObjectElement>) => {
        onMouseDownOnElement(e, tableData, objectType.Table);
    }, [onMouseDownOnElement, tableData]);

    const onTableDeleteClick = useCallback(() => {
        handleTableDelete(tableData)
    }, [handleTableDelete, tableData]);

    return (
        <foreignObject
            x={tableData.x}
            y={tableData.y}
            width={tableDefaultWidth}
            height={totaltableHeight}
            onMouseDown={onMouseDown}
            className="group drop-shadow-lg rounded-md cursor-move group select-none"
        >
            <article
                className={`border-2 ${!isSelected && 'border-zinc-500'} w-full h-full overflow-hidden rounded table-theme hover:border-dashed hover:border-blue-500
            ${mode === 'light' ? "bg-zinc-100 text-zinc-800" : "bg-zinc-800 text-zinc-200"}`}
                style={{ borderColor: isSelected && tableData.color || '' }}
            >
                <div className="w-full h-[10px]" style={{ backgroundColor: tableData.color }}></div>
                <div className={`h-[36px] px-[6px] border-b border-gray-400 flex justify-between ${mode === 'light' ? "bg-zinc-200" : "bg-zinc-900"} items-center `}>
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
                            content={
                                <PopoverTableMoreContent
                                    comment={tableData.comment}
                                    indices={tableData.indices}
                                    onClick={onTableDeleteClick}
                                />}>

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
                            showFieldSummary ?
                                <Popover
                                    showArrow
                                    key={i}
                                    className="popover-theme"
                                    content={<PopoverFieldContent field={f} />}
                                    position="right"
                                >
                                    {field(f, i)}
                                </Popover > : field(f, i)
                        )
                    })
                }
            </article >
        </foreignObject >
    );

    function field(f: ITableField, i: number): ReactElement<'div'> {

        function hanldeFieldDelete() {
            const { payload } = dispatch(removeField({ tid: tableData.id, fid: i }))
            dispatch(pushUndoStack({
                element: { tid: tableData.id, fields: payload.fields!, relations: payload.relations! },
                objectType: objectType.TableFields,
                actionType: canvasActionType.DELETE
            }))
            setHoveredField(-1);
            dispatch(nullRedoStack())
        }

        function onMouseDown() {
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
        }

        function onMouseEnterOnField() {
            setHoveredTable({ fid: i, tid: tableData.id })
            setHoveredField(i)
        }

        function onMouseLeaveOnField() {
            setHoveredTable({ fid: -1, tid: -1 })
            setHoveredField(-1);
        }
        const activeField = hoveredField === i;
        const activeFieldTExtColor = mode === 'light' ? 'text-black/50' : 'text-white/50';

        return (
            <div

                className={`h-[${tableDefaultRowHeight}px] px-[6px] py-[5px] flex justify-between items-center  
                ${i === tableData.fields.length - 1 ? '' : 'border-b border-gray-400'} `}
                onMouseEnter={onMouseEnterOnField}
                onMouseLeave={onMouseLeaveOnField}
            >
                <div className=" flex items-center gap-x-[5px] ">
                    <button
                        className={`rounded-full w-[9px] h-[9px] p-0 `} style={{ backgroundColor: tableDefaultColor }}
                        onMouseDown={onMouseDown}
                    ></button>
                    <p className={`${activeField && activeFieldTExtColor || ''}`}>{f.name}</p>
                </div>
                {
                    activeField ? <Button
                        icon={<IconMinus />}
                        className="h-[21px]"
                        theme="solid"
                        type="danger"
                        size="small"
                        onClick={hanldeFieldDelete}
                    /> :
                        (<div className=" opacity-[0.7]">
                            {f.details.primary && <IconKey className="pr-[4px]" size="small" />}
                            <span>{f.type}</span>
                        </div>
                        )
                }
            </div>
        )
    }
});

export default Table;

