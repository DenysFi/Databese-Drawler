import { FC } from 'react'
import { ITableField } from '@/Types/table';
import FieldTags from './FieldTags';

interface PopoverFieldContentProps {
    field: ITableField
}

const PopoverFieldContent: FC<PopoverFieldContentProps> = ({ field }) => {
    return (
        <div >
            <div className="flex justify-between border-b-[1px] border-slate-400 pb-[10px] mb-[10px]" >
                <h4 className="font-medium ">{field.name}</h4>
                <span className=" opacity-[0.7]">{field.type}</span>
            </div>
            <FieldTags details={field.details} />
            <div><span className="font-medium">Default: </span> {field.details.defaultValue || 'Not set'}</div>
        </div>
    )
};
export default PopoverFieldContent;