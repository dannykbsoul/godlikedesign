import React, {
  FC,
  useState,
  FunctionComponentElement,
  FunctionComponent,
} from "react";
import classNames from "classnames";
import { TabItemProps } from "./tabItem";

export interface TabsProps {
  //当前激活tab面板的index，默认为0
  defaultIndex?: number;
  //可以扩展的className
  className?: string;
  //点击tab触发的回调函数
  onSelect?: (selectedIndex: number) => void;
  //tab的两种样式，默认是line
  type?: "line" | "card";
}

const Tabs: FC<TabsProps> = (props) => {
  const { defaultIndex, className, onSelect, type, children } = props;
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

  const renderNavLinks = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<TabItemProps>;
      const { label, disabled } = childElement.props;
      const classes = classNames("godlike-tabs-nav-item", {
        "is-active": activeIndex === index,
        disabled: disabled,
      });

      return (
        <li
          className={classes}
          key={`nav-item-${index}`}
          onClick={() => handleClick(index, disabled)}
        >
          {label}
        </li>
      );
    });
  };

  const renderContent = () => {
    return React.Children.map(children, (child, index) => {
      return index === activeIndex ? child : null;
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
