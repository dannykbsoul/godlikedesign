import React, {
  FC,
  useState,
  createContext,
  useRef,
  FunctionComponentElement,
  useEffect,
} from "react";
import classNames from "classnames";
import Input from "../Input";
import Icon from "../Icon";
import useClickOutside from "../../hooks/useClickOutside";
import Transition from "../Transition/transition";
import { SelectOptionProps } from "./option";

export interface SelectProps {
  /**指定默认选中的条目	 可以是是字符串或者字符串数组*/
  defaultValue?: string | string[];
  /** 选择框默认文字*/
  placeholder?: string;
  /** 是否禁用*/
  disabled?: boolean;
  /** 是否支持多选*/
  multiple?: boolean;
  /** select input 的 name 属性	 */
  name?: string;
  /**选中值发生变化时触发 */
  onChange?: (selectedValue: string, selectedValues: string[]) => void;
  /**下拉框出现/隐藏时触发 */
  onVisibleChange?: (visible: boolean) => void;
}

//需要一个context用来传递给子组件
export interface ISelectContext {
  onSelect?: (value: string, isSelected?: boolean) => void;
  selectedValues: string[];
  multiple?: boolean;
}

export const SelectContext = createContext<ISelectContext>({
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
export const Select: FC<SelectProps> = (props) => {
  const {
    defaultValue,
    placeholder,
    children,
    multiple,
    name,
    disabled,
    onChange,
    onVisibleChange,
  } = props;

  //获取到input框dom的引用
  const input = useRef<HTMLInputElement>(null);
  //获取到整个容器dom的引用，主要是为了后续的useClickOutside hooks的使用
  const containerRef = useRef<HTMLInputElement>(null);
  const containerWidth = useRef(0);
  //当mode为多选的时候选中条目的state
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : []
  );
  //需要一个state来管理下拉框的开合
  const [menuOpen, setOpen] = useState(false);
  //当mode为单选时候的state
  const [value, setValue] = useState(
    typeof defaultValue === "string" ? defaultValue : ""
  );
  //这个方法服务于点击下拉条目实现增加删除
  const handleOptionClick = (value: string, isSelected?: boolean) => {
    //单选的时候 需要将下拉框收起，并且设置input框的value值
    if (!multiple) {
      setOpen(false);
      setValue(value);
      if (onVisibleChange) {
        onVisibleChange(false);
      }
    } else {
      //多选的话先将input框值置空
      setValue("");
    }
    let updatedValues = [value];
    //多选模式下，要判断原先状态是否选中状态
    if (multiple) {
      updatedValues = isSelected
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
      setSelectedValues(updatedValues);
    }
    if (onChange) {
      onChange(value, updatedValues);
    }
  };

  //selectedValues, multiple, placeholder发生变化的时候执行
  //如果多选情况下有selectedValues，则placeholder需要置空，否则有placeholder需要填上placeholder
  useEffect(() => {
    if (input.current) {
      input.current.focus();
      if (multiple && selectedValues.length > 0) {
        input.current.placeholder = "";
      } else {
        if (placeholder) input.current.placeholder = placeholder;
      }
    }
  }, [selectedValues, multiple, placeholder]);

  useEffect(() => {
    if (containerRef.current) {
      containerWidth.current = containerRef.current.getBoundingClientRect().width;
    }
  });

  //点击container区域外的时候，需要将下拉框收起
  useClickOutside(containerRef, () => {
    setOpen(false);
    if (onVisibleChange && menuOpen) {
      onVisibleChange(false);
    }
  });
  const passedContext: ISelectContext = {
    onSelect: handleOptionClick,
    selectedValues: selectedValues,
    multiple: multiple,
  };
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled) {
      setOpen(!menuOpen);
      if (onVisibleChange) {
        onVisibleChange(!menuOpen);
      }
    }
  };

  //下拉框内容
  const generateOptions = () => {
    return React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<SelectOptionProps>;
      if (childElement.type.displayName === "Option") {
        return React.cloneElement(childElement, {
          index: `select-${i}`,
        });
      } else {
        console.error(
          "Warning: Select has a child which is not a Option component"
        );
      }
    });
  };
  const containerClass = classNames("godlike-select", {
    "menu-is-open": menuOpen,
    "is-disabled": disabled,
    "is-multiple": multiple,
  });
  return (
    <div className={containerClass} ref={containerRef}>
      <div className="godlike-select-input" onClick={handleClick}>
        <Input
          ref={input}
          placeholder={placeholder}
          value={value}
          readOnly
          icon="angle-down"
          disabled={disabled}
          name={name}
        />
      </div>
      <SelectContext.Provider value={passedContext}>
        <Transition in={menuOpen} animation="zoom-in-top" timeout={300}>
          <ul className="godlike-select-dropdown">{generateOptions()}</ul>
        </Transition>
      </SelectContext.Provider>
      {multiple && (
        <div
          className="godlike-selected-tags"
          style={{ maxWidth: containerWidth.current - 32 }}
        >
          {selectedValues.map((value, index) => {
            return (
              <span className="godlike-tag" key={`tag-${index}`}>
                {value}
                <Icon
                  icon="times"
                  onClick={() => {
                    handleOptionClick(value, true);
                  }}
                />
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};
Select.defaultProps = {
  name: "godlike-select",
  placeholder: "请选择",
};
export default Select;
