import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { clearUser } from '@/lib/redux/states/userSlice';

import { useDeleteUserMutation } from '@/features/user/api/userApi';
import { useToast } from '@/hooks/useToast';
import useDrawer from '@/hooks/useDrawer';

const useDeleteUser = (userId: string) => {
  const [confirmUsername, setConfirmUsername] = useState<string>('');
  const currentUserId = useAppSelector(state => state.user.user_id);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const { showToast } = useToast();
  const { handleCloseDrawer } = useDrawer();

  const onChangeUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmUsername(e.target.value);
  };

  const callDeleteUser = async () => {
    try {
      if (userId) {
        await deleteUser({
          id: userId,
          username: confirmUsername,
        }).unwrap();

        showToast({
          status: 'success',
          message: 'Account has been deleted successfully',
        });

        if (userId === currentUserId) {
          dispatch(clearUser());
          navigate('/');
        }
      }
    } catch (error: any) {
      showToast({
        status: 'error',
        message: error?.data?.message || 'Failed to delete your account',
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    callDeleteUser();
    handleCloseDrawer();
  };

  return {
    confirmUsername,
    isLoading,
    onChangeUsernameInput,
    handleSubmit,
  };
};

export default useDeleteUser;
