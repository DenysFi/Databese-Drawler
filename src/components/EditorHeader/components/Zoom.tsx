import { Divider, Dropdown, Tooltip } from "@douyinfe/semi-ui";
import ZoomIn from "@/assets/zoom-in.png"
import ZoomOut from "@/assets/zoom-out.png"
import {
    IconSmallTriangleDown
} from "@douyinfe/semi-icons";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "@/redux-hooks";
import { setPan, setScale } from "@/store/transform";
import { scales } from "@/Constants/constants";

const Zoom: FC = () => {
    const dispatch = useAppDispatch();
    const { scale } = useAppSelector(state => state.transform);
    return (
        <>
            <Dropdown
                position={'bottomLeft'}
                trigger='click'
                style={{ width: '240px' }}
                render={
                    <Dropdown.Menu >
                        <Dropdown.Item onClick={() => {
                            dispatch(setPan({ x: 0, y: 0 }))
                            dispatch(setScale(1))
                        }}>Reset view</Dropdown.Item>
                        <Divider margin={'4px'} />
                        {scales.map((s, i) =>
                            <Dropdown.Item
                                key={i}
                                onClick={() => dispatch(setScale(s))}
                            >
                                {s * 100}%
                            </Dropdown.Item>)}
                    </Dropdown.Menu>
                }
            >
                <button className="px-2 py-1 flex items-center hover:bg-[#cbd5e1] rounded">
                    <span className="pr-1 text-base">{Math.round(scale * 100)}%</span>
                    <IconSmallTriangleDown />
                </button>
            </Dropdown>
            <Tooltip content='Zoom in' position="bottom">
                <button
                    className="px-2 py-1 flex items-center hover:bg-[#cbd5e1] rounded"
                    onClick={() => dispatch(setScale({ deltaY: -1, step: 1.2 }))}
                >
                    <img height='24px' width='24px' src={ZoomIn} alt="" />
                </button>
            </Tooltip>
            <Tooltip content='Zoom out' position="bottom">
                <button
                    className="px-2 py-1 flex items-center hover:bg-[#cbd5e1] rounded"
                    onClick={() => dispatch(setScale({ deltaY: 1, step: 1.2 }))}
                >
                    <img height='24px' width='24px' src={ZoomOut} alt="" />
                </button>
            </Tooltip>
        </>
    );
};

export default Zoom;