import type { Icon } from '@phosphor-icons/react';
import type{ ChangeEvent } from 'react';

interface UploadImageInputProps {
    onImageSelect: (file: File | null) => void;
    label: string;
    icon?: Icon;
  }
  
const UploadImageInput = ({ onImageSelect,label,icon:Icon }: UploadImageInputProps) => {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      onImageSelect(file);
    };
  
  return (
    <div className="flex flex-col items-start my-2">
      <label className="flex items-center gap-2 mb-1">
      {Icon && <Icon size="18" color="#040710" />}
      <span className="text-sm text-dark">{label}</span>
      </label>
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
      className="block w-fit border border-gray-300 
      rounded-md p-2 text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm 
      file:bg-secondary/20 file:text-primary hover:file:bg-blue-200 cursor-pointer"
    />
  </div>
  );
};

export default UploadImageInput;
