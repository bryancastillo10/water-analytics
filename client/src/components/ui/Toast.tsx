import { useEffect, useState } from "react";
import { X, XCircle, WarningCircle, CheckCircle } from "@phosphor-icons/react";

export interface ToastProps{
    status: "success"|"error" | "warning";
    message: string;
    onClose?: () => void;
    isVisible?: boolean;
}

const Toast = ({ status, message, isVisible, onClose }: ToastProps) => {
  const [show, setShow] = useState<boolean>(false);
  
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "success":
        return {
          icon: CheckCircle,
          style:"bg-green-300 text-green-900"
        };
      case "error":
        return {
          icon: XCircle,
          style: "bg-red-300 text-red-900"
        };
      default:
        return {
          icon: WarningCircle,
          style: "bg-yellow-300 text-yellow-900"
        };
    }
  };

  useEffect(() => {
    if (isVisible) {
        const timer = setTimeout(() => {
            setShow(true);
        }, 500);
        return () => clearTimeout(timer);
    } else {
        setShow(false);
    }
    return;
  }, [isVisible]);
  
  const handleClose = () => {
    if (onClose) onClose();
    setShow(false);
  };

  const Icon = getStatusStyle(status)["icon"];
  return (
      <div
        className={`absolute z-50 flex justify-between items-center gap-x-4
          xl:min-w-[20%] xl:max-w-[50%] px-4 py-3 rounded-lg shadow-md left-[10%] xl:left-[35%]
          text-sm font-medium transform transition-all duration-500 ease-in-out
          ${getStatusStyle(status)["style"]}
          ${show ? "top-[1rem] opacity-100" : "-top-[100%] opacity-0"}`}
      >
        <Icon size="20" />
        {message}
        <X
          onClick={handleClose}
          className="font-semibold cursor-pointer hover:scale-110"
          aria-label="close-btn"
        />
    </div>

  );
};

export default Toast;
