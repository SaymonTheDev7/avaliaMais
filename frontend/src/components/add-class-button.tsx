import React from "react";

export function AddClassButton() {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#003366] text-white cursor-pointer h-[180px]">
      <div className="rounded-full p-4 mb-2">
        <div className="text-4xl sm:text-5xl font-bold">+</div>
      </div>
      <div className="font-medium text-xl sm:text-2xl text-center">Adicionar turma</div>
    </div>
  );
}