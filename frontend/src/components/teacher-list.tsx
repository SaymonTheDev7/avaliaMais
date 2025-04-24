"use client"
import { X, User } from "lucide-react"
import Image from "next/image"

// Definindo o tipo para os professores
export type TeacherItemType = {
  id: string
  name: string
  professionalArea: string
  workShift: string
  photoUrl?: string | null
  color: string
  email?: string
  workloadWeek?: number
}

export interface TeacherListProps {
  teachers: TeacherItemType[]
  onRemoveTeacher?: (id: string) => void
  onTeacherClick?: (teacher: TeacherItemType) => void
}

export function TeacherList({ teachers, onRemoveTeacher, onTeacherClick }: TeacherListProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="grid grid-cols-12 bg-gray-100 py-4 font-semibold text-[#003366]">
        <div className="col-span-1"></div>
        <div className="col-span-3 px-4">Nome do professor</div>
        <div className="col-span-2 px-4">Área profissional</div>
        <div className="col-span-2 px-4">Turno</div>
        <div className="col-span-3 px-4">Email</div>
        <div className="col-span-1"></div>
      </div>

      {teachers.map((teacher, index) => (
        <div
          key={teacher.id}
          className={`grid grid-cols-12 py-4 items-center ${
            index % 2 === 0 ? "bg-gray-50" : "bg-white"
          } ${onTeacherClick ? "cursor-pointer hover:bg-gray-100 transition-colors duration-200" : ""}`}
          onClick={() => onTeacherClick && onTeacherClick(teacher)}
        >
          <div className="col-span-1 flex justify-center">
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
              {teacher.photoUrl ? (
                <Image
                  src={teacher.photoUrl || "/placeholder.svg"}
                  alt={teacher.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: teacher.color }}
                >
                  <div className="text-white font-bold">
                    {teacher.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                      .substring(0, 2)}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-3 px-4 font-medium">{teacher.name}</div>
          <div className="col-span-2 px-4">{teacher.professionalArea}</div>
          <div className="col-span-2 px-4">{teacher.workShift}</div>
          <div className="col-span-3 px-4 flex items-center">
            <User className="h-4 w-4 mr-1 text-gray-500" />
            {teacher.email || "Não definido"}
          </div>
          <div className="col-span-1 flex justify-center">
            {onRemoveTeacher && (
              <button
                onClick={(e) => {
                  e.stopPropagation() // Evita que o clique no botão de remover acione o onTeacherClick
                  onRemoveTeacher(teacher.id)
                }}
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
