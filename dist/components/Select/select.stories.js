import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Select from "./index";
var defaultSelect = function () { return (React.createElement(Select, { placeholder: "\u8BF7\u9009\u62E9", onChange: action("changed"), onVisibleChange: action("visible") },
    React.createElement(Select.Option, { value: "nihao" }),
    React.createElement(Select.Option, { value: "nihao2" }),
    React.createElement(Select.Option, { value: "nihao3" }),
    React.createElement(Select.Option, { value: "disabled", disabled: true }),
    React.createElement(Select.Option, { value: "nihao5" }))); };
var multipleSelect = function () { return (React.createElement(Select, { placeholder: "\u652F\u6301\u591A\u9009\u6B27\uFF01", onChange: action("changed"), onVisibleChange: action("visible"), multiple: true },
    React.createElement(Select.Option, { value: "nihao" }),
    React.createElement(Select.Option, { value: "nihao2" }),
    React.createElement(Select.Option, { value: "nihao3" }),
    React.createElement(Select.Option, { value: "viking" }),
    React.createElement(Select.Option, { value: "viking2" }))); };
var disabledSelect = function () { return (React.createElement(Select, { placeholder: "\u7981\u7528\u5566\uFF01", disabled: true },
    React.createElement(Select.Option, { value: "nihao" }),
    React.createElement(Select.Option, { value: "nihao2" }),
    React.createElement(Select.Option, { value: "nihao3" }))); };
storiesOf("Select Component", module)
    .add("Select", defaultSelect)
    .add("支持多选的 Select", multipleSelect)
    .add("被禁用的 Select", disabledSelect);
