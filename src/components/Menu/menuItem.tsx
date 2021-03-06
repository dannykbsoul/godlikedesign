import React, { FC, useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";

export interface MenuItemProps {
  /** 支持自定义的index，默认是按照顺序从"0"开始编号 */
  index?: string;
  /** 是否禁用 */
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const MenuItem: FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props;
  const context = useContext(MenuContext);
  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index,
  });
  const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === "string")
      context.onSelect(index);
  };

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

MenuItem.displayName = "MenuItem";

export default MenuItem;
