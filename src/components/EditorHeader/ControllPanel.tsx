import { FC } from "react";
import Logo from '@/assets/logo.png'

const ControllPanel: FC = () => {
    return (
        <div className=" px-[36px] pt-[10px]">
            <div className="flex ">
                <div className="h-[54px] w-[54px] justify-center items-center flex bg-[#DFF5FF] rounded">
                    <img height='32' width='32' src={Logo} alt="Logo" />
                </div>
                <div className="ml-1 ">
                    <h3 className="text-xl ml-[12px]">Untitled</h3>
                    <div className="flex justify-center items-center">
                        <nav className="app-header ">
                            <ul className="flex text-base">
                                <li className="px-[12px] py-[4px] hover:bg-[#cbd5e1] rounded">File</li>
                                <li className="px-[12px] py-[4px] hover:bg-[#cbd5e1] rounded">Edit</li>
                                <li className="px-[12px] py-[4px] hover:bg-[#cbd5e1] rounded">View</li>
                                <li className="px-[12px] py-[4px] hover:bg-[#cbd5e1] rounded">Settings</li>
                                <li className="px-[12px] py-[4px] hover:bg-[#cbd5e1] rounded">Help</li>
                            </ul>
                        </nav>
                        <div >
                            <div className=" flex items-center ml-2 px-[12px] py-[1px] rounded bg-[#e5e7eb] hover:bg-[#d1d5db]">No Changes</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="app-toolbar px-2 py-1 bg-[#DFF5FF] rounded">

            </div>
        </div>
    );
};

export default ControllPanel;  