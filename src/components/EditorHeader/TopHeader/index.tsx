import { useAppSelector } from '@/redux-hooks';
import { FC, useRef } from 'react';
import Slide from '../../common/Slide';
import TopHeaderLogo from './components/TopHeaderLogo';
import { Dropdown } from '@douyinfe/semi-ui';
import LastModified from './components/LastModified';

const TopHeader: FC = () => {
    const { header } = useAppSelector(state => state.layout)
    const ref = useRef<HTMLDivElement>(null);


    const menu = {
        "File": {
            function: () => { },
            children: {
                "New": {
                    function: () => { }
                },
                "New window": {
                    function: () => { }
                },
                "Open": {
                    function: () => { }
                },
                "Save": {
                    function: () => { }
                },
                "Save as": {
                    function: () => { }
                },
                "Save as template": {
                    function: () => { }
                },
                "Rename": {
                    function: () => { }
                },
                "Delete diagram": {
                    function: () => { }
                },
                "Export as": {
                    children: {
                        "PNG": () => { },
                        "JPG": () => { },
                        "SVG": () => { },
                        "PDF": () => { },
                        "JSON": () => { },
                    }
                },
                "Export source": {
                    function: () => { }
                },
                "Exit": {
                    function: () => { }
                },
            }
        },
    }




    return (
        <Slide node={ref} flag={header} height={true}>
            <div className="flex px-[36px] pt-[10px]" ref={ref}>
                <TopHeaderLogo />
                <div className="ml-1 ">
                    <h3 className="text-xl ml-[12px]">Untitled</h3>
                    <div className="flex justify-center items-center">
                        <nav className="app-header ">
                            <div className='flex text-base'>
                                <Dropdown
                                    position='bottomLeft'
                                    className='w-[200px]'
                                    render={
                                        <Dropdown.Menu>
                                            <Dropdown.Item>
                                                <div className='flex justify-between w-full'>
                                                    <div>New</div>
                                                    <div>CTRL + W</div>
                                                </div>
                                            </Dropdown.Item>
                                            <Dropdown.Item>Menu Item 2</Dropdown.Item>
                                            <Dropdown.Item>Menu Item 3</Dropdown.Item>
                                        </Dropdown.Menu>
                                    }
                                >
                                    <div className="px-[12px] py-[4px] hover:bg-[#cbd5e1] rounded cursor-pointer">File</div>
                                </Dropdown>
                                <Dropdown
                                    position='bottomLeft'
                                    render={
                                        <Dropdown.Menu>
                                            <Dropdown.Item>Menu Item 1</Dropdown.Item>
                                            <Dropdown.Item>Menu Item 2</Dropdown.Item>
                                            <Dropdown.Item>Menu Item 3</Dropdown.Item>
                                        </Dropdown.Menu>
                                    }
                                >
                                    <div className="px-[12px] py-[4px] hover:bg-[#cbd5e1] rounded cursor-pointer">Edit</div>
                                </Dropdown>
                                <Dropdown
                                    position='bottomLeft'
                                    render={
                                        <Dropdown.Menu>
                                            <Dropdown.Item>Menu Item 1</Dropdown.Item>
                                            <Dropdown.Item>Menu Item 2</Dropdown.Item>
                                            <Dropdown.Item>Menu Item 3</Dropdown.Item>
                                        </Dropdown.Menu>
                                    }
                                >
                                    <div className="px-[12px] py-[4px] hover:bg-[#cbd5e1] rounded cursor-pointer">View</div>
                                </Dropdown>
                                <Dropdown
                                    position='bottomLeft'
                                    render={
                                        <Dropdown.Menu>
                                            <Dropdown.Item>Menu Item 1</Dropdown.Item>
                                            <Dropdown.Item>Menu Item 2</Dropdown.Item>
                                            <Dropdown.Item>Menu Item 3</Dropdown.Item>
                                        </Dropdown.Menu>
                                    }
                                >
                                    <div className="px-[12px] py-[4px] hover:bg-[#cbd5e1] rounded cursor-pointer" >Settings</div>
                                </Dropdown>
                            </div>
                            {/* <ul className="flex text-base">
                                <li className="px-[12px] py-[4px] hover:bg-[#cbd5e1] rounded">Help</li>
                            </ul> */}
                        </nav>
                        <LastModified />
                    </div>
                </div>
            </div>

        </Slide>
    )
};
export default TopHeader;

