import { useState, type ChangeEvent } from "react";
import type { AuthSignUp } from "@/features/auth/api/interface";

const initialSignUp = {
    username: "",
    email: "",
    password: "",
    confirmPassword:"",
    profilePicURL: "",
    role: null
};

const useSignUpForm = () => {
  const [signUpData, setSignUpData] = useState<AuthSignUp>(initialSignUp);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignUpData({ ...signUpData, [id]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return { signUpData, onChangeInput, handleSubmit };
};

export default useSignUpForm;
