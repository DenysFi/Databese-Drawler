import { motion, useAnimation } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { FC } from 'react'

interface SlideProps {
    node: React.RefObject<HTMLDivElement>
    children: React.ReactNode,
    flag: boolean,
    width?: boolean,
    height: boolean
}


const Slide: FC<SlideProps> = ({ children, node, flag, height }) => {
    const [divHeight, setDivHeight] = useState(0);
    const mainControls = useAnimation();

    useEffect(() => {
        if (!node.current) return;
        setDivHeight(node.current.offsetHeight)
    }, [node])

    useEffect(() => {
        flag ? mainControls.start('visible') : mainControls.start('hidden')
    }, [flag, mainControls, divHeight]);

    return (
        <motion.div
            variants={{
                hidden: { height: 0, opacity: 1 },
                default: { opacity: 1 },
                visible: { height: divHeight, opacity: 1 },
            }}
            initial="default"
            animate={mainControls}
            transition={{ duration: 0.3 }}
            className='overflow-hidden'
        >
            {children}
        </motion.div>
    )
};
export default Slide;

