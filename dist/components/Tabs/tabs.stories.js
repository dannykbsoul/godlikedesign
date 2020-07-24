import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Tabs from "./tabs";
import TabItem from "./tabItem";
import Icon from "../Icon";
var defaultTabs = function () { return (React.createElement(Tabs, { onSelect: action("selected") },
    React.createElement(TabItem, { label: "\u9009\u9879\u5361\u4E00" }, "this is content one"),
    React.createElement(TabItem, { label: "\u9009\u9879\u5361\u4E8C" }, "this is content two"),
    React.createElement(TabItem, { label: "\u7528\u6237\u7BA1\u7406" }, "this is content three"),
    React.createElement("li", null, "3"))); };
var cardTabs = function () { return (React.createElement(Tabs, { onSelect: action("selected"), type: "card" },
    React.createElement(TabItem, { label: "card1" }, "this is card one"),
    React.createElement(TabItem, { label: "card2" }, "this is content two"),
    React.createElement(TabItem, { label: "disabled", disabled: true }, "this is content three"))); };
var customTabs = function () { return (React.createElement(Tabs, { onSelect: action("selected"), type: "card" },
    React.createElement(TabItem, { label: React.createElement(React.Fragment, null,
            React.createElement(Icon, { icon: "check-circle" }),
            "\u81EA\u5B9A\u4E49\u56FE\u6807") }, "this is card one"),
    React.createElement(TabItem, { label: "tab2" }, "this is content two"))); };
storiesOf("Tabs Component", module)
    .add("Tabs", defaultTabs)
    .add("选项卡样式的Tabs", cardTabs)
    .add("自定义选项卡样式", customTabs);
