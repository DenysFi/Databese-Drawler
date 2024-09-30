import { useAppSelector } from '@/redux-hooks';
import { FC, useRef } from 'react';
import Slide from '../../common/Slide';
import LastModified from './components/LastModified';
import TopHeaderLogo from './components/TopHeaderLogo';
import TopHeaderMenu from './components/TopHeaderMenu';
import { settingsModeSelector } from '@/store/settings';

const TopHeader: FC = () => {
    const { header } = useAppSelector(state => state.layout)
    const ref = useRef<HTMLDivElement>(null);
    const mode = useAppSelector(settingsModeSelector)
    const titleColor = mode === 'light' ? 'text-black' : 'text-white';
    return (
        <Slide node={ref} flag={header} height={true}>
            <div className="flex px-[36px] pt-[10px]" ref={ref}>
                <TopHeaderLogo />
                <div className="ml-1 ">
                    <h3 className={`text-xl ml-[12px] ${titleColor}`}>Untitled</h3>
                    <div className="flex justify-center items-center">
                        <TopHeaderMenu />
                        <LastModified />
                    </div>
                </div>
            </div>

        </Slide>
    )
};
export default TopHeader;

