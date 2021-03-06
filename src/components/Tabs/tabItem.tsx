import React, { FC } from "react";

export interface TabItemProps {
  //Tab选项上面的文字
  label: string | React.ReactElement;
  //Tab选项是否被禁用
  disabled?: boolean;
}

export const TabItem: FC<TabItemProps> = ({ children }) => {
  return <div className="godlike-tab-panel">{children}</div>;
};

TabItem.displayName = "TabItem";

export default TabItem;
