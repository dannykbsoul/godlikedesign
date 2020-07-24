import React, { useState } from "react";
import classNames from "classnames";
import TabItem from "./tabItem";
export var Tabs = function (props) {
    var defaultIndex = props.defaultIndex, className = props.className, onSelect = props.onSelect, type = props.type, children = props.children;
    //需要一个state来管理active的index
    var _a = useState(defaultIndex), activeIndex = _a[0], setActiveIndex = _a[1];
    var handleClick = function (index, disabled) {
        if (!disabled) {
            setActiveIndex(index);
            if (onSelect)
                onSelect(index);
        }
    };
    var navClass = classNames("godlike-tabs-nav", {
        "nav-line": type === "line",
        "nav-card": type === "card",
    });
    //导航栏
    var renderNavLinks = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var _a = childElement.props, label = _a.label, disabled = _a.disabled;
            var displayName = childElement.type.displayName;
            var classes = classNames("godlike-tabs-nav-item", {
                "is-active": activeIndex === index,
                disabled: disabled,
            });
            //子元素是TabItem组件才处理
            if (displayName === TabItem.displayName) {
                return (React.createElement("li", { className: classes, key: "nav-item-" + index, onClick: function () { return handleClick(index, disabled); } }, label));
            }
            else {
                console.error("Warning: tabs has a child which is not a tabItem component");
            }
        });
    };
    var renderContent = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === TabItem.displayName) {
                return index === activeIndex ? child : null;
            }
            else {
                console.error("Warning: tabs has a child which is not a tabItem component");
            }
        });
    };
    return (React.createElement("div", { className: "godlike-tabs " + className },
        React.createElement("ul", { className: navClass }, renderNavLinks()),
        React.createElement("div", { className: "godlike-tabs-content" }, renderContent())));
};
Tabs.defaultProps = {
    defaultIndex: 0,
    type: "line",
};
export default Tabs;
