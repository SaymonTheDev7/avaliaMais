import React from 'react';
import { X } from 'lucide-react';

export interface CourseItemProps {
  id: string;
  name: string;
  type: string;
  workload: number;
  color: string;
  onClick?: () => void; // Adicionando a propriedade onClick opcional
}

export function CourseItem({ id, name, type, workload, color, onClick }: CourseItemProps) {
  return (
    <div 
      className="relative rounded-xl overflow-hidden shadow-md bg-[#003366] text-white h-[180px] cursor-pointer transition-transform hover:scale-105"
      onClick={onClick} // Adicionando o evento de clique
    >
      <div className="h-20" style={{ backgroundColor: color }}></div>
      <div className="p-4 mt-2">
        <h3 className="text-xl sm:text-2xl font-bold truncate">{name}</h3>
        <div className="flex items-center text-base mt-3">
          <span>Tipo do curso: {type}</span>
          <span className="mx-2">-</span>
          <span>Carga horária: {workload}h</span>
        </div>
      </div>
    </div>
  );
}
