import React from "react";
import { User, X } from "lucide-react";

type ClassItemProps = {
  id: number;
  name: string;
  students: number;
  time: string;
  color: string;
};

export function ClassItem({ id, name, students, time, color }: ClassItemProps) {
  return (
    <div
      key={id}
      className="relative rounded-xl overflow-hidden shadow-md bg-[#003366] text-white h-[180px]"
    >
      <div className="h-20" style={{ backgroundColor: color }}></div>
      <div className="p-4 mt-2">
        <h3 className="text-xl sm:text-2xl font-bold truncate">{name}</h3>
        <div className="flex items-center text-base mt-3">
          <User className="mr-1 h-4 sm:h-5 w-4 sm:w-5" />
          <span>{students}</span>
          <span className="mx-2">-</span>
          <span>Horário da turma: {time}</span>
        </div>

        <button
          className="absolute bottom-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 mb-1 mr-1"
        >
          <X className="h-4 sm:h-5 w-4 sm:w-5 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}