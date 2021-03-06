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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState, useEffect, useRef, } from "react";
import classNames from "classnames";
import Input from "../Input/input";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
/**
 * 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式
 * 支持 Input 组件的所有属性 支持键盘事件选择
 * ### 引用方法
 *
 * ~~~js
 * import { AutoComplete } from 'godlikedesign'
 * ~~~
 */
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    //输入框value值
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    //下拉框的数据
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    //显示loading动画的state
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    //是否显示下拉框
    var _d = useState(false), showDropdown = _d[0], setShowDropdown = _d[1];
    //键盘操作时候的高亮 上下移动
    var _e = useState(-1), highlightIndex = _e[0], setHighlightIndex = _e[1];
    //是否触发search
    var triggerSearch = useRef(false);
    //记住dom的引用，为什么传入的泛型是HTMLDivElement呢？因为我们需要记住的引用是div
    var componentRef = useRef(null);
    //获取debouncedValue值
    var debouncedValue = useDebounce(inputValue, 300);
    useClickOutside(componentRef, function () {
        setSuggestions([]);
    });
    useEffect(function () {
        //当debouncedValue存在并且需要发动search，我们才去发起请求
        if (debouncedValue && triggerSearch.current) {
            //需要先将下拉框内容置空
            setSuggestions([]);
            var results = fetchSuggestions(debouncedValue);
            //这里联合类型会被if else的判断分开
            if (results instanceof Promise) {
                setLoading(true);
                results.then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                    if (data.length > 0)
                        setShowDropdown(true);
                });
            }
            else {
                setSuggestions(results);
                setShowDropdown(true);
                if (results.length > 0)
                    setShowDropdown(true);
            }
        }
        else {
            setShowDropdown(false);
        }
        //每次value重新变化的时候，需要将highlight重置
        setHighlightIndex(-1);
    }, [debouncedValue, fetchSuggestions]);
    var highlight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length)
            index = suggestions.length - 1;
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 13:
                //需要做判断，因为有可能此时suggestions并没有
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 38:
                highlight(highlightIndex - 1);
                break;
            case 40:
                highlight(highlightIndex + 1);
                break;
            case 27:
                setShowDropdown(false);
                break;
            default:
                break;
        }
    };
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        //当handleChange执行了，说明我们想要发起search，所以置为true
        triggerSearch.current = true;
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        setShowDropdown(false);
        if (onSelect) {
            onSelect(item);
        }
        //此时说明是点击下拉选项，我们不希望发起search，所以置为false
        triggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (React.createElement(Transition, { in: showDropdown || loading, animation: "zoom-in-top", timeout: 300, onExited: function () {
                setSuggestions([]);
            } },
            React.createElement("ul", { className: "godlike-suggestion-list" },
                loading && (React.createElement("div", { className: "suggstions-loading-icon" },
                    React.createElement(Icon, { icon: "spinner", spin: true }))),
                suggestions.map(function (item, index) {
                    var cnames = classNames("suggestion-item", {
                        "is-active": index === highlightIndex,
                    });
                    return (React.createElement("li", { key: index, className: cnames, onClick: function () { return handleSelect(item); } }, renderTemplate(item)));
                }))));
    };
    return (React.createElement("div", { className: "godlike-auto-complete", ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps)),
        generateDropdown()));
};
export default AutoComplete;
