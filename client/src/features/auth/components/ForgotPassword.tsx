import { useState } from "react";
<<<<<<< HEAD
import { Envelope } from "@phosphor-icons/react";
import { CodeInput, FormInput, ProgressBar } from "@/components/ui";
=======
import { useNavigate } from "react-router-dom";
import { Envelope, Lock, Key } from "@phosphor-icons/react";
import { FormInput, ProgressBar, Button, CodeInput } from "@/components/ui";
import AuthContainer from "./AuthContainer";
>>>>>>> c869548 (🟦 layout: reset password page)

enum STEP {
    EMAIL = 0,
    VALIDATION = 1,
    RESETPASSWORD=2
}

const ForgotPassword = () => {
    const [step, setStep] = useState(STEP.EMAIL);
    const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPw, setConfirmPw] = useState<string>("");

    const stepBackward = () => {
        setStep((val) => val - 1);
    }

    const stepForward = () => {
        setStep((val) => val + 1);
    }
  
   const handleCompletedCode = (code:string) => {
    console.log(code);
    }

    // const actionLabel = useMemo(() => {
    //     if (step = STEP.RESETPASSWORD) {
    //         return 'Reset Password'
    //     };
    //     return 'Next';
    // }, [step]);

    // const secondaryActionLabel = useMemo(() => {
    //     if (step = STEP.EMAIL) {
    //         return undefined;
    //     }
    //     return 'Back';
    // },[step]);

<<<<<<< HEAD
    const handleCompletedCode = (code: string) => {
        console.log(typeof code);
    }

  return (
    <main className="bg-primary/50 w-full h-screen">
      <section className="flex flex-col justify-center items-center h-screen w-fit m-auto">
        <div className="bg-light w-md rounded-2xl shadow-md p-8">
          <h1 className="font-secondary text-xl tracking-wider text-center text-nowrap text-primary mb-2">
            Forgot Password
          </h1>
          <p className="text-darkGray text-center">Test Page</p>
          <hr className="border border-neutral my-4" />
                  <div className="mt-4">
                      <FormInput 
                          id="email"
                          type="email"
                          label="Email"
                          icon={Envelope}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          validationMessage="Please enter your email"
                      />
                      <CodeInput length={5} onComplete={handleCompletedCode} />
                      
                      <ProgressBar step={1} totalSteps={3} />
          </div>
          <div className="mt-8 h-full">
            <ProgressBar step={3} totalSteps={3} />
          </div>
        </form>
      </>
    );
  }

  return (
=======
  let bodyContent = (
    <>
      <form onSubmit={()=>{}}>
        <FormInput
          id="email"
          label="Email"
          icon={Envelope}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          validationMessage="your.email@domain.com"
        />
        <div className="flex items-center justify-between gap-x-2">
          <Button action ={()=>navigate("/")} type="button" width="w-full" variant="outline">
            Back
          </Button>
          <Button action={stepForward} type="submit" width="w-full" variant="primary">
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
        <form onSubmit={() => { }}>
          <CodeInput length={5} onComplete={handleCompletedCode} />
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
        <form onSubmit={() => {}}>
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


  return (
>>>>>>> c869548 (🟦 layout: reset password page)
    <AuthContainer
      title="Forgot User Password"
      caption="Reset your password by providing your user e-mail. A 5-digit authentication code would be sent to your e-mail upon request."
      body={bodyContent}
      captionAlignment="text-justify"
    />
  );
}

export default ForgotPassword;
