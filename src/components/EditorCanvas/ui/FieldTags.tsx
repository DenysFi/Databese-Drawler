import { FC, memo } from 'react'
import { Space, Tag } from "@douyinfe/semi-ui";
import { ITableFieldDetails } from '@/Types/table';
import { TagColor } from '@douyinfe/semi-ui/lib/es/tag';

interface FieldTagsProps {
    details: ITableFieldDetails
}

const FieldTags: FC<FieldTagsProps> = memo(({ details }) => {
    const tags = [
        { condition: details.autoinc, color: "cyan", text: "Increment" },
        { condition: !details.nulable, color: "pink", text: "Not Null" },
        { condition: details.primary, color: "orange", text: "Primary" },
        { condition: details.unique, color: "green", text: "Unique" },
    ];

    return (
        <Space className="mb-[5px]">
            {tags.map((tag, index) =>
                tag.condition && <Tag key={index} color={tag.color as TagColor}>{tag.text}</Tag>
            )}
        </Space>
    )
});

export default FieldTags;