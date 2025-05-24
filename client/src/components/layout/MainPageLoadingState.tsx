import { LoadingAnimation } from '@/components/common';
const MainPageLoadingState = () => {
  return (
    <section className="flex w-full h-full justify-center items-center">
      <LoadingAnimation size="lg" />
    </section>
  );
};

export default MainPageLoadingState;
