import type { Icon } from '@phosphor-icons/react';
import type { ChangeEvent } from 'react';
import { useAppSelector } from '@/lib/redux/hooks';

interface UploadImageInputProps {
    onImageSelect: (file: File | null) => void;
    label: string;
    icon?: Icon;
  }
  
const UploadImageInput = ({ onImageSelect, label, icon: Icon }: UploadImageInputProps) => {
  const theme = useAppSelector((state) => state.theme.isDarkMode);
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      onImageSelect(file);
    };
  
  return (
    <div className="flex flex-col items-start my-2">
      <label className="flex items-center gap-2 mb-1">
      {Icon && <Icon size="18" color={theme ? "#F6F5F4":"#040710"} />}
      <span className="text-sm">{label}</span>
      </label>
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      className={`block w-fit border border-gray-300 
      rounded-md p-2 text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm 
      file:bg-secondary/20  hover:file:bg-blue-200 cursor-pointer
      ${theme ? "bg-darkGray text-light file:text-secondary":"bg-light"}
      `}
    />
  </div>
  );
};

export default UploadImageInput;
