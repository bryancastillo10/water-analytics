import { createContext, useState, useCallback } from "react";
import Toast, { type ToastProps } from "@/components/ui/Toast";

interface ToastContextType {
  showToast: (props: Omit<ToastProps, "onClose">) => void;
  hideToast: () => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [toastProps, setToastProps] = useState<ToastProps>({
    status: "warning",
    message: "",
  });

  const hideToast = useCallback(() => {
    setIsVisible(false);
  }, []);

  const showToastWithProps = useCallback(
    (props: Omit<ToastProps, "onClose">) => {
      setToastProps({ ...props, onClose: hideToast });
      setIsVisible(true);

      const timeoutId = setTimeout(() => {
        hideToast();
      }, 5000);

      return () => clearTimeout(timeoutId);
    },
    [hideToast]
  );

  return (
    <ToastContext.Provider value={{ showToast: showToastWithProps, hideToast }}>
      {children}
          {isVisible && <Toast {...toastProps} isVisible={isVisible} />}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
