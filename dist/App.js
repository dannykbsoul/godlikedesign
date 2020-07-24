import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import Tabs from "./components/Tabs/tabs";
import TabItem from "./components/Tabs/tabItem";
import Input from "./components/Input";
library.add(fas);
function App() {
    return (React.createElement("div", null,
        React.createElement(Menu, { mode: "horizontal", onSelect: function (index) {
                alert(index);
            }, defaultOpenSubMenus: ["3"] },
            React.createElement(MenuItem, null, "1"),
            React.createElement(MenuItem, null, "2"),
            React.createElement(MenuItem, null, "3"),
            React.createElement(SubMenu, { title: "dropdown" },
                React.createElement(MenuItem, null, "4"),
                React.createElement(MenuItem, null, "5"),
                React.createElement(MenuItem, null,
                    React.createElement(Button, null, "123")))),
        React.createElement(Tabs, null,
            React.createElement(TabItem, { label: "card1" }, "card one"),
            React.createElement(TabItem, { label: "card2" }, "card two"),
            React.createElement(TabItem, { label: "disabled", disabled: true }, "card three")),
        React.createElement("input", { type: "text" }),
        React.createElement(Input, { onChange: function (e) {
                console.log(e);
            }, onClick: function (e) { return console.log(e); } })));
}
export default App;
