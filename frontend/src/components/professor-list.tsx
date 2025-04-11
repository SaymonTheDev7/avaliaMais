import React from 'react';
import { Clock, X } from "lucide-react";

interface ProfessorListProps {
  professors: {
    id: number;
    name: string;
    department: string;
    hours: number;
    photoUrl: string | null;
    color: string;
  }[];
  onRemoveProfessor: (id: number) => void;
}

export function ProfessorList({ professors, onRemoveProfessor }: ProfessorListProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="grid grid-cols-12 bg-gray-100 py-4 font-semibold text-[#003366]">
        <div className="col-span-1"></div>
        <div className="col-span-4 px-4">Nome do professor</div>
        <div className="col-span-3 px-4">Área do professor</div>
        <div className="col-span-3 px-4">Carga horária semanal</div>
        <div className="col-span-1"></div>
      </div>

      {professors.map((professor, index) => (
        <div
          key={professor.id}
          className={`grid grid-cols-12 py-4 items-center ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
        >
          <div className="col-span-1 flex justify-center">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: professor.color }}
            >
              {professor.photoUrl ? (
                <img
                  src={professor.photoUrl}
                  alt={professor.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="text-white font-bold">
                  {professor.name.split(' ').map(name => name[0]).join('').substring(0, 2)}
                </div>
              )}
            </div>
          </div>
          <div className="col-span-4 px-4 font-medium">{professor.name}</div>
          <div className="col-span-3 px-4">{professor.department}</div>
          <div className="col-span-3 px-4 flex items-center">
            <Clock className="mr-2 h-4 w-4 text-[#003366]" />
            <span>{professor.hours} horas</span>
          </div>
          <div className="col-span-1 flex justify-center">
            <button
              onClick={() => onRemoveProfessor(professor.id)}
              className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X className="h-4 w-4 cursor-pointer" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}