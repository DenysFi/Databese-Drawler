import { FC } from "react";
import Logo from '@/assets/logo.png'
import {
    IconSmallTriangleDown,
    IconRowsStroked
} from "@douyinfe/semi-icons";
import { Divider, Tooltip } from "@douyinfe/semi-ui";
import Zoom from "./components/Zoom";
import UndoRedo from "./components/UndoRedo";
import AddObject from "./components/AddObject";


const ControllPanel: FC = () => {

    return (
        <div className="">
            <div className="flex px-[36px] pt-[10px]">
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
            <div className="app-toolbar py-[3px] px-4  my-1 mx-6 bg-[#DFF5FF] rounded-lg flex  items-center">
                <div className="px-2 py-1 flex items-center hover:bg-[#cbd5e1] rounded">
                    <IconRowsStroked size="extra-large" />
                    <IconSmallTriangleDown />
                </div>
                <Divider layout="vertical" margin='10px' />
                <Zoom />
                <Divider layout="vertical" margin='10px' />
                <UndoRedo />
                <Divider layout="vertical" margin='10px' />
                <AddObject />
                <Divider layout="vertical" margin='10px' />
                <Tooltip content="Save" position="bottom">
                    <button className="px-2 py-1 flex items-center hover:bg-[#cbd5e1] rounded ">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" focusable="false" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 4C2 2.89543 2.89543 2 4 2H7H12H14.9608C15.4912 2 15.9999 2.21071 16.375 2.58579L21.4142 7.625C21.7893 8.00007 22 8.50878 22 9.03921V20C22 21.1046 21.1046 22 20 22H17H7H4C2.89543 22 2 21.1046 2 20V4ZM11 4H8V7H11V4ZM6 4V8C6 8.55228 6.44772 9 7 9H12C12.5523 9 13 8.55228 13 8V4H14.9608L20 9.03921V20H18V15C18 14.4477 17.5523 14 17 14H7C6.44772 14 6 14.4477 6 15V20H4V4H6ZM16 16V20H8V16H16Z" fill="currentColor"></path></svg>
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};

export default ControllPanel;  