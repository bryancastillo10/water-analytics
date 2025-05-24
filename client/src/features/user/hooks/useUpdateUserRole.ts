import { useUpdateUserMutation } from '@/features/user/api/userApi';
import { useToast } from '@/hooks/useToast';

interface UpdateUserRole {
  id: string;
  selectedRole: string;
  onSuccess?: () => void;
}

const useUpdateUserRole = () => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { showToast } = useToast();

  const updateUserRole = async ({ id, selectedRole, onSuccess }: UpdateUserRole) => {
    try {
      const role = selectedRole.toUpperCase();
      await updateUser({ id, role }).unwrap();

      showToast({
        status: 'success',
        message: 'User Role has been changed',
      });

      if (onSuccess) onSuccess();
    } catch (error: any) {
      const errorMessage = error?.data?.message || 'Failed to update the user role. Try again!';
      showToast({
        status: 'error',
        message: errorMessage,
      });
    }
  };

  return {
    updateUserRole,
    isLoading,
  };
};

export default useUpdateUserRole;
