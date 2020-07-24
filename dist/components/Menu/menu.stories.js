import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Menu from "./index";
export var defaultMenu = function () { return (React.createElement(Menu, { defaultIndex: "0", onSelect: action("selected!"), style: { width: "655px" } },
    React.createElement(Menu.Item, { index: "66" }, "cool link"),
    React.createElement(Menu.Item, { index: "67" }, "cool link 2"),
    React.createElement(Menu.Item, { index: "68" }, "cool link 3"),
    React.createElement(Menu.SubMenu, { title: "\u4E0B\u62C9\u9009\u98791", index: "33" },
        React.createElement(Menu.Item, null, "\u4E0B\u62C9\u9009\u9879\u4E00"),
        React.createElement(Menu.Item, null, "\u4E0B\u62C9\u9009\u9879\u4E8C")),
    React.createElement(Menu.Item, { disabled: true }, "disabled"),
    React.createElement(Menu.SubMenu, { title: "\u4E0B\u62C9\u9009\u98792", index: "34" },
        React.createElement(Menu.Item, { index: "100" }, "\u4E0B\u62C9\u9009\u9879\u4E09"),
        React.createElement(Menu.Item, null, "\u4E0B\u62C9\u9009\u9879\u56DB")))); };
export var clickMenu = function () { return (React.createElement(Menu, { defaultIndex: "0", onSelect: action("selected!"), mode: "vertical" },
    React.createElement(Menu.Item, null, "cool link"),
    React.createElement(Menu.Item, null, "cool link 2"),
    React.createElement(Menu.SubMenu, { title: "\u70B9\u51FB\u4E0B\u62C9\u9009\u9879" },
        React.createElement(Menu.Item, null, "\u4E0B\u62C9\u9009\u9879\u4E00"),
        React.createElement(Menu.Item, null, "\u4E0B\u62C9\u9009\u9879\u4E8C")))); };
export var openedMenu = function () { return (React.createElement(Menu, { defaultIndex: "0", onSelect: action("selected!"), mode: "vertical", defaultOpenSubMenus: ["3"] },
    React.createElement(Menu.Item, null, "cool link"),
    React.createElement(Menu.Item, null, "cool link 2"),
    React.createElement(Menu.SubMenu, { title: "\u9ED8\u8BA4\u5C55\u5F00\u4E0B\u62C9\u9009\u98791" },
        React.createElement(Menu.Item, null, "\u4E0B\u62C9\u9009\u9879\u4E00"),
        React.createElement(Menu.Item, null, "\u4E0B\u62C9\u9009\u9879\u4E8C")),
    React.createElement(Menu.SubMenu, { title: "\u9ED8\u8BA4\u5C55\u5F00\u4E0B\u62C9\u9009\u98792" },
        React.createElement(Menu.Item, null, "\u4E0B\u62C9\u9009\u9879\u4E09"),
        React.createElement(Menu.Item, null, "\u4E0B\u62C9\u9009\u9879\u56DB")))); };
storiesOf("Menu Component", module)
    .add("Menu", defaultMenu)
    .add("纵向的 Menu", clickMenu)
    .add("默认展开的纵向 Menu", openedMenu);
