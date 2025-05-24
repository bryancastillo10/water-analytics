import TextHeader from '@/components/common/TextHeader';
import type { Icon } from '@phosphor-icons/react';

import { useAppSelector } from '@/lib/redux/hooks';

interface FormSubheaderProps {
  icon: Icon;
  text: string;
}

const FormSubheader = ({ icon: Icon, text }: FormSubheaderProps) => {
  const theme = useAppSelector(state => state.theme.isDarkMode);
  return (
    <div className="flex items-center gap-4 my-3">
      <Icon size="28" color={theme ? '#13b6f6' : '#545454'} />
      <TextHeader text={text} fontSize="text-lg" />
    </div>
  );
};

export default FormSubheader;
