import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button from "./button";
var defaultButton = function () { return (React.createElement(Button, { onClick: action("clicked") }, " default button ")); };
var buttonWithSize = function () { return (React.createElement(React.Fragment, null,
    React.createElement(Button, { size: "lg" }, " large button "),
    React.createElement(Button, { size: "sm" }, " small button "))); };
var buttonWithType = function () { return (React.createElement(React.Fragment, null,
    React.createElement(Button, { btnType: "primary" }, " primary button "),
    React.createElement(Button, { btnType: "danger" }, " danger button "),
    React.createElement(Button, { btnType: "link", href: "https://google.com" }, "link button"))); };
storiesOf("Button Component", module)
    .add("defaultButton", defaultButton)
    .add("不同尺寸的 Button", buttonWithSize)
    .add("不同类型的 Button", buttonWithType);
