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
  const [isOpen, setIsOpen] = useState<boolean>(false);
    
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

  const handleOpenModal = () => {
      setIsOpen(true);
  };

  const handleCloseModal = () => {
      setIsOpen(false);
  };

  return {
    signUpData,
    isChecked,
    isOpen,
    onChangeInput,
    handleAgreement,
    handleSubmit,
    handleOpenModal,
    handleCloseModal
  };
};

export default useSignUpForm;
