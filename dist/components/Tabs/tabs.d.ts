import { FC } from "react";
export interface TabsProps {
    /** 当前激活tab面板的index，默认为0 */
    defaultIndex?: number;
    /** 可以扩展的className */
    className?: string;
    /** 点击tab触发的回调函数 */
    onSelect?: (selectedIndex: number) => void;
    /** tab的两种样式，默认是line */
    type?: "line" | "card";
}
export declare const Tabs: FC<TabsProps>;
export default Tabs;
