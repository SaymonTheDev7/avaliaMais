import React from 'react';

export default function AdicionarButton() {
  return (
    <button className="bg-gray-200 text-gray-500 px-4 py-2 rounded-xl flex items-center">
      <div className="bg-[#ffffff] text-blue-900 rounded-full w-6 h-6 flex items-center justify-center mr-2">
        <span className="text-xl font-bold">+</span>
      </div>
      <span className="font-bold">Adicionar</span>
    </button>
  );
}