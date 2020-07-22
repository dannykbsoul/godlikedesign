import React, {
  FC,
  useContext,
  useState,
  FunctionComponentElement,
} from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import MenuItem, { MenuItemProps } from "./menuItem";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";

export interface SubMenuProps {
  /** 支持自定义的index，默认是按照顺序从"0"开始编号 */
  index?: string;
  /** subMenu的名称 */
  title: string;
  className?: string;
}

export const SubMenu: FC<SubMenuProps> = ({
  index,
  title,
  children,
  className,
}) => {
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;

  //对于垂直Menu会有默认打开的Menu
  const isOpend =
    index && context.mode === "vertical"
      ? openedSubMenus.includes(index)
      : false;

  //需要一个state来管理此时的subMenu开关状态
  const [menuOpen, setOpen] = useState(isOpend);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
    "is-opened": menuOpen,
    "is-vertical": context.mode === "vertical",
  });

  //subMenu
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };

  //对于hover下拉Menu的菜单会有300ms的延迟
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };

  //对于不同mode下的下拉框有不同的展开方式
  const clickEvents =
    context.mode === "vertical"
      ? {
          onClick: handleClick,
        }
      : {};
  const hoverEvents =
    context.mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};
  const renderChildren = () => {
    const subMenuClasses = classNames("godlike-submenu", {
      "menu-opened": menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === MenuItem.displayName) {
        //如果用户没有传index，那么采用`${index}-${i}`的方式
        return React.cloneElement(childElement, {
          index: childElement.props.index || `${index}-${i}`,
        });
      } else {
        console.error(
          "Warning: SubMenu has a child which is not a MenuItem component"
        );
      }
    });
    return (
      <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </Transition>
    );
  };
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;
