import { useToast } from '@/hooks/useToast';
import { useSignOutMutation } from '@/features/auth/api/authApi';

import { useAppDispatch } from '@/lib/redux/hooks';
import { clearUser } from '@/lib/redux/states/userSlice';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const [signOut, { isLoading }] = useSignOutMutation();
  const { showToast } = useToast();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    try {
      await signOut().unwrap();

      dispatch(clearUser());
      navigate('/');
      return;
    } catch (error: any) {
      showToast({
        status: 'error',
        message: error?.data?.message || 'Failed to logout your account',
      });
    }
  };

  return { handleSignOut, isLoading };
};

export default useLogout;
