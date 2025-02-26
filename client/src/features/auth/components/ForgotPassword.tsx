import { useNavigate } from "react-router-dom";
import useResetPassword, {STEP} from "@/features/user/hooks/useResetPassword";
import { Envelope, Lock, Key } from "@phosphor-icons/react";

import { ProgressBar } from "@/components/common";
import { FormInput, Button, CodeInput } from "@/components/ui";
import AuthContainer from "@/features/auth/components/AuthContainer";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    step,
    resetData,
    isSendingCode,
    stepForward,
    stepBackward,
    onResetDataChange,
    handleEmailSubmit,
    handleCodeVerification,
    handlePasswordReset,
} = useResetPassword();

  let bodyContent = (
    <>
       <form onSubmit={handleEmailSubmit}>
        <FormInput
          id="email"
          label="Email"
          icon={Envelope}
          value={resetData.email}
          onChange={(e) => onResetDataChange("email", e.target.value)}
          validationMessage="your.email@domain.com"
        />
        <div className="flex items-center justify-between gap-x-2">
          <Button loading={isSendingCode} action ={()=>navigate("/")} type="button" width="w-full" variant="outline">
            Back
          </Button>
          <Button loading={isSendingCode}  type="submit" width="w-full" variant="primary">
            Send A Code
          </Button>
        </div>
        <div className="mt-8 h-full">
          <ProgressBar step={1} totalSteps={3} />
        </div>
      </form>
    </>
  );

  if (step === STEP.VALIDATION) {
    bodyContent = (
      <>
         <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <CodeInput length={5} onComplete={(code)=> handleCodeVerification(code)} />
          <div className="flex items-center justify-between gap-x-2">
            <Button
              action={stepBackward}
              type="button"
              width="w-full"
              variant="outline"
            >
              Back
            </Button>
            <Button
              action={stepForward}
              type="submit"
              width="w-full"
              variant="primary"
            >
              Verify Code
            </Button>
          </div>
          <div className="mt-8 h-full">
            <ProgressBar step={2} totalSteps={3} />
          </div>
        </form>
      </>
    );
  }

  if (step === STEP.RESETPASSWORD) {
    bodyContent = (
      <>
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handlePasswordReset();
          navigate("/");
        }}>
          <FormInput
            id="password"
            label="New Password"
            isPassword
            icon={Lock}
            value={resetData.newPassword}
            onChange={(e) => onResetDataChange("newPassword", e.target.value)}
            validationMessage="Alphanumeric characters"
          />

          <FormInput
            id="confirmPassword"
            label="Confirm Password"
            isPassword
            icon={Key}
            value={resetData.confirmNewPassword}
            onChange={(e) => onResetDataChange("confirmNewPassword", e.target.value)}
            validationMessage="Re-type for password confirmation"
          />
          <div className="flex items-center justify-between gap-x-2">
            <Button
              action={stepBackward}
              type="button"
              width="w-full"
              variant="outline"
            >
              Back
            </Button>
            <Button
              type="submit"
              width="w-full"
              variant="primary"
            >
              Reset
            </Button>
          </div>
          <div className="mt-8 h-full">
            <ProgressBar step={3} totalSteps={3} />
          </div>
        </form>
      </>
    );
  }

  return (
    <AuthContainer
      title="Forgot User Password"
      caption="Reset your password by providing your user e-mail. A 5-digit authentication code would be sent to your e-mail upon request."
      body={bodyContent}
      isPasswordResetScreen
      captionAlignment="text-justify"
    />
  );
}

export default ForgotPassword;
