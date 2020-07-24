import React, { FC } from "react";
export interface MenuItemProps {
    /** 支持自定义的index，默认是按照顺序从"0"开始编号 */
    index?: string;
    /** 是否禁用 */
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
export declare const MenuItem: FC<MenuItemProps>;
export default MenuItem;
