import { EnvelopeSimple, Key } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

import {AnimatedInput, Button} from "@/components/ui";
import useSignInForm from "@/features/auth/hooks/useSignInForm";
import AuthContainer from "@/features/auth/components/AuthContainer";

const SignIn = () => {
  const { signInData, isLoading, onChangeInput, handleSubmit } = useSignInForm();

  const SignInFormBody = (
    <>
      <form onSubmit={handleSubmit}>
        <AnimatedInput
          id="email"
          type="email"
          label="email"
          icon={EnvelopeSimple}
          value={signInData.email}
          onChange={onChangeInput}
        />

        <AnimatedInput
          id="password"
          type="password"
          label="password"
          isPassword
          icon={Key}
          value={signInData.password}
          onChange={onChangeInput}
        />
        <Button
          loading={isLoading}
          type="submit"
          width="w-full"
          variant="primary"
        >
          Sign In
        </Button>
      </form>

      <article className="mt-4 text-xs md:text-sm text-dark ">
        <Link to="forgot-password"><p className="cursor-pointer hover:underline hover:text-primary mb-2">
          Forgot your password?
        </p></Link>
        <p>
          No account yet? &nbsp;
          <span className="italic text-darkGray hover:underline hover:text-primary">
            <Link to="sign-up">sign up here</Link>
          </span>
        </p>
      </article>
    </>
  );

  return (
    <AuthContainer
      title="Water Analytics App"
      caption="Sign In to Get Started!"
      body={SignInFormBody}
    />
  );
}

export default SignIn
