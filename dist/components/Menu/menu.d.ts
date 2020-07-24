import React, { FC } from "react";
declare type MenuMode = "horizontal" | "vertical";
declare type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
    /** 默认active的菜单项的索引值 */
    defaultIndex?: string;
    className?: string;
    /** menu类型 横向或纵向 */
    mode?: MenuMode;
    /** 支持自定义style */
    style?: React.CSSProperties;
    /** 点击menu触发的callback */
    onSelect?: SelectCallback;
    /** 默认打开的subMenu */
    defaultOpenSubMenus?: string[];
}
interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
export declare const Menu: FC<MenuProps>;
export default Menu;
