import { is_mobile } from "@/utiles"
import { useState } from "react"
import {
    IconClose,
} from "@douyinfe/semi-icons";

function MobileWarning() {
    const [open, setOpen] = useState(!!is_mobile)
    return (
        open ? <div className="mobile-warning">
            <button onClick={() => setOpen(false)} className="mobile-warning__close"><IconClose style={{ padding: '10px' }} /></button>
            <div className="mobile-warning__content">
                <div className="text-center text-white ">This app is not optimized for mobile devices</div>
                <div className="text-center text-white ">Please use a desktop device for better experience</div>
            </div>
            <div className="mobile-warning__buttons">
                <button onClick={() => window.close()}>Exit application.</button>
                <button onClick={() => setOpen(false)}>Continue</button>
            </div>
        </div>
            : null
    )
}

export default MobileWarning
