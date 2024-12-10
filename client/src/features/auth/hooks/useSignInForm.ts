import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import { setUser } from "@/lib/redux/states/userSlice";

import { useAppDispatch } from "@/lib/redux/hooks";
import { useSignInMutation } from "@/features/auth/api/authApi";
import type { SignInData } from "@/features/auth/api/interface";

import { useToast } from "@/hook/useToast";

const initialSignIn = {
  email: "",
  password: "",
};

const useSignInForm = () => {
  const [signInData, setSignInData] = useState<SignInData>(initialSignIn);
  const [signIn, { isLoading }] = useSignInMutation();


  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { showToast } = useToast();

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignInData({ ...signInData, [id]: value });
  };


  const callSignIn = async () => {
    try {
      const res = await signIn(signInData).unwrap();
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
      const errorMessage = error?.data?.message || "Failed to sign in. Try again!";
      showToast({
        status: "error",
        message: errorMessage
      })
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    callSignIn();
  };

  return {signInData, isLoading, onChangeInput, handleSubmit }
}

export default useSignInForm;
