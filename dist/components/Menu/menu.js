import React, { useState, createContext, } from "react";
import classNames from "classnames";
import MenuItem from "./menuItem";
import SubMenuItem from "./subMenu";
export var MenuContext = createContext({ index: "0" });
export var Menu = function (props) {
    var defaultIndex = props.defaultIndex, className = props.className, mode = props.mode, style = props.style, onSelect = props.onSelect, children = props.children, defaultOpenSubMenus = props.defaultOpenSubMenus;
    //设置当前高亮index的state
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var classes = classNames("godlike-menu", className, {
        "menu-vertical": mode === "vertical",
        "menu-horizontal": mode !== "vertical",
    });
    var handleClick = function (index) {
        setActive(index);
        if (onSelect)
            onSelect(index);
    };
    //传递给子组件的context
    var passedContext = {
        index: currentActive ? currentActive : "0",
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            //说明此时组件是MenuItem或者SubMenuItem
            if (displayName === MenuItem.displayName ||
                displayName === SubMenuItem.displayName) {
                //需要给子组件自动添加index，如果用户没有指定index的话
                console.log(childElement);
                return React.cloneElement(childElement, {
                    index: childElement.props.index || index.toString(),
                });
            }
            else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "test-menu" },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    defaultIndex: "0",
    mode: "horizontal",
    defaultOpenSubMenus: [],
};
export default Menu;
