var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useState, createContext, useRef, useEffect, } from "react";
import classNames from "classnames";
import Input from "../Input";
import Icon from "../Icon";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from "../Transition/transition";
export var SelectContext = createContext({
    selectedValues: [],
});
/**
 * 下拉选择器。
 * 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 * ### 引用方法
 *
 * ~~~js
 * import { Select } from 'godlikedesign'
 * // 然后可以使用 <Select> 和 <Select.Option>
 * ~~~
 */
export var Select = function (props) {
    var defaultValue = props.defaultValue, placeholder = props.placeholder, children = props.children, multiple = props.multiple, name = props.name, disabled = props.disabled, onChange = props.onChange, onVisibleChange = props.onVisibleChange;
    //获取到input框dom的引用
    var input = useRef(null);
    //获取到整个容器dom的引用，主要是为了后续的useClickOutside hooks的使用
    var containerRef = useRef(null);
    var containerWidth = useRef(0);
    //当mode为多选的时候选中条目的state
    var _a = useState(Array.isArray(defaultValue) ? defaultValue : []), selectedValues = _a[0], setSelectedValues = _a[1];
    //需要一个state来管理下拉框的开合
    var _b = useState(false), menuOpen = _b[0], setOpen = _b[1];
    //当mode为单选时候的state
    var _c = useState(typeof defaultValue === "string" ? defaultValue : ""), value = _c[0], setValue = _c[1];
    //这个方法服务于点击下拉条目实现增加删除
    var handleOptionClick = function (value, isSelected) {
        //单选的时候 需要将下拉框收起，并且设置input框的value值
        if (!multiple) {
            setOpen(false);
            setValue(value);
            if (onVisibleChange) {
                onVisibleChange(false);
            }
        }
        else {
            //多选的话先将input框值置空
            setValue("");
        }
        var updatedValues = [value];
        //多选模式下，要判断原先状态是否选中状态
        if (multiple) {
            updatedValues = isSelected
                ? selectedValues.filter(function (v) { return v !== value; })
                : __spreadArrays(selectedValues, [value]);
            setSelectedValues(updatedValues);
        }
        if (onChange) {
            onChange(value, updatedValues);
        }
    };
    //selectedValues, multiple, placeholder发生变化的时候执行
    //如果多选情况下有selectedValues，则placeholder需要置空，否则有placeholder需要填上placeholder
    useEffect(function () {
        if (input.current) {
            input.current.focus();
            if (multiple && selectedValues.length > 0) {
                input.current.placeholder = "";
            }
            else {
                if (placeholder)
                    input.current.placeholder = placeholder;
            }
        }
    }, [selectedValues, multiple, placeholder]);
    useEffect(function () {
        if (containerRef.current) {
            containerWidth.current = containerRef.current.getBoundingClientRect().width;
        }
    });
    //点击container区域外的时候，需要将下拉框收起
    useClickOutside(containerRef, function () {
        setOpen(false);
        if (onVisibleChange && menuOpen) {
            onVisibleChange(false);
        }
    });
    var passedContext = {
        onSelect: handleOptionClick,
        selectedValues: selectedValues,
        multiple: multiple,
    };
    var handleClick = function (e) {
        e.preventDefault();
        if (!disabled) {
            setOpen(!menuOpen);
            if (onVisibleChange) {
                onVisibleChange(!menuOpen);
            }
        }
    };
    //下拉框内容
    var generateOptions = function () {
        return React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === "Option") {
                return React.cloneElement(childElement, {
                    index: "select-" + i,
                });
            }
            else {
                console.error("Warning: Select has a child which is not a Option component");
            }
        });
    };
    var containerClass = classNames("godlike-select", {
        "menu-is-open": menuOpen,
        "is-disabled": disabled,
        "is-multiple": multiple,
    });
    return (React.createElement("div", { className: containerClass, ref: containerRef },
        React.createElement("div", { className: "godlike-select-input", onClick: handleClick },
            React.createElement(Input, { ref: input, placeholder: placeholder, value: value, readOnly: true, icon: "angle-down", disabled: disabled, name: name })),
        React.createElement(SelectContext.Provider, { value: passedContext },
            React.createElement(Transition, { in: menuOpen, animation: "zoom-in-top", timeout: 300 },
                React.createElement("ul", { className: "godlike-select-dropdown" }, generateOptions()))),
        multiple && (React.createElement("div", { className: "godlike-selected-tags", style: { maxWidth: containerWidth.current - 32 } }, selectedValues.map(function (value, index) {
            return (React.createElement("span", { className: "godlike-tag", key: "tag-" + index },
                value,
                React.createElement(Icon, { icon: "times", onClick: function () {
                        handleOptionClick(value, true);
                    } })));
        })))));
};
Select.defaultProps = {
    name: "godlike-select",
    placeholder: "请选择",
};
export default Select;
