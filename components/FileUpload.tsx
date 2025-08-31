
import React, { useRef } from 'react';
import { UserImage } from '../types';

interface FileUploadProps {
  onImageUpload: (image: UserImage) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageUpload({ file, dataUrl: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="text-center p-8 max-w-2xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Find Your Perfect Look</h1>
      <p className="text-lg text-gray-600 mb-8">
        Ever wonder how you'd look with a different hairstyle? Upload a clear, front-facing photo and let our AI stylist show you the possibilities.
      </p>
      
      <div 
        className="border-2 border-dashed border-gray-300 rounded-2xl p-12 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300 cursor-pointer"
        onClick={handleClick}
      >
        <input
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <div className="flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <span className="text-indigo-600 font-semibold">Click to upload a photo</span>
          <p className="text-sm text-gray-500 mt-1">PNG, JPG, or WEBP. Best results with a clear selfie.</p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
