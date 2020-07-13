import React, { FC, MouseEvent, useState } from "react";
import classNames from "classnames";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
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

const Alert: FC<AlertProps> = (props) => {
  const [hide, setHide] = useState(false);
  const { title, description, type, onClose, closable } = props;
  const classes = classNames("godlike-alert", {
    [`godlike-alert-${type}`]: type,
  });
  const titleClass = classNames("godlike-alert-title", {
    "bold-title": description,
  });
  const handleClose = (e: MouseEvent) => {
    if (onClose) onClose();
    setHide(true);
  };
  return (
    <Transition in={!hide} timeout={300} animation="zoom-in-top">
      <div className={classes}>
        <span className={titleClass}>{title}</span>
        {description && <p className="godlike-alert-desc">{description}</p>}
        {closable && (
          <span className="godlike-alert-close" onClick={handleClose}>
            <Icon icon="times" />
          </span>
        )}
      </div>
    </Transition>
  );
};

Alert.defaultProps = {
  type: "default",
  closable: true,
};

export default Alert;
