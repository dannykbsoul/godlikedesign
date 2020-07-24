import React from "react";
import { storiesOf } from "@storybook/react";
var markdownText = "\n### \u4F7F\u7528 React+typescript \u5B9E\u73B0\u5C5E\u4E8E\u81EA\u5DF1\u7684\u7EC4\u4EF6\u5E93\n\n### \u5B89\u88C5\u8BD5\u8BD5\n\n~~~javascript\nnpm install godlikedesign --save\n~~~\n\n\n### \u4F7F\u7528\n\n~~~javascript\n// \u52A0\u8F7D\u6837\u5F0F\nimport 'vikingship/dist/index.css'\n// \u5F15\u5165\u7EC4\u4EF6\nimport { Button } from 'godlikedesign'\n~~~\n";
storiesOf("欢迎来到godlikedesign", module).add("welcome", function () {
    return React.createElement("h2", null, "\u6B22\u8FCE\u6765\u5230 vikingship \u7EC4\u4EF6\u5E93");
}, { info: { text: markdownText, source: false } });
