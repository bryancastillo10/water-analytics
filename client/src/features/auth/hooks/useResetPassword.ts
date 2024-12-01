import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export enum STEP {
  EMAIL = 0,
  VALIDATION = 1,
  RESETPASSWORD = 2,
}

interface ResetPasswordData {
  email: string;
  password: string;
  confirmPassword: string;
}

const useResetPassword = () => {
  const [step, setStep] = useState<STEP>(STEP.EMAIL);
  const [resetData, setResetData] = useState<ResetPasswordData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const stepForward = () => setStep((prev) => prev + 1);
  const stepBackward = () => setStep((prev) => prev - 1);

  const onResetDataChange = (key: keyof ResetPasswordData, value: string) => {
    setResetData((prev) => ({ ...prev, [key]: value }));
  };
    

  const handleEmailSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email submitted:", resetData.email);
    // API Send Verification
    stepForward();
  };

  const handleCodeVerification = (code: string) => {
    console.log("Verification code entered:", code);
    // API Verify Code
    stepForward();
  };

  const handlePasswordReset = (e:FormEvent<HTMLFormElement>) => {
    const { email, password, confirmPassword } = resetData;
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords do not match.");
      return;
    }
    console.log("Reset password request:", { email, password });
    // API for Update Password  
    navigate("/");
  };

  return {
    step,
    resetData,
    stepForward,
    stepBackward,
    onResetDataChange,
    handleEmailSubmit,
    handleCodeVerification,
    handlePasswordReset,
  };
};

export default useResetPassword;

