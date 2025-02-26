import { useState, type ChangeEvent } from "react";
import { type Icon, Eye, EyeSlash, Info } from "@phosphor-icons/react";


interface ToolTipProps {
  message: string;
  show: boolean;
}


const Tooltip = ({ message, show }: ToolTipProps) =>{ 
  return (
    <div
    className={`absolute bg-primary text-white flex items-center h-12 w-[70%] max-w-fit 
    rounded-md z-40 bottom-10 right-2 py-4 px-2 transition-opacity duration-300 ease-in-out 
    ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
  >
    <p className="text-xs text-pretty">{message}</p>
  </div>
  )}
;

interface InputProps {
  id: string;
  type?: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  icon?: Icon;
  validationMessage?: string;
}


const AnimatedInput = ({
  id,
  type = "text",
  label,
  value,
  onChange,
  disabled,
  isPassword = false,
  required,
  icon: Icon,
  validationMessage,
}: InputProps) => {
      const [isVisible, setIsVisible] = useState<boolean>(false);
      const [showInfo, setShowInfo] = useState<boolean>(false);

      const toggleVisible = () => {
        setIsVisible(!isVisible);
      };
    
  return (
    <div className="relative flex items-start gap-x-1 my-8">
      <input
        id={id}
        type={type === "password" ? (isVisible ? "text" : "password") : type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        placeholder=" "
        className={`peer w-full h-full p-2 caret-secondary border rounded-xl outline-none transition 
            disabled:opacity-50 disabled:cursor-not-allowed indent-2 bg-light/20 text-dark border-dark focus:border-secondary
            `}
      />
      <div
        className="absolute z-10 top-2 left-4 origin-[0] duration-150 flex items-center gap-2
        transform -translate-y-10 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
      >
        {Icon && <Icon size="24" color={value ? "#040710" : "#c2c2c2"} />}
        <label
          className={`text-sm xl:text-lg ${
            value ? "text-dark" : "text-neutral"
          } transition-colors duration-150`}
        >
          {label}
        </label>
      </div>
      {isPassword && (
        <div
          onClick={toggleVisible}
          className={`absolute z-10 top-2.5 ${validationMessage ? "right-8" :"right-4"} cursor-pointer`}
        >
          {isVisible ? <EyeSlash size="24" /> : <Eye size="24" />}
        </div>
      )}
      {validationMessage && (
        <>
          <Info
            className="cursor-grab hover:text-primary"
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={()=> setShowInfo(false)}
            size="24" />
          <Tooltip message={validationMessage} show={showInfo} />
        </>
      )}
    </div>
  );
};

export default AnimatedInput;
