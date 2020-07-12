import React, { FC, useState } from "react";
import classNames from "classnames";
export type AlertType = "success" | "default" | "danger" | "warning";

export interface AlertProps {
  //标题
  title: string;
  //描述
  description?: string;
  //alert类型
  type?: AlertType;
  //关闭alert时触发的事件
  onClose?: () => void;
  //是否显示关闭图标
  closable?: boolean;
}

export const Alert: FC<AlertProps> = (props) => {
  return <div>alert</div>;
};
