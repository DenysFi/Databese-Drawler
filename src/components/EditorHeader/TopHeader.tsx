import { FC, useEffect,  useRef, useState } from 'react'
import Logo from '@/assets/logo.png'
import { useAppSelector } from '@/redux-hooks';
import { motion, useAnimation } from 'framer-motion';

const TopHeader: FC = () => {
    const { lastModified, } = useAppSelector(state => state.settings)
    const {header} = useAppSelector(state => state.layout)
    const ref = useRef<HTMLDivElement>();
    const [divHeight, setDivHeight] = useState(0);
    const mainControls = useAnimation();
    
    const date = new Date(+lastModified);
    const formatedDate = `Last saved ${date.getDay().toString().padStart(2, '0')}.${date.getMonth().toString().padStart(2, '0')}.${date.getFullYear()}, 
    ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} `
    useEffect(() => {
        if (!ref.current) return;
        setDivHeight(ref.current.offsetHeight)
    }, [])

    useEffect(() => {
        header ? mainControls.start('visible'):  mainControls.start('hidden')
    }, [header, mainControls, divHeight]);

    return (
        <motion.div
            variants={{
                hidden: { height: 0, opacity: 1 },
                default: {   opacity: 1 },
                visible: {height: divHeight,   opacity: 1 },
            }}
            initial="default"
            animate={mainControls}
            transition={{ duration: 0.3 }}
            className='overflow-hidden'
        >

            <div className="flex px-[36px] pt-[10px]" ref={ref}>
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
                            <div className=" flex items-center ml-2 px-[12px] py-[1px] rounded bg-[#e5e7eb] hover:bg-[#d1d5db]">{lastModified.length ? formatedDate : 'No Changes'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
};
export default TopHeader;