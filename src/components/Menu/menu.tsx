import React, {
  FC,
  useState,
  createContext,
  FunctionComponentElement,
} from 'react';
import classNames from 'classnames';
import MenuItem, { MenuItemProps } from './menuItem';
import SubMenuItem from './subMenu';

//横向与纵向menu
type MenuMode = 'horizontal' | 'vertical';

//点击menu触发的callback
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  /** 默认active的菜单项的索引值 */
  defaultIndex?: string;
  className?: string;
  /** menu类型 横向或纵向 */
  mode?: MenuMode;
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

export const MenuContext = createContext<IMenuContext>({ index: '0' });

export const Menu: FC<MenuProps> = (props) => {
  const {
    defaultIndex,
    className,
    mode,
    style,
    onSelect,
    children,
    defaultOpenSubMenus,
  } = props;

  //设置当前高亮index的state
  const [currentActive, setActive] = useState(defaultIndex);

  const classes = classNames('godlike-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  });

  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) onSelect(index);
  };

  //传递给子组件的context
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;

      //说明此时组件是MenuItem或者SubMenuItem
      if (
        displayName === MenuItem.displayName ||
        displayName === SubMenuItem.displayName
      ) {
        //需要给子组件自动添加index，如果用户没有传入index的话
        return React.cloneElement(childElement, {
          index: index.toString(),
        });
      } else {
        console.error(
          'Warning: Menu has a child which is not a MenuItem component'
        );
      }
    });
  };

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
};

export default Menu;
