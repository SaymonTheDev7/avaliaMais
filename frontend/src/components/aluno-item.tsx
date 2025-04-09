import React from 'react';
import { Clock, X } from "lucide-react";

interface AlunoItemProps {
  id: number;
  name: string;
  turma: string;
  turno: string;
  photoUrl: string | null;
  color: string;
  onRemoveAluno: (id: number) => void;
}

export function AlunoItem({ id, name, turma, turno, photoUrl, color, onRemoveAluno }: AlunoItemProps) {
  const initials = name.split(' ').map(name => name[0]).join('').substring(0, 2);
  const turnoFormatado = turno === "Manhã" ? "2º Turno" : turno;

  return (
    <div key={id} className="relative rounded-xl overflow-hidden shadow-md bg-[#003366] text-white h-[180px]">
      <div className="h-18" style={{ backgroundColor: color }}></div>
      <div className="absolute top-10 left-4 transform -translate-y-1/2">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={name}
            className="w-16 h-16 rounded-full border-4 border-white object-cover mt-10"
          />
        ) : (
          <div
            className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center text-2xl font-bold"
            style={{ backgroundColor: "#D65F5F" }}
          >
            {initials}
          </div>
        )}
      </div>
      <div className="p-4 mt-2">
        <h3 className="text-xl sm:text-2xl font-bold truncate">{name}</h3>
        <div className="flex items-center text-base mt-3">
          <span>{turma}</span>
          <span className="mx-2">-</span>
          <Clock className="mr-1 h-4 sm:h-5 w-4 sm:w-5" />
          <span>{turnoFormatado}</span>
        </div>

        <button
          onClick={() => onRemoveAluno(id)}
          className="absolute bottom-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 mb-1 mr-1"
        >
          <X className="h-4 sm:h-5 w-4 sm:w-5 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
