import { Envelope,ArrowLeft, Lock, Key } from "@phosphor-icons/react";

import { ProgressBar } from "@/components/common";
import { Button,FormInput, CodeInput } from "@/components/ui";
import { FormButtons } from "@/components/layout";

import useResetPassword, {STEP} from "@/features/auth/hooks/useResetPassword";

const ResetPasswordForm = () => {
    const {
        step,
        resetData,
        isSendingCode,
        stepBackward,
        onResetDataChange,
        handleEmailSubmit,
        handleCodeVerification,
        handlePasswordReset,
    } = useResetPassword();

    let bodyContent = (
        <form onSubmit={handleEmailSubmit}>
            <FormInput
                id="email"
                label="Email"
                icon={Envelope}
                value={resetData.email}
                onChange={(e) => onResetDataChange("email", e.target.value)}
                validationMessage="your.email@domain.com"
            />
            <div className="my-8">
                <ProgressBar step={1} totalSteps={3} />
            </div>
            <FormButtons loading={isSendingCode} primaryBtnLabel="Send A Code" />
        </form>
    );

    if (step === STEP.VALIDATION) {
        bodyContent = (
            <form
                onSubmit={(e) => {
                e.preventDefault();
              }}
            >
            <CodeInput length={5} onComplete={(code)=> handleCodeVerification(code)} />
            <div className="my-8">
                <Button 
                    action={stepBackward} 
                    variant="outline"
                    ><ArrowLeft/>
                </Button>
                <ProgressBar step={2} totalSteps={3} />
            </div>
                <FormButtons primaryBtnLabel="Verify Code"/>
            </form>
        )
    }

    if (step === STEP.RESETPASSWORD) {
        bodyContent = (
            <form onSubmit={handlePasswordReset}>
            <FormInput
                id="password"
                label="New Password"
                isPassword
                icon={Lock}
                value={resetData.password}
                onChange={(e)=> onResetDataChange("password",e.target.value)}
                validationMessage="Alphanumeric characters"
            />

            <FormInput
                id="confirmPassword"
                label="Confirm Password"
                isPassword
                icon={Key}
                value={resetData.confirmPassword}
                onChange={(e)=> onResetDataChange("confirmPassword",e.target.value)}
                validationMessage="Re-type for password confirmation"
                />
                <div className="my-8">
                <Button 
                    action={stepBackward} 
                    variant="outline"
                    ><ArrowLeft/>
                </Button>
                <ProgressBar step={2} totalSteps={3} />
            </div>
                <FormButtons primaryBtnLabel="Reset"/>
            </form>
        )
    }
  return (
      <section className="flex flex-col justify-center w-fit">
          <p className="text-balance leading-tight">
            Reset your password by providing your user e-mail. A 5-digit authentication code would be sent to your e-mail upon request.
          </p>
          {bodyContent}
      </section>
  )
}

export default ResetPasswordForm;
