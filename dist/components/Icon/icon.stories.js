import React from "react";
import { storiesOf } from "@storybook/react";
import Icon from "./icon";
import Button from "../Button/button";
var defaultIcons = function () { return (React.createElement(React.Fragment, null,
    React.createElement(Icon, { icon: "check", size: "3x" }),
    React.createElement(Icon, { icon: "times", size: "3x" }),
    React.createElement(Icon, { icon: "anchor", size: "3x" }),
    React.createElement(Icon, { icon: "trash", size: "3x" }),
    React.createElement(Button, { size: "lg", btnType: "primary" },
        React.createElement(Icon, { icon: "check" }),
        "check"))); };
var themeIcons = function () { return (React.createElement(React.Fragment, null,
    React.createElement(Icon, { icon: "check", size: "3x", theme: "success" }),
    React.createElement(Icon, { icon: "times", size: "3x", theme: "danger" }),
    React.createElement(Icon, { icon: "anchor", size: "3x", theme: "primary" }),
    React.createElement(Icon, { icon: "exclamation-circle", size: "3x", theme: "warning" }))); };
var customIcons = function () { return (React.createElement(React.Fragment, null,
    React.createElement(Icon, { icon: "spinner", size: "3x", theme: "primary", spin: true }),
    React.createElement(Icon, { icon: "spinner", size: "3x", theme: "success", pulse: true }))); };
storiesOf("Icon Component", module)
    .add("Icon", defaultIcons)
    .add("不同主题的 Icon", themeIcons)
    .add("更多行为的 Icon", customIcons, {
    info: {
        text: "更多例子请参见：https://github.com/FortAwesome/react-fontawesome#basic",
    },
});
