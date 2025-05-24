import { FailedRequest } from '@/assets/svg';
import { useAppSelector } from '@/lib/redux/hooks';

const MainPageFetchError = () => {
  const theme = useAppSelector(state => state.theme.isDarkMode);

  return (
    <section className="flex flex-col w-full h-full justify-center items-center">
      <FailedRequest fill={theme ? '#006DA3' : '#13B6F6'} />
      <h1 className="mt-4 text-lg">Sorry 🥹 Failed to fetch the data</h1>
      <p className="text-darkGray">Try to refresh the page</p>
    </section>
  );
};

export default MainPageFetchError;
