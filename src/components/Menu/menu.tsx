import React, { FC, useState, createContext } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";

type MenuMode = "horizontal" | "vertical";

type SelectCallback = (selectedIndex: number) => void;

export interface MenuProps {
  //默认active的菜单项的索引值
  defaultIndex?: number;
  className?: string;
  //menu类型 横向或纵向
  mode?: MenuMode;
  style?: React.CSSProperties;
  //点击menu项触发的callback
  onSelect?: SelectCallback;
}

interface IMenuContext {
  index: number;
  onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({ index: 0 });

const Menu: FC<MenuProps> = (props) => {
  const { defaultIndex, className, mode, style, onSelect, children } = props;
  const classes = classNames("godlike-menu", className, {
    "menu-vertical": mode === "vertical",
  });
  const [currentActive, setActive] = useState(defaultIndex);

  const handleClick = (index: number) => {
    setActive(index);
    if (onSelect) onSelect(index);
  };

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
        MenuItemProps
      >;
      const { displayName } = childElement.type;

      if (displayName === "MenuItem") {
        //需要给子组件自动添加index，如果用户没有传入index的话
        return React.cloneElement(childElement, {
          index,
        });
      } else {
        console.error(
          "Warning: Menu has a child which is not a MenuItem component"
        );
      }
    });
  };

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: "horizontal",
};

export default Menu;
