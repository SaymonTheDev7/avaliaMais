import React from 'react';
import { Clock, X } from "lucide-react";

interface AlunoListProps {
  alunos: {
    id: number;
    name: string;
    turma: string;
    turno: string;
    photoUrl: string | null;
    color: string;
  }[];
  onRemoveAluno: (id: number) => void;
}

export function AlunoList({ alunos, onRemoveAluno }: AlunoListProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="grid grid-cols-12 bg-gray-100 py-4 font-semibold text-[#003366]">
        <div className="col-span-1"></div>
        <div className="col-span-4 px-4">Nome do aluno</div>
        <div className="col-span-3 px-4">Turma</div>
        <div className="col-span-3 px-4">Turno</div>
        <div className="col-span-1"></div>
      </div>

      {alunos.map((aluno, index) => {
        const turnoFormatado = aluno.turno === "Manhã" ? "2º Turno" : aluno.turno;

        return (
          <div
            key={aluno.id}
            className={`grid grid-cols-12 py-4 items-center ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
          >
            <div className="col-span-1 flex justify-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: aluno.color }}
              >
                {aluno.photoUrl ? (
                  <img
                    src={aluno.photoUrl}
                    alt={aluno.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="text-white font-bold">
                    {aluno.name.split(' ').map(name => name[0]).join('').substring(0, 2)}
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-4 px-4 font-medium">{aluno.name}</div>
            <div className="col-span-3 px-4">{aluno.turma}</div>
            <div className="col-span-3 px-4 flex items-center">
              <Clock className="mr-2 h-4 w-4 text-[#003366]" />
              <span>{turnoFormatado}</span>
            </div>
            <div className="col-span-1 flex justify-center">
              <button
                onClick={() => onRemoveAluno(aluno.id)}
                className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="h-4 w-4 cursor-pointer" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
