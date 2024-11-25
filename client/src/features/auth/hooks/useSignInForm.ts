import { useState, type ChangeEvent } from "react";
import type { SignInData } from "@/features/auth/api/interface";

const initialSignIn = {
  email: "",
  password: "",
};

const useSignInForm = () => {
  const [signInData, setSignInData] = useState<SignInData>(initialSignIn);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignInData({ ...signInData, [id]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log(signInData);
    e.preventDefault();
  };

  return {signInData, onChangeInput, handleSubmit }
}

export default useSignInForm;
