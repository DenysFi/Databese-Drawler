type CommandFunction = () => void

export type CommandObjectMethod = { [key: string]: CommandFunction }

export type IMenuItem = {
	function?: CommandFunction
	shortcut?: string
	children?: CommandObjectMethod
} & (
	| {
			function: CommandFunction
	  }
	| {
			children: CommandObjectMethod
	  }
)

export interface IMenu {
	[category: string]: { [command: string]: IMenuItem }
}
