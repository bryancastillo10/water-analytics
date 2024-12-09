import { useEffect, useState } from "react";
import { X } from "@phosphor-icons/react";

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
        return "bg-green-300 text-green-900";
      case "error":
        return "bg-red-300 text-red-900";
      default:
        return "bg-yellow-300 text-yellow-900";
    }
  };

  useEffect(() => {
    if (isVisible) {
        const timer = setTimeout(() => {
            setShow(true);
        }, 200);
        return () => clearTimeout(timer);
    } else {
        setShow(false);
    }
    return;
}, [isVisible]);


  return (
    <div
      className={`
        fixed z-50 flex justify-between items-center gap-x-4
        min-w-[35%] mx
        -auto px-4 py-3 rounded-lg shadow-md
        text-sm font-medium -top-[100%] left-[35%]
        transition-all duration-500 ease-in-out
        ${getStatusStyle(status)}
        transform opacity-0 
        ${show ? "top-[1rem] opacity-100" : ""}
      `}
    >
      {message}
      <X
        onClick={onClose}
        className="font-semibold cursor-pointer hover:scale-110"
        aria-label="close-btn"
      />
    </div>
  );
};

export default Toast;
