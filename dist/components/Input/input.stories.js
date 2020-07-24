import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Input } from "./input";
var ControlledInput = function () {
    var _a = useState(""), value = _a[0], setValue = _a[1];
    return (React.createElement(Input, { value: value, onChange: function (e) { return setValue(e.target.value); } }));
};
var defaultInput = function () { return (React.createElement(Input, { placeholder: "\u6F02\u4EAE\u7684 Input", onChange: action("changed") })); };
var disabledInput = function () { return React.createElement(Input, { placeholder: "disabled input", disabled: true }); };
var iconInput = function () { return React.createElement(Input, { placeholder: "input with icon", icon: "search" }); };
var sizeInput = function () { return (React.createElement(React.Fragment, null,
    React.createElement(Input, { defaultValue: "large size", size: "lg" }),
    React.createElement(Input, { placeholder: "small size", size: "sm" }))); };
var pandInput = function () { return (React.createElement(React.Fragment, null,
    React.createElement(Input, { defaultValue: "prepend text", prepend: "https://" }),
    React.createElement(Input, { defaultValue: "google", append: ".com" }))); };
storiesOf("Input Component", module)
    .add("Input", defaultInput)
    .add("被禁用的 Input", disabledInput)
    .add("带图标的 Input", iconInput)
    .add("大小不同的 Input", sizeInput)
    .add("带前后缀的 Input", pandInput);
