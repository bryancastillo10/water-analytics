import { useState, type FormEvent } from 'react';
import { useToast } from '@/hooks/useToast';

import {
  useSendCodeToEmail,
  useVerifyCode,
  useUpdatePassword,
} from '@/features/user/hooks/useResetPasswordApi';

export enum STEP {
  EMAIL = 0,
  VALIDATION = 1,
  RESETPASSWORD = 2,
}

interface ResetPasswordData {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
}

const useResetPassword = () => {
  const { showToast } = useToast();
  const [step, setStep] = useState<STEP>(STEP.EMAIL);
  const [resetData, setResetData] = useState<ResetPasswordData>({
    email: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  // API Call Hooks
  const { sendCodeToEmail, isLoading: isSendingCode } = useSendCodeToEmail();
  const { callVerifyCode, isLoading: isVerifyingCode } = useVerifyCode();
  const { callUpdatePassword, isLoading: isUpdating } = useUpdatePassword();

  const stepForward = () => setStep(prev => prev + 1);
  const stepBackward = () => setStep(prev => prev - 1);

  const onResetDataChange = (key: keyof ResetPasswordData, value: string) => {
    setResetData(prev => ({ ...prev, [key]: value }));
  };

  const handleEmailSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendCodeToEmail(resetData.email, stepForward);
  };

  const handleCodeVerification = (code: string) => {
    callVerifyCode(resetData.email, code, stepForward);
  };

  const handlePasswordReset = () => {
    const { newPassword, confirmNewPassword } = resetData;
    if (newPassword !== confirmNewPassword) {
      showToast({
        status: 'warning',
        message: 'Password and Confirm Password do not match',
      });
    }
    callUpdatePassword(resetData);
  };

  return {
    step,
    resetData,
    isSendingCode,
    isVerifyingCode,
    isUpdating,
    stepForward,
    stepBackward,
    onResetDataChange,
    handleEmailSubmit,
    handleCodeVerification,
    handlePasswordReset,
  };
};

export default useResetPassword;
