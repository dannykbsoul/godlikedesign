import React, {
  FC,
  useState,
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useRef,
} from "react";
import classNames from "classnames";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";

//默认的下拉框展示数据的类型
interface DataSourceObject {
  value: string;
}

//可接受用户的定制类型，并以泛型的形式传入，并且我们默认要有value属性，
//因为onSelect执行以后，默认需要在输入框填充数据，即item.value
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  /**
   * 返回输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的Promise
   * type DataSourceType<T = {}> = T & DataSourceObject
   */
  fetchSuggestions: (
    str: string
  ) => DataSourceObject[] | Promise<DataSourceType[]>;
  /** 点击选中建议项时触发的回调 */
  onSelect?: (item: DataSourceObject) => void;
  /** 支持自定义渲染下拉项，返回ReactElement */
  renderOption?: (item: DataSourceType) => ReactElement;
}

/**
 * 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式
 * 支持 Input 组件的所有属性 支持键盘事件选择
 * ### 引用方法
 *
 * ~~~js
 * import { AutoComplete } from 'godlikedesign'
 * ~~~
 */
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props;

  //输入框value值
  const [inputValue, setInputValue] = useState(value as string);
  //下拉框的数据
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  //显示loading动画的state
  const [loading, setLoading] = useState(false);
  //是否显示下拉框
  const [showDropdown, setShowDropdown] = useState(false);
  //键盘操作时候的高亮 上下移动
  const [highlightIndex, setHighlightIndex] = useState(-1);
  //是否触发search
  const triggerSearch = useRef(false);
  //记住dom的引用，为什么传入的泛型是HTMLDivElement呢？因为我们需要记住的引用是div
  const componentRef = useRef<HTMLDivElement>(null);
  //获取debouncedValue值
  const debouncedValue = useDebounce(inputValue, 300);

  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });

  useEffect(() => {
    //当debouncedValue存在并且需要发动search，我们才去发起请求
    if (debouncedValue && triggerSearch.current) {
      //需要先将下拉框内容置空
      setSuggestions([]);
      const results = fetchSuggestions(debouncedValue);
      //这里联合类型会被if else的判断分开
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setLoading(false);
          setSuggestions(data);
          if (data.length > 0) setShowDropdown(true);
        });
      } else {
        setSuggestions(results);
        setShowDropdown(true);
        if (results.length > 0) setShowDropdown(true);
      }
    } else {
      setShowDropdown(false);
    }
    //每次value重新变化的时候，需要将highlight重置
    setHighlightIndex(-1);
  }, [debouncedValue, fetchSuggestions]);

  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) index = suggestions.length - 1;
    setHighlightIndex(index);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    //当handleChange执行了，说明我们想要发起search，所以置为true
    triggerSearch.current = true;
  };

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setShowDropdown(false);
    if (onSelect) {
      onSelect(item);
    }
    //此时说明是点击下拉选项，我们不希望发起search，所以置为false
    triggerSearch.current = false;
  };

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {
          setSuggestions([]);
        }}
      >
        <ul className="godlike-suggestion-list">
          {loading && (
            <div className="suggstions-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          )}
          {suggestions.map((item, index) => {
            const cnames = classNames("suggestion-item", {
              "is-active": index === highlightIndex,
            });
            return (
              <li
                key={index}
                className={cnames}
                onClick={() => handleSelect(item)}
              >
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };

  return (
    <div className="godlike-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {generateDropdown()}
    </div>
  );
};

export default AutoComplete;
