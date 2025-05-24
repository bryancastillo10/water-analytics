import { Button } from '@/components/ui';
import { FailedRequest } from '@/assets/svg';

import { useAppSelector } from '@/lib/redux/hooks';
import useDrawer from '@/hooks/useDrawer';

const DrawerFetchError = () => {
  const theme = useAppSelector(state => state.theme.isDarkMode);

  const { handleCloseDrawer } = useDrawer();

  return (
    <div className="mt-4 flex flex-col w-full h-screen justify-center items-center">
      <FailedRequest fill={theme ? '#006DA3' : '#13B6F6'} />
      <h1 className="my-4 text-lg">Sorry 🥹 Failed to fetch some data</h1>
      <Button action={handleCloseDrawer} variant="primary">
        Close
      </Button>
    </div>
  );
};

export default DrawerFetchError;
