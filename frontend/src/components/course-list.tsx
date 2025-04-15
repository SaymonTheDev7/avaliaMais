import React from 'react';
import { X } from "lucide-react";

interface CourseListProps {
  courses: {
    id: string;
    name: string;
    type: string;
    workload: number;
    color: string;
  }[];
  onRemoveCourse: (id: string) => void;
}

export function CourseList({ courses, onRemoveCourse }: CourseListProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="grid grid-cols-12 bg-gray-100 py-4 font-semibold text-[#003366]">
        <div className="col-span-1"></div>
        <div className="col-span-4 px-4">Nome do curso</div>
        <div className="col-span-3 px-4">Tipo do curso</div>
        <div className="col-span-3 px-4">Carga horária</div>
        <div className="col-span-1"></div>
      </div>

      {courses.map((course, index) => (
        <div
          key={course.id}
          className={`grid grid-cols-12 py-4 items-center ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
        >
          <div className="col-span-1 flex justify-center">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: course.color }}
            >
              <div className="text-white font-bold">
                {course.name.split(' ').map(name => name[0]).join('').substring(0, 2)}
              </div>
            </div>
          </div>
          <div className="col-span-4 px-4 font-medium">{course.name}</div>
          <div className="col-span-3 px-4">{course.type}</div>
          <div className="col-span-3 px-4">{course.workload} horas</div>
          <div className="col-span-1 flex justify-center">
          </div>
        </div>
      ))}
    </div>
  );
}