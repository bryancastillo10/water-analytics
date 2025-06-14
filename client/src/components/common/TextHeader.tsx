import { useAppSelector } from '@/lib/redux/hooks';

interface TextHeaderProps {
  text: string;
  fontSize?: string;
}

const TextHeader = ({ text, fontSize = 'text-2xl' }: TextHeaderProps) => {
  const theme = useAppSelector(state => state.theme.isDarkMode);

  return (
    <div className="inline-block my-2">
      <h1
        className={`${fontSize} font-bold tracking-widest ${theme ? 'text-secondary' : 'text-dark'} mb-2`}
      >
        {text}
      </h1>
      <hr className={`border ${theme ? 'border-secondary' : 'border-neutral'}`} />
    </div>
  );
};

export default TextHeader;
