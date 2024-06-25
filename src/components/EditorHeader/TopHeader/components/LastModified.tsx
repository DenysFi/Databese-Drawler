import { useAppSelector } from '@/redux-hooks';
import { settingsModeSelector } from '@/store/settings';
import { FC } from 'react'

const LastModified: FC = () => {
    const { lastModified } = useAppSelector(state => state.settings)
    const mode = useAppSelector(settingsModeSelector)
    const date = new Date(+lastModified);
    const formatedDate = `Last saved ${date.getDay().toString().padStart(2, '0')}.${date.getMonth().toString().padStart(2, '0')}.${date.getFullYear()}, 
    ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} `
    const labelActiveColor = mode === 'light' ? 'bg-[#e5e7eb]' : 'bg-[#707070]';
    const labelHoverColor = mode === 'light' ? 'hover:bg-[#d1d5db]' : 'hover:bg-[#5e5e5e]';
    const textActiveColor = mode === 'light' ? 'text-black' : 'text-white';
    return (
        <div >
            <div
                className={` flex items-center ml-2 px-[12px] py-[1px] rounded ${labelActiveColor} ${labelHoverColor} ${textActiveColor}`}
            >{lastModified.length ? formatedDate : 'No Changes'}
            </div>
        </div>
    )
};
export default LastModified;