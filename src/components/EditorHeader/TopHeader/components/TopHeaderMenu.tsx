import { IMenu } from '@/Types';
import { FC } from 'react'

import TopHeaderMenuItem from './TopHeaderMenuItem';
import { useAppDispatch, useAppSelector } from '@/redux-hooks';
import { toggleHeader, toggleSidebar } from '@/store/layout';
import { setSettingsValues, toggleValue } from '@/store/settings';
import { setPan, setScale } from '@/store/transform';

const TopHeaderMenu: FC = () => {
    const dispatch = useAppDispatch();
    const { showFieldSummary } = useAppSelector(state => state.settings)
    console.log(showFieldSummary)
    const menu: IMenu = {
        "File": {
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
                function: () => { },
                shortcast: "CTRL + S"
            },
            "Save as": {
                function: () => { },
                shortcast: "CTRL + SHIFT + S"
            },
            "Save as template": {
                function: () => { }
            },
            "Rename": {
                function: () => { },
                shortcast: "CTRL + S"
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
                function: () => { },
                shortcast: "CTRL + W"
            },
        },
        "Edit": {
            "Undo": {
                function: () => { },
                shortcast: "CTRL + Z"
            },
            "Redo": {
                function: () => { },
                shortcast: "CTRL + Z"
            },
            Cut: {
                function: () => { },
                shortcast: "CTRL + X"
            },
            "Copy": {
                function: () => { },
                shortcast: "CTRL + C"
            },
            "Paste": {
                function: () => { },
                shortcast: "CTRL + V"
            },
            "Delete": {
                function: () => { },
                shortcast: "DEL"
            },
            "Duplicate": {
                function: () => { },
                shortcast: "CTRL + D"
            },
            Clear: {
                function: () => { }
            },
            Edit: {
                function: () => { },
                shortcast: "CTRL + E"
            },
            "Copy as Image": {
                function: () => { },
                shortcast: "CTRL + SHIFT + C"
            },
        },
        "View": {
            Header: {
                function: () => {
                    dispatch(toggleHeader())
                }
            },
            "Sidebar": {
                function: () => {
                    console.log(`1`)
                    dispatch(toggleSidebar())
                }
            },
            "Presentation mode": {
                function: () => { }
            },
            "Field summary": {
                function: () => {
                    dispatch(toggleValue("showFieldSummary"))
                },
                shortcast: "CTRL + SHIFT + F"
            },
            "Reset view": {
                function: () => {
                    dispatch(setPan({ x: 0, y: 0 }))
                    dispatch(setScale(1))
                }
            },
            "Show grid": {
                function: () => {
                    dispatch(toggleValue("showGrid"))
                }
            },
            "Show cardinality": {
                function: () => {
                    dispatch(toggleValue("showCardinality"))
                }
            },
            "Theme": {
                children: {
                    "Light": () => {
                        dispatch(setSettingsValues({ mode: 'light' }))
                        const body = document.body;
                        if (body.hasAttribute('theme-mode')) {
                            body.removeAttribute('theme-mode');
                        } else {
                            body.setAttribute('theme-mode', 'light');
                        }
                    },
                    "Dark": () => {
                        dispatch(setSettingsValues({ mode: 'dark' }))
                        const body = document.body;
                        if (body.hasAttribute('theme-mode')) {
                            body.removeAttribute('theme-mode');
                        } else {
                            body.setAttribute('theme-mode', 'dark');
                        }
                    }
                }
            },
            "Zoom in": {
                function: () => { },
                shortcast: "CTRL + +"
            },
            "Zoom out": {
                function: () => { },
                shortcast: "CTRL + -"
            },
            "Reset zoom": {
                function: () => { },
                shortcast: "CTRL + 0"
            },
            "Fullscreen": {
                function: () => { },
                shortcast: "F11"
            },

        },
        Settings: {
            "Show Timeline": {
                function: () => { }
            },
            Autosave: {
                function: () => { }
            },
            Panning: {
                function: () => { }
            },
            "Flush Storage": {
                function: () => { }
            },
        }
    }

    return (

        <nav className="app-header ">
            <div className='flex text-base'>
                {
                    Object.entries(menu).map(([key, value]) => {
                        return (
                            <TopHeaderMenuItem key={key} itemName={key} item={value} />
                        )
                    })
                }
            </div>
        </nav>
    )
};
export default TopHeaderMenu;