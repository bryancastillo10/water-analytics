import { useState } from 'react';

import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { setUserInfo } from '@/lib/redux/states/userSlice';
import { useToast } from '@/hooks/useToast';

import { useUpdateUserMutation } from '@/features/user/api/userApi';
import type { UserProfile } from '@/features/user/api/interface';

const useUpdateUser = () => {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const toUpdateUserData = {
    username: user.username,
    email: user.email,
  };

  const [updateUserData, setUpdateUserData] = useState<UserProfile>(toUpdateUserData);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUpdateUserData({ ...updateUserData, [id]: value });
  };

  const callUpdateUser = async () => {
    try {
      const res = await updateUser({
        id: user?.user_id!,
        ...updateUserData,
      }).unwrap();

      dispatch(setUserInfo(updateUserData));
      showToast({
        status: 'success',
        message: res.message,
      });
    } catch (error: any) {
      const errorMessage = error?.data?.message || 'Failed to update your profile. Try again!';
      showToast({
        status: 'error',
        message: errorMessage,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callUpdateUser();
  };

  return {
    updateUserData,
    isLoading,
    onChangeInput,
    handleSubmit,
  };
};

export default useUpdateUser;
