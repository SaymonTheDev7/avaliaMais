"use client";
import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface StudentFormLayoutProps {
  students: { name: string; image: string }[];
  mainStudent: { name: string; image: string };
  positivePointsPlaceholder: string;
  improvementPointsPlaceholder: string;
  suggestionsPlaceholder: string;
  setMainStudent: (student: { name: string; image: string }) => void;
  teachers: { name: string; image: string }[];
}

export function StudentFormLayout({ students, mainStudent, positivePointsPlaceholder, improvementPointsPlaceholder, suggestionsPlaceholder, setMainStudent, teachers }: StudentFormLayoutProps) {
  const [selectedTeacher, setSelectedTeacher] = useState(teachers[0]);

  const handleTeacherChange = (teacherName: string) => {
    const teacher = teachers.find((teacher) => teacher.name === teacherName);
    if (teacher) {
      setSelectedTeacher(teacher);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Main Student Card */}
      <div className="bg-[#02335E] rounded-lg shadow p-4 text-white">
        <div className="flex flex-col items-center mb-4">
          <img src={mainStudent.image} alt={mainStudent.name} className="rounded-full w-16 h-16" />
          <h3 className="text-lg font-semibold mt-2">{mainStudent.name}</h3>
          <p className="text-sm">Mais alunos de AI PSIN 2023/2-MI74</p>
        </div>
        <ul className="space-y-2 max-h-100 overflow-y-auto">
          {students.map((student) => (
            <li
              key={student.name}
              className={`flex items-center rounded-md p-2 text-black mr-2 cursor-pointer ${student.name === mainStudent.name ? 'bg-gray-300 text-white' : 'bg-white hover:bg-gray-200'}`}
              onClick={() => setMainStudent(student)}
            >
              <img src={student.image} alt={student.name} className="rounded-full w-10 h-10 mr-2" />
              <span>{student.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pre-Conselho Card */}
      <div className="bg-[#02335E] rounded-lg shadow p-4 text-white">
        <h3 className="text-lg font-semibold mb-4">Pré-conselho</h3>
        <Select onValueChange={handleTeacherChange} defaultValue={selectedTeacher.name}>
          <SelectTrigger className="w-full bg-white text-black">
            <SelectValue placeholder={selectedTeacher.name} />
          </SelectTrigger>
          <SelectContent className="bg-white text-black">
            {teachers.map((teacher) => (
              <SelectItem key={teacher.name} value={teacher.name}>
                {teacher.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="mt-4">
          <h4 className="text-md font-semibold">Pontos positivos</h4>
          <textarea
            placeholder={positivePointsPlaceholder}
            className="mb-2 bg-white text-black w-full rounded-md border-none focus:ring-0 resize-none h-24"
            readOnly
          />
          <h4 className="text-md font-semibold">Pontos de melhoria</h4>
          <textarea
            placeholder={improvementPointsPlaceholder}
            className="mb-2 bg-white text-black w-full rounded-md border-none focus:ring-0 resize-none h-24"
            readOnly
          />
          <h4 className="text-md font-semibold">Sugestões de melhoria</h4>
          <textarea
            placeholder={suggestionsPlaceholder}
            className="bg-white text-black w-full rounded-md border-none focus:ring-0 resize-none h-24"
            readOnly
          />
        </div>
      </div>

      {/* Conselho de Classe Card */}
      <div className="bg-[#02335E] rounded-lg shadow p-4 text-white">
        <h3 className="text-lg font-semibold mb-4">Conselho de classe</h3>
        <p className="mb-2">Juciene M. de O. Mota</p>
        <div className="mt-4">
          <h4 className="text-md font-semibold">Pontos positivos</h4>
          <textarea
            placeholder={positivePointsPlaceholder}
            className="mb-2 bg-white text-black w-full rounded-md border-none focus:ring-0 resize-none h-24"
          />
          <h4 className="text-md font-semibold">Pontos de melhoria</h4>
          <textarea
            placeholder={improvementPointsPlaceholder}
            className="mb-2 bg-white text-black w-full rounded-md border-none focus:ring-0 resize-none h-24"
          />
          <h4 className="text-md font-semibold">Sugestões de melhoria</h4>
          <textarea
            placeholder={suggestionsPlaceholder}
            className="bg-white text-black w-full rounded-md border-none focus:ring-0 resize-none h-24"
          />
        </div>
        <Button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Salvar
        </Button>
      </div>
    </div>
  );
}

