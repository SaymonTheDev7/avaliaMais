import React from 'react';
import { X } from "lucide-react";

interface CourseItemProps {
  id: string;
  name: string;
  type: string;
  workload: number;
  color: string;
}

export function CourseItem({ id, name, type, workload, color }: CourseItemProps) {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-md bg-[#003366] text-white h-[180px]">
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