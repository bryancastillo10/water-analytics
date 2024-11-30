import { useState } from "react";
import { Envelope,ArrowLeft, Lock, Key } from "@phosphor-icons/react";

import { ProgressBar } from "@/components/common";
import { Button,FormInput, CodeInput } from "@/components/ui";
import { FormButtons } from "@/components/layout";

import {STEP} from "@/features/auth/components/ForgotPassword";

const ResetPasswordForm = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPw, setConfirmPw] = useState<string>("");
  
    const [step, setStep] = useState(STEP.EMAIL);

    const stepBackward = () => {
        setStep((val) => val - 1);
    }

    const stepForward = () => {
        setStep((val) => val + 1);
    }

    const handleCompletedCode = (code:string) => {
        console.log(code);
        }

    let bodyContent = (
        <form
            onSubmit=
            {(e) => {
                e.preventDefault();
                stepForward();
            }}
        >
            <FormInput
                id="email"
                label="Email"
                icon={Envelope}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                validationMessage="your.email@domain.com"
            />
            <div className="my-8">
                <ProgressBar step={1} totalSteps={3} />
            </div>
            <FormButtons primaryBtnLabel="Send A Code" />
        </form>
    );

    if (step === STEP.VALIDATION) {
        bodyContent = (
            <form
                onSubmit={(e) => {
                e.preventDefault();
                stepForward();
              }}
            >
            <CodeInput length={5} onComplete={handleCompletedCode} />
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
            <form>
            <FormInput
                id="password"
                label="New Password"
                isPassword
                icon={Lock}
                value={email}
                onChange={(e) => setPassword(e.target.value)}
                validationMessage="Alphanumeric characters"
            />

            <FormInput
                id="confirmPassword"
                label="Confirm Password"
                isPassword
                icon={Key}
                value={email}
                onChange={(e) => setConfirmPw(e.target.value)}
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
