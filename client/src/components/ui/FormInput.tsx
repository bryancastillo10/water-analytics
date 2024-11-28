import { useState, type ChangeEvent } from "react";
import { type Icon, Eye, EyeSlash } from "@phosphor-icons/react";
import { useAppSelector } from "@/lib/redux/hooks";

interface FormInputProps {
  id: string;
  type?: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  isPassword?: boolean;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: Icon;
  validationMessage?: string;
}

const FormInput = ({
  id,
  type,
  label,
  disabled,
  required,
  isPassword = false,
  value,
  onChange,
  icon: Icon,
  validationMessage,
}: FormInputProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const theme = useAppSelector((state) => state.theme.isDarkMode);

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };
    
  return (
    <div className="relative flex flex-col my-3">
      <label className="my-2 flex items-center gap-2">
        {Icon && <Icon size="18" color={theme ? "#F6F5F4":"#040710"} />}
        <span className="text-sm">{label}</span>
      </label>
      <input
        id={id}
        type={type === "password" ? (isVisible ? "text" : "password") : type}
        disabled={disabled}
        required={required}
        value={value}
        onChange={onChange}
        className={`rounded-xl p-2 h-8 border border-neutral focus:border-primary focus:ring-primary focus:outline-none
          ${theme ? "bg-darkGray text-light":"bg-[#fffff] text-dark"}
        `}
      />
      {isPassword && (
        <div
          onClick={toggleVisible}
          className="absolute z-10 top-[42px] right-4 cursor-pointer"
        >
          {isVisible ? <EyeSlash size="20" /> : <Eye size="20" />}
        </div>
      )}
      <div className="my-2">
        <p className="text-xs">{validationMessage}</p>
      </div>
    </div>
  );
};

export default FormInput;
