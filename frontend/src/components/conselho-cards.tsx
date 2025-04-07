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
  pedagogiques: { name: string; image: string }[];
}

export function StudentFormLayout({ students, mainStudent, positivePointsPlaceholder, improvementPointsPlaceholder, suggestionsPlaceholder, setMainStudent, teachers, pedagogiques }: StudentFormLayoutProps) {
  const [selectedTeacher, setSelectedTeacher] = useState(teachers[0]);
  const [selectedPedagogique, setSelectedPedagogique] = useState(pedagogiques[0]);
  const [salvo, setSalvo] = useState(false);
  const textareaHeight = 'h-32';

  const handleTeacherChange = (teacherName: string) => {
    const teacher = teachers.find((teacher) => teacher.name === teacherName);
    if (teacher) {
      setSelectedTeacher(teacher);
    }
  };

  const handlePedagogiqueChange = (pedagogiqueName: string) => {
    const pedagogique = pedagogiques.find((pedagogique) => pedagogique.name === pedagogiqueName);
    if (pedagogique) {
      setSelectedPedagogique(pedagogique);
    }
  };

  const handleSalvar = () => {
    setSalvo(true);
    setTimeout(() => setSalvo(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {/* Main Student Card */}
      <div className="bg-[#02335E] rounded-xl shadow p-4 text-white">
        <div className="flex flex-col items-center mb-4">
          <img src={mainStudent.image} alt={mainStudent.name} className="rounded-full w-16 h-16 mt-3" />
          <h3 className="text-2xl font-bold mt-2">{mainStudent.name}</h3>
          <p className="text-me">Mais alunos de AI PSIN 2023/2-MI74</p>
        </div>
        <ul className="space-y-2 max-h-110 overflow-y-auto">
          {students.map((student) => (
            <li
              key={student.name}
              className={`flex items-center rounded-xl p-2 text-black mr-2 cursor-pointer ${student.name === mainStudent.name ? 'bg-gray-400 text-white' : 'bg-white hover:bg-gray-100'}`}
              onClick={() => setMainStudent(student)}
            >
              <img src={student.image} alt={student.name} className="rounded-full w-10 h-10 mr-2" />
              <span>{student.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pre-Conselho Card */}
      <div className="bg-[#02335E] rounded-xl shadow p-4 text-white">
        <h3 className="text-2xl font-bold mb-3 mt-3">Pré-conselho</h3>
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
          <h4 className="text-lg font-semibold">Pontos positivos</h4>
          <textarea
            placeholder={positivePointsPlaceholder}
            className={`mb-2 p-2 bg-white text-black w-full rounded-xl border-none focus:ring-0 resize-none ${textareaHeight}`}
            readOnly
          />
          <h4 className="text-lg font-semibold">Pontos de melhoria</h4>
          <textarea
            placeholder={improvementPointsPlaceholder}
            className={`mb-2 p-2 bg-white text-black w-full rounded-xl border-none focus:ring-0 resize-none ${textareaHeight}`}
            readOnly
          />
          <h4 className="text-lg font-semibold">Sugestões de melhoria</h4>
          <textarea
            placeholder={suggestionsPlaceholder}
            className={`bg-white p-2 text-black w-full rounded-xl ${textareaHeight}`}
            readOnly
          />
        </div>
      </div>

      {/* Conselho de Classe Card */}
      <div className="bg-[#02335E] rounded-xl shadow p-4 text-white">
        <h3 className="text-2xl font-semibold mb-4 mt-2">Conselho de classe</h3>
        <Select onValueChange={handlePedagogiqueChange} defaultValue={selectedPedagogique.name}>
          <SelectTrigger className="w-full bg-white text-black">
            <SelectValue placeholder={selectedPedagogique.name} />
          </SelectTrigger>
          <SelectContent className="bg-white text-black">
            {pedagogiques.map((pedagogique) => (
              <SelectItem key={pedagogique.name} value={pedagogique.name}>
                {pedagogique.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Pontos positivos</h4>
          <textarea
            placeholder={positivePointsPlaceholder}
            className={`mb-2 p-2 bg-white text-black w-full rounded-xl border-none focus:ring-0 resize-none ${textareaHeight}`}
          />
          <h4 className="text-lg font-semibold">Pontos de melhoria</h4>
          <textarea
            placeholder={improvementPointsPlaceholder}
            className={`mb-2 p-2 bg-white text-black w-full rounded-xl border-none focus:ring-0 resize-none ${textareaHeight}`}
          />
          <h4 className="text-lg font-semibold">Sugestões de melhoria</h4>
          <textarea
            placeholder={suggestionsPlaceholder}
            className={`bg-white p-2 text-black w-full rounded-xl border-none focus:ring-0 resize-none ${textareaHeight}`}
          />
        </div>
        <div className="flex items-center justify-end mt-4">
          {salvo && <span className="mr-2 text-white-500">Salvo!</span>}
          <Button onClick={handleSalvar} className="bg-[#319F43] hover:bg-[#29873a] text-white font-bold py-2 px-4 rounded-xl">
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}