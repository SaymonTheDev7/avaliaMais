import React from 'react';
import { Users, Clock, X } from "lucide-react";

interface ClassListProps {
  classes: {
    id: number;
    name: string;
    students: number;
    time: string;
    color: string;
  }[];
  onRemoveClass?: (id: number) => void;
}

export function ClassList({ classes, onRemoveClass }: ClassListProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="grid grid-cols-12 bg-gray-100 py-4 font-semibold text-[#003366]">
        <div className="col-span-1"></div>
        <div className="col-span-4 px-4">Nome da turma</div>
        <div className="col-span-3 px-4">Horário</div>
        <div className="col-span-3 px-4">Quantidade de alunos</div>
        <div className="col-span-1"></div>
      </div>

      {classes.map((classItem, index) => (
        <div
          key={classItem.id}
          className={`grid grid-cols-12 py-4 items-center ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
        >
          <div className="col-span-1 flex justify-center">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: classItem.color }}
            >
              <div className="text-white font-bold">
                {classItem.name.split(' ').map(name => name[0]).join('').substring(0, 2)}
              </div>
            </div>
          </div>
          <div className="col-span-4 px-4 font-medium">{classItem.name}</div>
          <div className="col-span-3 px-4 flex items-center">
            <Clock className="mr-2 h-4 w-4 text-[#003366]" />
            <span>{classItem.time}</span>
          </div>
          <div className="col-span-3 px-4 flex items-center">
            <Users className="mr-2 h-4 w-4 text-[#003366]" />
            <span>{classItem.students} alunos</span>
          </div>
        </div>
      ))}
    </div>
  );
  
}