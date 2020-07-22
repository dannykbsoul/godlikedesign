import React, { FC, useState, FunctionComponentElement } from "react";
import classNames from "classnames";
import TabItem, { TabItemProps } from "./tabItem";

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

export const Tabs: FC<TabsProps> = (props) => {
  const { defaultIndex, className, onSelect, type, children } = props;
  //需要一个state来管理active的index
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleClick = (index: number, disabled: boolean | undefined) => {
    if (!disabled) {
      setActiveIndex(index);
      if (onSelect) onSelect(index);
    }
  };

  const navClass = classNames("godlike-tabs-nav", {
    "nav-line": type === "line",
    "nav-card": type === "card",
  });

  //导航栏
  const renderNavLinks = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<TabItemProps>;
      const { label, disabled } = childElement.props;
      const { displayName } = childElement.type;
      const classes = classNames("godlike-tabs-nav-item", {
        "is-active": activeIndex === index,
        disabled: disabled,
      });
      //子元素是TabItem组件才处理
      if (displayName === TabItem.displayName) {
        return (
          <li
            className={classes}
            key={`nav-item-${index}`}
            onClick={() => handleClick(index, disabled)}
          >
            {label}
          </li>
        );
      } else {
        console.error(
          "Warning: tabs has a child which is not a tabItem component"
        );
      }
    });
  };

  const renderContent = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<TabItemProps>;
      const { displayName } = childElement.type;
      if (displayName === TabItem.displayName) {
        return index === activeIndex ? child : null;
      } else {
        console.error(
          "Warning: tabs has a child which is not a tabItem component"
        );
      }
    });
  };

  return (
    <div className={`godlike-tabs ${className}`}>
      <ul className={navClass}>{renderNavLinks()}</ul>
      <div className="godlike-tabs-content">{renderContent()}</div>
    </div>
  );
};

Tabs.defaultProps = {
  defaultIndex: 0,
  type: "line",
};

export default Tabs;
