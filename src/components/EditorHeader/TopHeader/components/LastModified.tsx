import { useAppSelector } from '@/redux-hooks';
import { FC } from 'react'

const LastModified: FC = () => {
    const { lastModified } = useAppSelector(state => state.settings)

    const date = new Date(+lastModified);
    const formatedDate = `Last saved ${date.getDay().toString().padStart(2, '0')}.${date.getMonth().toString().padStart(2, '0')}.${date.getFullYear()}, 
    ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} `

    return (
        <div >
            <div className=" flex items-center ml-2 px-[12px] py-[1px] rounded bg-[#e5e7eb] hover:bg-[#d1d5db]">{lastModified.length ? formatedDate : 'No Changes'}</div>
        </div>
    )
};
export default LastModified;