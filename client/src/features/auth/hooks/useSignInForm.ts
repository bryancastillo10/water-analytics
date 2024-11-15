import { useState, type ChangeEvent } from "react";
import type { AuthSignIn } from "@/features/auth/api/interface";

const initialSignIn = {
  email: "",
  password: "",
};

const useSignInForm = () => {
  const [signInData, setSignInData] = useState<AuthSignIn>(initialSignIn);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignInData({ ...signInData, [id]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return {signInData, onChangeInput, handleSubmit }
}

export default useSignInForm;
