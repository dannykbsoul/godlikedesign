import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import classNames from "classnames";
import { type } from "os";

//按钮大小
export type ButtonSize = "lg" | "sm";

//按钮类型
export type ButtonType = "primary" | "default" | "danger" | "link";

//按钮的基础属性接口
interface BaseButtonProps {
  className?: string;
  /**设置button的禁用 */
  disabled?: boolean;
  /**设置 Button 的尺寸 */
  size?: ButtonSize;
  /**设置 Button 的类型 */
  btnType?: ButtonType;
  href?: string;
}

//button所有的属性
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;

//a链接所有的属性
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;

//所有的属性，注意此时不能直接用交叉类型，因为有些是button上的必选属性，在a链接
//上可能不是必选的，同样在a链接上必选的，button也可能不是必选的
//此时我们要用到Partial<T>，将所有属性变为可选属性
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互，支持 HTML button 和 a 链接 的所有属性
 * ### 引用方法
 *
 * ~~~js
 * import { Button } from 'godlikedesign'
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    disabled,
    btnType,
    size,
    href,
    children,
    ...restProps
  } = props;

  //btn, btn-lg, btn-primary
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });

  if (btnType === "link" && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
};

Button.defaultProps = {
  disabled: false,
  btnType: "default",
};

export default Button;
