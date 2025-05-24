import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/lib/redux/hooks';
import { useToast } from '@/hooks/useToast';
import useDrawer from '@/hooks/useDrawer';

import { type Icon } from '@phosphor-icons/react';

interface PageCardProps {
  name: string;
  icon: Icon;
  tagLine: string;
  link: string;
}

const PageCard = (props: PageCardProps) => {
  const { name, icon: Icon, tagLine, link } = props;
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { handleCloseDrawer } = useDrawer();

  const theme = useAppSelector(state => state.theme.isDarkMode);

  const user = useAppSelector(state => state.user);

  const role = user.role.toLowerCase();

  const handleCardClick = () => {
    if (link == '/users' && role !== 'admin') {
      showToast({
        status: 'warning',
        message: 'Can Only Be Accessed By Users with Admin Role',
      });
      handleCloseDrawer();
      return;
    }
    navigate(`/${role}${link}`);
    handleCloseDrawer();
  };

  return (
    <div
      onClick={handleCardClick}
      className={`grid grid-cols-1 size-48 place-items-center ${theme ? 'border-neutral' : 'border-primary'} 
                    p-4 border border-dashed cursor-pointer rounded-lg hover:scale-90 duration-500 ease-out`}
    >
      <div
        className={`mb-3 px-4 py-3 rounded-2xl shadow-md w-fit ${theme ? 'bg-secondary' : 'bg-primary text-light'}`}
      >
        <Icon size={40} />
      </div>
      <h1 className={`text-lg font-medium ${theme ? 'text-light' : 'text-dark'}`}>{name}</h1>
      <p className={`mt-1 text-sm text-center ${theme ? 'text-neutral' : 'text-darkGray'}`}>
        {tagLine}
      </p>
    </div>
  );
};

export default PageCard;
