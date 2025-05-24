import { EnvelopeSimple, Key, User } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import { AnimatedInput, Button } from '@/components/ui';
import useSignUpForm from '@/features/auth/hooks/useSignUpForm';

import AuthContainer from '@/features/auth/components/AuthContainer';
import AgreementCheckBox from '@/features/auth/components/AgreementCheckBox';
import LoadingModal from '@/features/auth/components/LoadingModal';

const SignIn = () => {
  const {
    signUpData,
    isChecked,
    isOpen,
    isLoadingApi,
    isModalVisible,
    onChangeInput,
    handleAgreement,
    handleSubmit,
    handleOpenModal,
    handleCloseModal,
  } = useSignUpForm();

  const SignUpFormBody = (
    <>
      <form onSubmit={handleSubmit} className="">
        <AnimatedInput
          id="username"
          type="text"
          label="username"
          icon={User}
          value={signUpData.username}
          onChange={onChangeInput}
          validationMessage="Username must be greater than 5 alphanumeric characters"
        />

        <AnimatedInput
          id="email"
          type="email"
          label="email"
          icon={EnvelopeSimple}
          value={signUpData.email}
          onChange={onChangeInput}
          validationMessage="A valid email address format (your_email@domain.com)"
        />

        <AnimatedInput
          id="password"
          type="password"
          label="password"
          isPassword
          icon={Key}
          value={signUpData.password}
          onChange={onChangeInput}
          validationMessage="Any strong password"
        />

        <AnimatedInput
          id="confirmPassword"
          type="password"
          label="confirm password"
          isPassword
          icon={Key}
          value={signUpData.confirmPassword}
          onChange={onChangeInput}
          validationMessage="Re-type the password for confirmation"
        />
        <AgreementCheckBox
          isChecked={isChecked}
          onCheck={handleAgreement}
          handleOpenModal={handleOpenModal}
        />
        <Button
          disabled={!isChecked}
          loading={isLoadingApi}
          type="submit"
          width="w-full"
          variant="primary"
        >
          Sign Up
        </Button>
      </form>

      {isModalVisible && <LoadingModal />}

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
      isOpenModal={isOpen}
      handleCloseModal={handleCloseModal}
    />
  );
};

export default SignIn;
