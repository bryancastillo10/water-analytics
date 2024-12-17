import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import { type SignUpData } from "@/features/auth/api/interface";
import { useSignUpMutation } from "@/features/auth/api/authApi";

import { useAppDispatch } from "@/lib/redux/hooks";
import { setUser } from "@/lib/redux/states/userSlice";
import { useToast } from "@/hooks/useToast";

const initialSignUpData = {
    username: "",
    email: "",
    password: "",
    confirmPassword:"",
};

const useSignUpForm = () => {
  const [signUpData, setSignUpData] = useState<SignUpData>(initialSignUpData);
  const [signUp, { isLoading: isLoadingApi }] = useSignUpMutation();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleAgreement = () => {
    setIsChecked(!isChecked);
  };
  
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignUpData({ ...signUpData, [id]: value });
  };

  const callSignUp = async () => {
    setIsModalVisible(true);
    try {
      const res = await signUp(signUpData).unwrap();
      const userData = res.user;

      const userRole = userData.role.toLowerCase();
      showToast({
        status: "success",
        message: res.message
      });
      dispatch(setUser(userData));
      navigate(`/${userRole}/dashboard`);
    }
    catch (error: any) {
      showToast({
        status: "error",
        message: error?.data?.message || "Failed to create an account. Please try again."
        })
    }
    finally {
      setIsModalVisible(false);  
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    callSignUp();
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
    isLoadingApi,
    isModalVisible,
    onChangeInput,
    handleAgreement,
    handleSubmit,
    handleOpenModal,
    handleCloseModal
  };
};

export default useSignUpForm;
