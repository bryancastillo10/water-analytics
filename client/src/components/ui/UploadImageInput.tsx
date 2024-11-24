import type{ ChangeEvent } from 'react';

interface UploadImageInputProps {
    onImageSelect: (file: File | null) => void;
    label: string;
  }
  
const UploadImageInput = ({ onImageSelect,label }: UploadImageInputProps) => {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      onImageSelect(file);
    };
  
  return (
    <div className="flex flex-col items-start my-2">
          <label className="text-sm font-medium text-dark mb-1">{label}</label>
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
