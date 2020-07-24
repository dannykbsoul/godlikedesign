import React, { FC } from "react";
export interface TabItemProps {
    label: string | React.ReactElement;
    disabled?: boolean;
}
export declare const TabItem: FC<TabItemProps>;
export default TabItem;
