import { FC } from 'react'
import Logo from '@/assets/logo.png';

const TopHeaderLogo: FC = () => {
    return (
        <div className="h-[54px] w-[54px] justify-center items-center flex bg-[#DFF5FF] rounded">
            <img height='32' width='32' src={Logo} alt="Logo" />
        </div>
    )
};
export default TopHeaderLogo;