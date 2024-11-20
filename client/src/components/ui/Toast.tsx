import { X } from "@phosphor-icons/react";

export interface ToastProps{
    status: "success"|"error" | "warning";
    message: string;
    onClose?: () => void;
    isVisible?: boolean;
}

const Toast = ({ status, message, isVisible, onClose }: ToastProps) => {
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

  return (
    <div
      className={`
        fixed z-50 flex justify-between items-center gap-x-4
        min-w-[35%] mx-auto px-4 py-3 rounded-lg shadow-md
        text-sm font-medium
        left-1/2 top-2
        transition-all duration-300 ease-in-out
        ${getStatusStyle(status)}
        transform opacity-0 translate-y-[-50%]
        ${isVisible ? "translate-y-0 opacity-100" : ""}
      `}
      style={{
        transform: `translateX(-50%) ${
          isVisible ? "translateY(0)" : "translateY(-50%)"
        }`,
      }}
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
