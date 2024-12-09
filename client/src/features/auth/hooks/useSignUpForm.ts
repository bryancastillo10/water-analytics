import { useState, type ChangeEvent } from "react";
import {  type SignUpData } from "@/features/auth/api/interface";

const initialSignUp = {
    username: "",
    email: "",
    password: "",
    confirmPassword:"",
};

const useSignUpForm = () => {
  const [signUpData, setSignUpData] = useState<SignUpData>(initialSignUp);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  
  const handleAgreement = () => {
    setIsChecked(!isChecked);
  };
  
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignUpData({ ...signUpData, [id]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log(signUpData);
    e.preventDefault();
  };

  return { signUpData, isChecked, onChangeInput, handleAgreement, handleSubmit };
};

export default useSignUpForm;
