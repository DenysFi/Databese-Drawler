import { IMenu, IMenuItem } from "@/Types"
import { FC } from "react"

import { useAppDispatch } from "@/redux-hooks"
import { toggleHeader, toggleSidebar } from "@/store/layout"
import { setSettingsValues, toggleValue } from "@/store/settings"
import { setPan, setScale } from "@/store/transform"
import TopHeaderMenuItem from "./TopHeaderMenuItem"

const TopHeaderMenu: FC = () => {
	const dispatch = useAppDispatch()

	const menu: IMenu = {
		File: {
			New: {
				function: () => {},
			},
			"New window": {
				function: () => {},
			},
			Open: {
				function: () => {},
			},
			Save: {
				function: () => {},
				shortcut: "CTRL + S",
			},
			"Save as": {
				function: () => {},
				shortcut: "CTRL + SHIFT + S",
			},
			"Save as template": {
				function: () => {},
			},
			Rename: {
				function: () => {},
				shortcut: "CTRL + S",
			},
			"Delete diagram": {
				function: () => {},
			},
			"Export as": {
				children: {
					PNG: () => {},
					JPG: () => {},
					SVG: () => {},
					PDF: () => {},
					JSON: () => {},
				},
			},
			"Export source": {
				function: () => {},
			},
			Exit: {
				function: () => {},
				shortcut: "CTRL + W",
			},
		},
		Edit: {
			Undo: {
				function: () => {},
				shortcut: "CTRL + Z",
			},
			Redo: {
				function: () => {},
				shortcut: "CTRL + Z",
			},
			Cut: {
				function: () => {},
				shortcut: "CTRL + X",
			},
			Copy: {
				function: () => {},
				shortcut: "CTRL + C",
			},
			Paste: {
				function: () => {},
				shortcut: "CTRL + V",
			},
			Delete: {
				function: () => {},
				shortcut: "DEL",
			},
			Duplicate: {
				function: () => {},
				shortcut: "CTRL + D",
			},
			Clear: {
				function: () => {},
			},
			Edit: {
				function: () => {},
				shortcut: "CTRL + E",
			},
			"Copy as Image": {
				function: () => {},
				shortcut: "CTRL + SHIFT + C",
			},
		},
		View: {
			Header: {
				function: () => {
					dispatch(toggleHeader())
				},
			},
			Sidebar: {
				function: () => {
					console.log(`1`)
					dispatch(toggleSidebar())
				},
			},
			"Presentation mode": {
				function: () => {},
			},
			"Field summary": {
				function: () => {
					dispatch(toggleValue("showFieldSummary"))
				},
				shortcut: "CTRL + SHIFT + F",
			},
			"Reset view": {
				function: () => {
					dispatch(setPan({ x: 0, y: 0 }))
					dispatch(setScale(1))
				},
			},
			"Show grid": {
				function: () => {
					dispatch(toggleValue("showGrid"))
				},
			},
			"Show cardinality": {
				function: () => {
					dispatch(toggleValue("showCardinality"))
				},
			},
			Theme: {
				children: {
					Light: () => {
						dispatch(setSettingsValues({ mode: "light" }))
						const body = document.body
						if (body.hasAttribute("theme-mode")) {
							body.removeAttribute("theme-mode")
						} else {
							body.setAttribute("theme-mode", "light")
						}
					},
					Dark: () => {
						dispatch(setSettingsValues({ mode: "dark" }))
						const body = document.body
						if (body.hasAttribute("theme-mode")) {
							body.removeAttribute("theme-mode")
						} else {
							body.setAttribute("theme-mode", "dark")
						}
					},
				},
			},
			"Zoom in": {
				function: () => {},
				shortcut: "CTRL + +",
			},
			"Zoom out": {
				function: () => {},
				shortcut: "CTRL + -",
			},
			"Reset zoom": {
				function: () => {},
				shortcut: "CTRL + 0",
			},
			Fullscreen: {
				function: () => {},
				shortcut: "F11",
			},
		},
		Settings: {
			"Show Timeline": {
				function: () => {},
			},
			Autosave: {
				function: () => {},
			},
			Panning: {
				function: () => {},
			},
			"Flush Storage": {
				function: () => {},
			},
		},
	}

	return (
		<nav className="app-header ">
			<div className="flex text-base">
				{Object.entries(menu).map(([key, value]) => {
					return (
						<TopHeaderMenuItem
							key={key}
							itemName={key}
							item={value as unknown as IMenuItem}
						/>
					)
				})}
			</div>
		</nav>
	)
}
export default TopHeaderMenu
