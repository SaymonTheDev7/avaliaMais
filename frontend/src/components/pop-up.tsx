import React from 'react';
import { X } from "lucide-react";

interface PopupProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-[#02335E]">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="mb-6">
          {content}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#02335E] text-white rounded hover:bg-opacity-90"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;