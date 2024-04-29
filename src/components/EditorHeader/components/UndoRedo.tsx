import { FC } from "react";
import {
    IconRedo,
    IconUndo
} from "@douyinfe/semi-icons";
import { Tooltip } from "@douyinfe/semi-ui";
const UndoRedo: FC = () => {
    return (
        <div className="flex">
            <Tooltip content='Undo' position="bottom">
                <button className="px-2 py-1 flex items-center hover:bg-[#cbd5e1] rounded">
                    <IconUndo style={{ color: 'rgb(149, 152, 166)' }} size="large" />
                </button>
            </Tooltip>
            <Tooltip content='Redo' position="bottom">
                <button className="px-2 py-1 flex items-center hover:bg-[#cbd5e1] rounded">
                    <IconRedo size="large" />
                </button>
            </Tooltip>
        </div>
    );
};

export default UndoRedo;