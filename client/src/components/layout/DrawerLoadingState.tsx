import { LoadingAnimation } from '@/components/common';

const DrawerLoadingState = () => {
  return (
    <div className="w-full h-[60vh] flex justify-center items-center">
      <LoadingAnimation size="lg" />
    </div>
  );
};

export default DrawerLoadingState;
