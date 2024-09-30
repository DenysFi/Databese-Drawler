import { FC } from 'react'
import {
    IconSmallTriangleDown,
    IconRowsStroked,
    IconCheckboxTick
} from "@douyinfe/semi-icons";
import { Divider, Dropdown } from '@douyinfe/semi-ui';
import { requestFullScreen } from '@/utiles/fullscreenRequest';
import { useAppDispatch, useAppSelector } from '@/redux-hooks';
import { toggleFullscreen, toggleHeader, toggleSidebar } from '@/store/layout';

const Layout: FC = () => {
    const dispatch = useAppDispatch();
    const { header, fullscreen, sidebar } = useAppSelector(state => state.layout)
    return (
        <>
            <Dropdown
                position={'bottomLeft'}
                trigger='click'
                style={{ width: '180px' }}
                render={
                    <Dropdown.Menu >
                        <Dropdown.Item
                            icon={header ? <IconCheckboxTick /> : <span className='mx-2' />}
                            onClick={() => dispatch(toggleHeader())}
                        >
                            Header
                        </Dropdown.Item>
                        <Dropdown.Item
                            icon={sidebar ? <IconCheckboxTick /> : <span className='mx-2' />}
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            Sidebar
                        </Dropdown.Item>
                        <Divider margin={'4px'} />
                        <Dropdown.Item
                            icon={fullscreen ? <IconCheckboxTick /> : <span className='mx-2' />}
                            onClick={() => {
                                requestFullScreen();
                                dispatch(toggleFullscreen())
                            }}>
                            Fullscreen
                        </Dropdown.Item>
                    </Dropdown.Menu>
                }
            >
                <div className="px-2 py-1 flex items-center hover:bg-[#cbd5e1] rounded cursor-pointer">
                    <IconRowsStroked size="extra-large" />
                    <IconSmallTriangleDown />
                </div>
            </Dropdown   >
        </>
    )
};
export default Layout;