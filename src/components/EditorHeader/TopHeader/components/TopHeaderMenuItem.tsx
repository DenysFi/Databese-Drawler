import { CommandObjectMethod, IMenuItem } from "@/Types"
import { useAppSelector } from "@/redux-hooks"
import { settingsModeSelector } from "@/store/settings"
import { IconChevronRight } from "@douyinfe/semi-icons"
import { Dropdown } from "@douyinfe/semi-ui"
import { FC } from "react"

interface ITopHeaderMenuItem {
	item: IMenuItem
	itemName: string
}

function hasChildren(item: any): item is { children: CommandObjectMethod } {
	return item && typeof item === "object" && "children" in item
}

const TopHeaderMenuItem: FC<ITopHeaderMenuItem> = ({ item, itemName }) => {
	const mode = useAppSelector(settingsModeSelector)
	const activeTextColor = mode === "light" ? "text-black" : "text-white"
	const activeHoverColor =
		mode === "light" ? "hover:bg-[#cbd5e1]" : "hover:bg-[#5e5f5f]"
	return (
		<Dropdown
			position="bottomLeft"
			className="w-[230px] select-none"
			render={
				<Dropdown.Menu>
					{Object.entries(item).map(([key, value]) => {
						if (hasChildren(value)) {
							return (
								<Dropdown
									key={key}
									position="rightTop"
									className="w-[130px]"
									render={
										<Dropdown.Menu>
											{Object.entries(value.children).map(([key]) => {
												return (
													<Dropdown.Item
														onClick={value.children![key]}
														key={key}
													>
														<div className="flex justify-between w-full items-center select-none">
															<div>{key}</div>
														</div>
													</Dropdown.Item>
												)
											})}
										</Dropdown.Menu>
									}
								>
									<Dropdown.Item>
										<div className="flex justify-between w-full items-center select-none">
											<div>{key}</div>
											<IconChevronRight size="small" />
										</div>
									</Dropdown.Item>
								</Dropdown>
							)
						} else {
							return (
								// @ts-expect-error  @ts-ignore (will be fixed in the next step)
								<Dropdown.Item key={key} onClick={value.function}>
									<div className="flex justify-between w-full items-center">
										<div>{key}</div>
										<div className=" text-xs text-gray-400">
											{// @ts-expect-error  @ts-ignore (will be fixed in the next step)
                                            value.shortcut}
										</div>
									</div>
								</Dropdown.Item>
							)
						}
					})}
				</Dropdown.Menu>
			}
		>
			<div
				className={`px-[12px] py-[4px] ${activeHoverColor} rounded cursor-pointer ${activeTextColor}`}
			>
				{itemName}
			</div>
		</Dropdown>
	)
}
export default TopHeaderMenuItem
