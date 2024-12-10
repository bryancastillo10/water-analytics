import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormButtons } from "@/components/layout";
import { FormInput } from "@/components/ui";

import { WarningCircle, ShieldCheck } from "@phosphor-icons/react";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";

import { clearUser } from "@/lib/redux/states/userSlice";
import { useDeleteUserMutation } from "@/features/user/api/userApi";
import { useToast } from "@/hook/useToast";

const DeleteAccountConfirmation = () => {
  const [confirmUsername, setConfirmUsername] = useState<string>("");
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const { showToast } = useToast();
  const onChangeUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmUsername(e.target.value);
  }

  const callDeleteUser = async () => {
    try {
      if (user.user_id) {
        await deleteUser({
          id: user.user_id,
          username: confirmUsername
        }).unwrap();
    
        dispatch((clearUser()));

        showToast({
          status: "success",
          message: "Account has been deleted successfully"
        });

        navigate("/");
        }
    }
    catch (error: any) {
        showToast({
            status:"error",
            message: error?.data?.message || "Failed to delete your account"
        })
    }    
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    callDeleteUser();
  };
  return (
      <form onSubmit={handleSubmit}>
          <h1 className="text-lg">Are you sure you want to delete your account?</h1>
            <FormInput
                id="confirmUsername"
                label="Confirm Username"
                icon={ShieldCheck}
                value={confirmUsername}
                onChange={onChangeUsernameInput}
                validationMessage="Type your username to confirm account deletion"
      />
        <p className="flex text-rose-600 items-center gap-2 text-sm my-2">
        <span><WarningCircle size="20"/></span> Deleting your account means that all of your data related to this app will be deleted as well
      </p>
          <FormButtons loading={isLoading} primaryBtnLabel="Delete" />        
    </form>
  )
}

export default DeleteAccountConfirmation;
