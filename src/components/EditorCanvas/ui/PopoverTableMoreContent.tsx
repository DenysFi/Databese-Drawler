import { Button } from '@douyinfe/semi-ui';
import { FC } from 'react'
import {
    IconDeleteStroked,
} from "@douyinfe/semi-icons";

interface PopoverTableMoreContentProps {
    comment: string,
    indices: string,
    onClick: () => void
}

const PopoverTableMoreContent: FC<PopoverTableMoreContentProps> = ({ comment, indices, onClick }) => {
    return (
        <div >
            <div className="mb-[10px]"> <b>Comment:</b> {comment.length ? <span className="opacity-[0.7]">{comment}</span> : 'No comment '}</div>
            <div className="mb-[10px]"> <b>Indices:</b> {indices.length ? <span className="opacity-[0.7]">{indices}</span> : 'No indices '}</div>
            <Button
                icon={<IconDeleteStroked />}
                block
                type='danger'
                onClick={onClick}>
                Delete table
            </Button>
        </div>
    )
};
export default PopoverTableMoreContent;