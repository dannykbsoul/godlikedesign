import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Upload } from "./upload";
import Button from "../Button/button";
import Icon from "../Icon/icon";
var simpleUpload = function () { return (React.createElement(Upload, { action: "https://www.mocky.io/v2/5cc8019d300000980a055e76", onChange: action("changed"), onSuccess: action("success"), onProgress: action("progress"), onRemove: action("removed"), multiple: true },
    React.createElement(Button, { size: "lg", btnType: "primary" },
        React.createElement(Icon, { icon: "upload" }),
        " \u70B9\u51FB\u4E0A\u4F20",
        " "))); };
var checkUpload = function () {
    var checkFileSize = function (file) {
        if (Math.round(file.size / 1024) > 50) {
            alert("file too big");
            return false;
        }
        return true;
    };
    return (React.createElement(Upload, { action: "https://www.mocky.io/v2/5cc8019d300000980a055e76", onChange: action("changed"), beforeUpload: checkFileSize },
        React.createElement(Button, { size: "lg", btnType: "primary" },
            React.createElement(Icon, { icon: "upload" }),
            " \u4E0D\u80FD\u4F20\u5927\u4E8E50Kb")));
};
var textCheck = "\n### \u793A\u4F8B\u4EE3\u7801\n~~~javascript\nconst checkFileSize = (file: File) => {\n  if (Math.round(file.size / 1024) > 50) {\n    alert('file too big')\n    return false;\n  }\n  return true;\n}\nreturn (\n  <Upload\n    action=\"https://www.mocky.io/v2/5cc8019d300000980a055e76\"\n    onChange={action('changed')}\n    beforeUpload={checkFileSize}\n  >\n    <Button size=\"lg\" btnType=\"primary\"><Icon icon=\"upload\" /> \u4E0D\u80FD\u4F20\u5927\u4E8E50Kb\uFF01 </Button>\n  </Upload>  \n)\n~~~\n";
var dragUpload = function () { return (React.createElement(Upload, { action: "https://www.mocky.io/v2/5cc8019d300000980a055e76", onChange: action("changed"), onRemove: action("removed"), name: "fileName", multiple: true, drag: true },
    React.createElement(Icon, { icon: "upload", size: "5x", theme: "secondary" }),
    React.createElement("br", null),
    React.createElement("p", null, "\u70B9\u51FB\u6216\u8005\u62D6\u52A8\u5230\u6B64\u533A\u57DF\u8FDB\u884C\u4E0A\u4F20"))); };
storiesOf("Upload Component", module)
    .add("Upload", simpleUpload)
    .add("上传前检查文件大小", checkUpload, {
    info: { source: false, text: textCheck },
})
    .add("拖动上传", dragUpload);
