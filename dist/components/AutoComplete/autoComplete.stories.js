var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { AutoComplete } from "./autoComplete";
var simpleComplete = function () {
    var lakers = [
        "bradley",
        "pope",
        "caruso",
        "cook",
        "cousins",
        "james",
        "AD",
        "green",
        "howard",
        "kuzma",
        "McGee",
        "rando",
    ];
    var handleFetch = function (query) {
        return lakers
            .filter(function (name) { return name.includes(query); })
            .map(function (name) { return ({ value: name }); });
    };
    return (React.createElement(AutoComplete, { fetchSuggestions: handleFetch, onSelect: action("selected"), placeholder: "\u8F93\u5165\u6E56\u4EBA\u961F\u7403\u5458\u82F1\u6587\u540D\u8BD5\u8BD5" }));
};
var textComplete = "\n  ~~~javascript\n  const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',\n  'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']\n  const handleFetch = (query: string) => {\n    return lakers.filter(name => name.includes(query)).map(name => ({value: name}))\n  }\n  return (\n    <AutoComplete \n      fetchSuggestions={handleFetch}\n      onSelect={action('selected')}\n      placeholder=\"\u8F93\u5165\u6E56\u4EBA\u961F\u7403\u5458\u82F1\u6587\u540D\u8BD5\u8BD5\"\n    />\n  )\n  ~~~\n";
var customComplete = function () {
    var lakersWithNumber = [
        { value: "bradley", number: 11 },
        { value: "pope", number: 1 },
        { value: "caruso", number: 4 },
        { value: "cook", number: 2 },
        { value: "cousins", number: 15 },
        { value: "james", number: 23 },
        { value: "AD", number: 3 },
        { value: "green", number: 14 },
        { value: "howard", number: 39 },
        { value: "kuzma", number: 0 },
    ];
    var handleFetch = function (query) {
        return lakersWithNumber.filter(function (player) { return player.value.includes(query); });
    };
    var renderOption = function (item) {
        var itemWithNumber = item;
        return (React.createElement(React.Fragment, null,
            React.createElement("b", null,
                "\u540D\u5B57: ",
                itemWithNumber.value),
            React.createElement("span", null,
                "\u7403\u8863\u53F7\u7801: ",
                itemWithNumber.number)));
    };
    return (React.createElement(AutoComplete, { fetchSuggestions: handleFetch, onSelect: action("selected"), placeholder: "\u8F93\u5165\u6E56\u4EBA\u961F\u7403\u5458\u82F1\u6587,\u81EA\u5B9A\u4E49\u4E0B\u62C9\u6A21\u7248", renderOption: renderOption }));
};
var textCustom = "\n### \u793A\u4F8B\u4EE3\u7801\n~~~javascript\nconst lakersWithNumber = [\n  {value: 'bradley', number: 11},\n  {value: 'pope', number: 1},\n  {value: 'caruso', number: 4},\n  {value: 'cook', number: 2},\n  {value: 'cousins', number: 15},\n  {value: 'james', number: 23},\n  {value: 'AD', number: 3},\n  {value: 'green', number: 14},\n  {value: 'howard', number: 39},\n  {value: 'kuzma', number: 0},\n] \nconst handleFetch = (query: string) => {\n  return lakersWithNumber.filter(player => player.value.includes(query))\n}\nconst renderOption = (item: DataSourceType) => {\n  const itemWithNumber = item as DataSourceType<LakerPlayerProps>\n  return (\n    <>\n      <b>\u540D\u5B57: {itemWithNumber.value}</b>\n      <span>\u7403\u8863\u53F7\u7801: {itemWithNumber.number}</span>\n    </>\n  )\n}\nreturn (\n  <AutoComplete \n    fetchSuggestions={handleFetch}\n    onSelect={action('selected')}\n    placeholder=\"\u8F93\u5165\u6E56\u4EBA\u961F\u7403\u5458\u82F1\u6587,\u81EA\u5B9A\u4E49\u4E0B\u62C9\u6A21\u7248\"\n    renderOption={renderOption}\n  />\n)\n~~~\n";
var ajaxComplete = function () {
    var handleFetch = function (query) {
        return fetch("https://api.github.com/search/users?q=" + query)
            .then(function (res) { return res.json(); })
            .then(function (_a) {
            var items = _a.items;
            return items
                .slice(0, 10)
                .map(function (item) { return (__assign({ value: item.login }, item)); });
        });
    };
    var renderOption = function (item) {
        var itemWithGithub = item;
        return (React.createElement(React.Fragment, null,
            React.createElement("img", { src: itemWithGithub.avatar_url, style: { width: "auto", height: "24px" }, alt: "" }),
            React.createElement("b", null,
                "Name: ",
                itemWithGithub.value),
            React.createElement("span", null,
                "url: ",
                itemWithGithub.url)));
    };
    return (React.createElement(AutoComplete, { fetchSuggestions: handleFetch, placeholder: "\u8F93\u5165 Github \u7528\u6237\u540D\u8BD5\u8BD5", onSelect: action("selected"), renderOption: renderOption }));
};
var textAjax = "\n### \u793A\u4F8B\u4EE3\u7801\n~~~javascript\nconst handleFetch = (query: string) => {\n  return fetch('https://api.github.com/search/users?q='+ query)\n    .then(res => res.json())\n    .then(({ items }) => {\n      return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item}))\n    })\n}\n\nconst renderOption = (item: DataSourceType) => {\n  const itemWithGithub = item as DataSourceType<GithubUserProps>\n  return (\n    <>\n      <b>Name: {itemWithGithub.value}</b>\n      <span>url: {itemWithGithub.url}</span>\n    </>\n  )\n}\nreturn (\n  <AutoComplete \n    fetchSuggestions={handleFetch}\n    placeholder=\"\u8F93\u5165 Github \u7528\u6237\u540D\u8BD5\u8BD5\"\n    onSelect={action('selected')}\n    renderOption={renderOption}\n  />\n)\n~~~\n";
storiesOf("AutoComplete Component", module)
    .add("AutoComplete", simpleComplete, {
    info: { source: false, text: textComplete },
})
    .add("自定义下拉选项", customComplete, {
    info: { source: false, text: textCustom },
})
    .add("异步请求Github用户名", ajaxComplete, {
    info: { source: false, text: textAjax },
});
