import { EnvelopeSimple, Key, User } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

import { AnimatedInput, Button } from "@/components/ui";
import useSignUpForm from "@/features/auth/hooks/useSignUpForm";
import AuthContainer from "@/features/auth/components/AuthContainer";

const SignIn = () => {
  const { signUpData, onChangeInput, handleSubmit } = useSignUpForm();

  const SignUpFormBody = (
    <>
      <form onSubmit={handleSubmit}>
          <AnimatedInput
            id="username"
            type="text"
            label="username"
            icon={User}
            value={signUpData.username}
            onChange={onChangeInput}
          />

          <AnimatedInput
            id="email"
            type="email"
            label="email"
            icon={EnvelopeSimple}
            value={signUpData.email}
            onChange={onChangeInput}
          />

          <AnimatedInput
            id="password"
            type="password"
            label="password"
            isPassword
            icon={Key}
            value={signUpData.password}
            onChange={onChangeInput}
          />
        <Button type="submit" width="w-full" variant="primary">
          Sign Up
        </Button>
      </form>

      <article className="mt-4 text-xs md:text-sm text-dark ">
        <p>
          Already have an account? &nbsp;
          <span className="italic text-darkGray hover:underline hover:text-primary">
            <Link to="/">click here to sign in</Link>
          </span>
        </p>
      </article>
    </>
  );

  return (
    <AuthContainer
      title="Water Analytics App"
      caption="Register A New Account"
      body={SignUpFormBody}
    />
  );
};

export default SignIn;
