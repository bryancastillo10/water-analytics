interface ProgressBarProps{
    step: number;
    totalSteps: number;
}

const ProgressBar = ({ step, totalSteps }: ProgressBarProps) => {
  const stepsArray = Array.from({ length: totalSteps });

  return (
    <div className="flex w-fit items-center justify-between gap-4 my-4">
      {stepsArray.map((_, index) => (
        <div
          key={index}
          className={`w-4 h-4 rounded-full shadow-md border border-dark/20 ${
            step > index ? "bg-primary" : "bg-neutral"
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressBar;
