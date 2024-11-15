import React, { useState, type ChangeEvent } from "react";
import { type AuthSignIn } from "@/features/auth/api/interface";
import { EnvelopeSimple, Key } from "@phosphor-icons/react";

import AnimatedInput from "@/components/ui/AnimatedInput";
import Button from "@/components/ui/Button";

const initialSignIn = {
  email: "",
  password:""
}

const SignIn = () => {
  const [signInData, setSignInData] = useState<AuthSignIn>(initialSignIn)

  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignInData(
    {...signInData,
      [id]: value}
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <main className="bg-primary/50 w-full h-screen">
      <section className="flex flex-col justify-center items-center h-screen w-fit m-auto">
        <div className="bg-light rounded-2xl shadow-md px-10 py-8">
          <h1 className="font-semibold text-2xl md:text-4xl  text-center text-nowrap text-primary mb-2">
            Water Dashboard App
          </h1>
          <p className="text-[#858585] text-md md:text-lg text-center">Sign In to Get Started!</p>
          <hr className="border border-neutral my-4" />
          <form onSubmit={handleSubmit}>
            <AnimatedInput
              id="email"
              type="text"
              label="email"
              icon={EnvelopeSimple}
              value={signInData.email}
              onChange={onFormChange}
            />

            <AnimatedInput
              id="password"
              type="password"
              label="password"
              isPassword
              icon={Key}
              value={signInData.password}
              onChange={onFormChange}
            />
            <Button type="submit" width="w-full" variant="primary">
              Submit
            </Button>
          </form>
          
          <article className="mt-4 text-xs md:text-sm text-dark ">
            <p className="cursor-pointer hover:underline hover:text-primary mb-2">
              Forgot your password?
            </p>
            <p>
              No account yet? <span className="cursor-pointer italic text-darkGray hover:underline hover:text-primary">click here to sign up</span>
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}

export default SignIn
