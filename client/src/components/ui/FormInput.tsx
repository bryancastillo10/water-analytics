import { useState, type ChangeEvent } from "react";
import { type Icon, Eye, EyeSlash } from "@phosphor-icons/react";

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

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };
    
  return (
    <div className="relative flex flex-col my-3">
      <label className="my-2 flex items-center gap-2">
        {Icon && <Icon size="18" color="#040710" />}
        <span className="text-sm text-dark">{label}</span>
      </label>
      <input
        id={id}
        type={type === "password" ? (isVisible ? "text" : "password") : type}
        disabled={disabled}
        required={required}
        value={value}
        onChange={onChange}
        className="rounded-xl p-2 h-8 border border-neutral 
        focus:border-secondary focus:ring-secondary focus:outline-none"
      />
      {isPassword && (
        <div
          onClick={toggleVisible}
          className="absolute z-10 top-12 right-4 cursor-pointer"
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
