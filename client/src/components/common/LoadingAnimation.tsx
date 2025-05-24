interface LoadingAnimationProps {
  size: 'sm' | 'md' | 'lg';
}

const LoadingAnimation = ({ size }: LoadingAnimationProps) => {
  const centerCircle = 'flex justify-center items-center';
  const getSizeClass = (size: string) => {
    switch (size) {
      case 'sm':
        return {
          outer: 'size-24',
          inner: 'size-20',
          central: 'size-14',
        };
      case 'lg':
        return {
          outer: 'size-48',
          inner: 'size-36',
          central: 'size-24',
        };
      default:
        return {
          outer: 'size-36',
          inner: 'size-28',
          central: 'size-16',
        };
    }
  };
  return (
    <div className={`${centerCircle}`}>
      <div
        className={`
        ${centerCircle} 
        relative 
        rounded-full 
        ${getSizeClass(size).outer} 
        bg-secondary 
        before:absolute 
        before:inset-0 
        before:rounded-full 
        before:bg-secondary 
        before:animate-ping 
        before:opacity-75
      `}
      >
        <div
          className={`
          ${centerCircle} 
          relative 
          rounded-full 
          ${getSizeClass(size).inner} 
          bg-primary 
          before:absolute 
          before:inset-0 
          before:rounded-full 
          before:bg-primary 
          before:animate-ping 
          before:animation-delay-300
        `}
        >
          <div
            className={`
            relative 
            bg-cyan-500 
            rounded-full 
            ${getSizeClass(size).central} 
            before:absolute 
            before:inset-0 
            before:rounded-full 
            before:bg-cyan-500 
            before:animate-ping 
            before:animation-delay-600
          `}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
