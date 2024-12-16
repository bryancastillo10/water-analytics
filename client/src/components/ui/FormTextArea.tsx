import { type ChangeEvent } from "react";
import { type Icon } from "@phosphor-icons/react";
import { useAppSelector } from "@/lib/redux/hooks";

interface FormTextareaProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  icon?: Icon;
  validationMessage?: string;
}

const FormTextarea = ({
  id,
  label,
  disabled,
  required,
  value,
  onChange,
  icon: Icon,
  validationMessage,
}: FormTextareaProps) => {
  const theme = useAppSelector((state) => state.theme.isDarkMode);
  return (
    <div className="relative flex flex-col my-3">
      <label className="my-2 flex items-center gap-2">
        {Icon && <Icon size="18" color={theme ? "#F6F5F4": "#040710"} />}
        <span className="text-sm">{label}</span>
      </label>
      <textarea
        id={id}
        disabled={disabled}
        required={required}
        value={value}
        onChange={onChange}
        className={`rounded-xl p-2 h-40 border border-neutral focus:border-secondary focus:ring-secondary focus:outline-none resize-none
                ${theme ? "bg-darkGray text-light": "bg-[#ffffff]"}    
        `}
      />
      <div className="my-2">
        <p className="text-xs">{validationMessage}</p>
      </div>
    </div>
  );
};

export default FormTextarea;
