import { useState } from "react";
import { type Icon, Eye, EyeSlash } from "@phosphor-icons/react";

interface InputProps {
  id: string;
  type?: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

      const toggleVisible = () => {
        setIsVisible(!isVisible);
      };
    
  return (
    <div className="relative my-10 border">
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
          className={`text-lg ${
            value ? "text-dark" : "text-neutral"
          } transition-colors duration-150`}
        >
          {label}
        </label>
      </div>
      {isPassword && (
        <div
          onClick={toggleVisible}
          className="absolute z-10 top-2.5 right-4 cursor-pointer"
        >
          {isVisible ? <EyeSlash size="24" /> : <Eye size="24" />}
        </div>
      )}
      {validationMessage && (
        <div className="mt-1">
          <p className="indent-2 text-xs">{validationMessage}</p>
        </div>
      )}
    </div>
  );
};

export default AnimatedInput;
