import { DropHalf } from '@phosphor-icons/react';

interface LoadingBlockProps {
  layoutClassName: string;
}

const LoadingBlock = (props: LoadingBlockProps) => {
  const { layoutClassName } = props;
  return (
    <div
      className={`${layoutClassName} animate-pulse w-full bg-gradient-to-br from-secondary to-primary 
        text-light h-[350px] rounded-xl shadow-md flex justify-center items-center`}
    >
      <h1 className="text-5xl font-semibold text-center">
        <DropHalf />
      </h1>
    </div>
  );
};

export default LoadingBlock;
