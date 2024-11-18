import { useState } from "react";
import { Envelope } from "@phosphor-icons/react";
import { FormInput, ProgressBar } from "@/components/ui";

// enum STEP {
//     EMAIL = 0,
//     VALIDATION = 1,
//     RESETPASSWORD=2
// }

const ForgotPassword = () => {
    // const [step, setStep] = useState(STEP.EMAIL);
    const [email, setEmail] = useState<string>("");


    // const stepBackward = () => {
    //     s etStep((val) => val - 1);
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



  return (
    <main className="bg-primary/50 w-full h-screen">
      <section className="flex flex-col justify-center items-center h-screen w-fit m-auto">
        <div className="bg-light w-[440px] xl:w-[500px] rounded-2xl shadow-md p-8">
          <h1 className="font-secondary text-xl tracking-wider text-center text-nowrap text-primary mb-2">
            Forgot Password
          </h1>
          <p className="text-darkGray text-center xl:text-balance">You can recover your account by providing as your e-mail address. We will send a 5-digit authentication code to verify the reset of your password</p>
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
                     
                      
                      <ProgressBar step={1} totalSteps={3} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default ForgotPassword;
