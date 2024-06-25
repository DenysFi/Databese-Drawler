type CommandFunction = () => void;


export type CommandObjectMethod = { [key: string]: CommandFunction }

export type IMenuItem = {
    function?: CommandFunction;
    shortcast?: string;
    children?: CommandObjectMethod;
} & ({
    function: CommandFunction;
} | {
    children: CommandObjectMethod;
});


export interface IMenu {
    [category: string]: { [command: string]: IMenuItem };
}