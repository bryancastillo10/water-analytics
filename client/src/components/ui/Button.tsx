
interface ButtonProps {
  action?: () => void;
  type?: "submit" | "reset" | "button";
  width?: string;
  loading?: boolean;
  fontSize?: string;
  variant?: string;
  children: React.ReactNode
}

const Button = ({
  action,
  type="button",
  width = "w-fit",
  fontSize="text-base",
  loading,
  variant,
  children
}: ButtonProps) => {
    const getBtnStyle = (variant: string) => {
      switch (variant) {
        case "primary":
          return "border border-transparent bg-primary text-white hover:bg-primary/70";
        case "outline":
          return "border text-primary border-primary hover:border-primary  hover:bg-primary hover:text-white";
        case "danger":
          return "border border-transparent text-white bg-rose-500 hover:bg-rose-700";
        default:
          return "bg-cyan-600 text-slate-100  hover:bg-teal-500/90 p-0";
      }
    };
  return (
    <button
      onClick={action}
      type={type}
      className={`${width} ${fontSize} font-semibold px-3 py-1 rounded-xl
        duration-500 ease-in-out
        ${getBtnStyle(variant!)}`}
    >
      {loading ? (
        <div className="flex justify-center items-center gap-0.5">
          <svg
            className="animate-spin size-4 mr-2 border-white border-t-outline border-2 rounded-full"
            viewBox="0 0 24 24"
          />
          <span className="font-semibold text-base">Loading . . .</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
