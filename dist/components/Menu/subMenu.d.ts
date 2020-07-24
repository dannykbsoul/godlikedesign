import { FC } from "react";
export interface SubMenuProps {
    /** 支持自定义的index，默认是按照顺序从"0"开始编号 */
    index?: string;
    /** subMenu的名称 */
    title: string;
    className?: string;
}
export declare const SubMenu: FC<SubMenuProps>;
export default SubMenu;
