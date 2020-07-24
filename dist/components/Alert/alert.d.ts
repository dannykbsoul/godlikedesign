import { FC } from "react";
export declare type AlertType = "success" | "default" | "danger" | "warning";
export interface AlertProps {
    title: string;
    description?: string;
    type?: AlertType;
    onClose?: () => void;
    closable?: boolean;
}
export declare const Alert: FC<AlertProps>;
export default Alert;
