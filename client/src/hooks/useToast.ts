import { useContext } from 'react';
import { ToastContext } from '@/app/CustomToastProvider';

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within the CustomToastProvider');
  }
  return context;
};
