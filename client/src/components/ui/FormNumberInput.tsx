import { forwardRef, type ChangeEvent } from "react";

interface FormNumberInputProps {
  id: string;
  label?: string;
  value: string | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormNumberInput = forwardRef<HTMLInputElement, FormNumberInputProps>(
  ({ id, label, value, onChange }, ref) => {
    return (
      <div className="flex items-center gap-2">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-gray-700">
            {label}:
          </label>
        )}
        <div className="relative">
          <input
            type="number"
            id={id}
            ref={ref} 
            value={value || ""}
            onChange={onChange}
            className="rounded-xl w-16 p-2 h-8 border border-neutral focus:outline-none focus:border-primary bg-[#ffffff] text-dark"
          />
        </div>
      </div>
    );
  }
);

// ✅ Add display name for better debugging
FormNumberInput.displayName = "FormNumberInput";

export default FormNumberInput;
