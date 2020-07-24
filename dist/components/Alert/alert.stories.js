import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Alert from "./alert";
var defaultAlert = function () {
    return React.createElement(Alert, { title: "this is alert!" });
};
var stylesAlert = function () {
    return (React.createElement(React.Fragment, null,
        React.createElement(Alert, { title: "this is Success", type: "success" }),
        React.createElement(Alert, { title: "this is Danger!", type: "danger" }),
        React.createElement(Alert, { title: "this is Warning!", type: "warning", closable: false })));
};
var descAlert = function () {
    return (React.createElement(Alert, { title: "\u63D0\u793A\u6807\u9898\u6B27\u4EB2", description: "this is a long description", onClose: action("closed") }));
};
storiesOf("Alert Component", module)
    .add("Alert", defaultAlert)
    .add("不同样式的 Alert", stylesAlert)
    .add("添加描述的 Alert", descAlert);
