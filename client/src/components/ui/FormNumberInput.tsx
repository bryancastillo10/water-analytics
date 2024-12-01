
interface FormNumberInputProps{
  id: string;
  label: string;
  value: number;
  unit?: string;
  onChange: (value: number) => void;
  placeholder?: string;
}

const FormNumberInput = ({
  id,
  label,
  unit,
  value,
  onChange,
  placeholder = ""
}: FormNumberInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center gap-2">
       <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}:
      </label>
      <div className="relative">
        <input
          type="number"
          id={id}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-24 px-2 py-1 text-center border rounded-md focus:ring focus:ring-primary focus:outline-none border-none"
          step="0.1"
        />
        {unit && (
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
            {unit}
          </span>
        )}
    </div>
  </div>
  )
}

export default FormNumberInput;
