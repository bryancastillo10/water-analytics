// import { useState, useMemo } from "react";

import { CodeInput } from "@/components/ui";

// enum STEP {
//     EMAIL = 0,
//     VALIDATION = 1,
//     RESETPASSWORD=2
// }

const ForgotPassword = () => {
    // const [step, setStep] = useState(STEP.EMAIL);


    // const stepBackward = () => {
    //     setStep((val) => val - 1);
    // }

    // const stepForward = () => {
    //     setStep((val) => val + 1);
    // }

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
            <CodeInput length={5} onComplete={handleCompletedCode}/>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ForgotPassword;
