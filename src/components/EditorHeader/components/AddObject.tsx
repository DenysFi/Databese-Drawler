import { canvasActionType, objectType } from '@/Constants/enums';
import { ITable } from '@/Types/table';
import { useAppDispatch, useAppSelector } from '@/redux-hooks';
import { addTable } from '@/store/tables';
import { pushUndoStack } from '@/store/undoRedo';
import { Tooltip } from '@douyinfe/semi-ui';
import { FC } from 'react'

const AddObject: FC = () => {
    const dispatch = useAppDispatch();
    const { scale, pan } = useAppSelector(state => state.transform)

    function onTableAdd() {
        const { payload } = dispatch(addTable({ scale: scale, x: pan.x, y: pan.y }))
        console.log(payload.data);
        dispatch(pushUndoStack({
            element: payload.data as ITable,
            objectType: objectType.Table,
            actionType: canvasActionType.ADD
        }))
    }

    return (
        <div className='flex'>
            <Tooltip content="Add table" position='bottom'>
                <button
                    className="px-2 py-1 flex items-center hover:bg-[#cbd5e1] rounded"
                    onClick={onTableAdd}
                >
                    <svg height="26" width="26"><path fill="none" stroke="currentColor" strokeWidth="2" d="M4 2 L20 2 A4 4 0 0 1 22 4 L22 14 M14 22 L4 22 A4 4 0 0 1 1 18 L1 4 A4 4 0 0 1 5 2 M22 17 L22 25 M18 21 L26 21 M1 8 L22 8"></path></svg>
                </button>
            </Tooltip>
            <Tooltip content="Add area" position='bottom'>
                <button className="px-2 py-1 flex items-center hover:bg-[#cbd5e1] rounded">
                    <svg height="26" width="26"><path fill="none" stroke="currentColor" strokeWidth="2" d="M4 2 L20 2 A4 4 0 0 1 22 4 L22 14 M14 22 L4 22 A4 4 0 0 1 1 18 L1 4 A4 4 0 0 1 5 2 M22 17 L22 25 M18 21 L26 21"></path></svg>
                </button>
            </Tooltip>
            <Tooltip content="Add note" position='bottom'>
                <button className="px-2 py-1 flex items-center hover:bg-[#cbd5e1] rounded">
                    <svg height="26" width="26"><path fill="none" stroke="currentColor" strokeWidth="2" d="M12 2 L20 2 A4 4 0 0 1 22 4 L22 14 M14 22 L4 22 A4 4 0 0 1 1 18 L1 12 L12 2 M1 12 L9 12 A3 3 0 0 0 12 9 L12 1 M22 17 L22 25 M18 21 L26 21"></path></svg>
                </button>
            </Tooltip>
        </div>
    )
};
export default AddObject;