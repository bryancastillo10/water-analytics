import useDrawer from '@/hooks/useDrawer';
import { useToast } from '@/hooks/useToast';
import { useDeleteSiteMutation } from '@/features/sites/api/sitesApi';

const useDeleteSite = () => {
  const { handleCloseDrawer } = useDrawer();
  const { showToast } = useToast();
  const [deleteSite, { isLoading }] = useDeleteSiteMutation();

  const callDeleteSite = async (id: string) => {
    try {
      await deleteSite({ id });

      showToast({
        status: 'success',
        message: 'Site has been successfully deleted',
      });
    } catch (error: any) {
      showToast({
        status: 'error',
        message: error.message,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    callDeleteSite(id);
    handleCloseDrawer();
  };

  return {
    isLoading,
    handleSubmit,
  };
};

export default useDeleteSite;
