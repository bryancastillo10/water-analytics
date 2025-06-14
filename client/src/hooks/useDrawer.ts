import { useCallback } from 'react';

import { useAppDispatch } from '@/lib/redux/hooks';
import { openDrawer, closeDrawer } from '@/lib/redux/states/drawerSlice';

const useDrawer = () => {
  const dispatch = useAppDispatch();

  const handleOpenDrawer = useCallback(
    <T extends object>(title: string, componentName: string, bodyProps: T = {} as T) => {
      dispatch(openDrawer({ title, componentName, bodyProps }));
    },
    [dispatch],
  );

  const handleCloseDrawer = useCallback(() => {
    dispatch(closeDrawer());
  }, [dispatch]);

  return { handleOpenDrawer, handleCloseDrawer };
};

export default useDrawer;
