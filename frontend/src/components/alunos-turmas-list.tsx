"use client"
import { Users, Clock, Check } from "lucide-react"

interface ClassItem {
  id: number
  name: string
  students: number
  time: string
  color: string
  current?: boolean
}

interface AlunosTurmasListProps {
  classes: ClassItem[]
  highlightCurrent?: boolean
  onClassClick?: (id: number, name: string, isCurrent: boolean) => void
}

export function AlunosTurmasList({ 
  classes, 
  highlightCurrent = false, 
  onClassClick 
}: AlunosTurmasListProps) {
  const getCourseInitials = (fullName: string) => {
    const parts = fullName.split(" ")
    if (parts.length >= 2) {
      const courseName = parts[0]
      return courseName.substring(0, 2)
    }
    return fullName.substring(0, 2)
  }

  const handleClick = (classItem: ClassItem) => {
    if (onClassClick) {
      onClassClick(classItem.id, classItem.name, !!classItem.current)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="hidden md:grid grid-cols-12 bg-gray-100 py-4 font-semibold text-[#003366]">
        <div className="col-span-1"></div>
        <div className="col-span-4 px-4">Nome da turma</div>
        <div className="col-span-3 px-4">Horário</div>
        <div className="col-span-3 px-4">Quantidade de alunos</div>
        {highlightCurrent && <div className="col-span-1 px-4">Status</div>}
      </div>

      {classes.map((classItem, index) => (
        <div
          key={classItem.id}
          className={`grid grid-cols-1 md:grid-cols-12 py-4 items-center ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}
          ${highlightCurrent && classItem.current ? "border-l-4 border-[#00C853]" : ""}
          ${onClassClick && classItem.current ? 'cursor-pointer hover:bg-gray-100' : ''}`}
          onClick={() => onClassClick && classItem.current && handleClick(classItem)}
        >
          {/* Mobile view */}
          <div className="md:hidden flex flex-col p-4 space-y-2">
            <div className="flex items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                style={{ backgroundColor: classItem.color }}
              >
                <div className="text-white font-bold">{getCourseInitials(classItem.name)}</div>
              </div>
              <div className="font-medium">
                {classItem.name}
                {highlightCurrent && classItem.current && (
                  <span className="ml-2 bg-[#00C853] text-white text-xs px-2 py-1 rounded-full inline-flex items-center">
                    <Check className="h-3 w-3 mr-1" />
                    Atual
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4 text-[#003366]" />
                <span>{classItem.time}</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-1 h-4 w-4 text-[#003366]" />
                <span>{classItem.students} alunos</span>
              </div>
            </div>
          </div>

          {/* Desktop view */}
          <div className="hidden md:flex md:col-span-1 justify-center">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: classItem.color }}
            >
              <div className="text-white font-bold">{getCourseInitials(classItem.name)}</div>
            </div>
          </div>
          <div className="hidden md:block md:col-span-4 px-4 font-medium">
            {classItem.name}
            {highlightCurrent && classItem.current && (
              <span className="ml-2 bg-[#00C853] text-white text-xs px-2 py-1 rounded-full inline-flex items-center">
                <Check className="h-3 w-3 mr-1" />
                Atual
              </span>
            )}
          </div>
          <div className="hidden md:flex md:col-span-3 px-4 items-center">
            <Clock className="mr-2 h-4 w-4 text-[#003366]" />
            <span>{classItem.time}</span>
          </div>
          <div className="hidden md:flex md:col-span-3 px-4 items-center">
            <Users className="mr-2 h-4 w-4 text-[#003366]" />
            <span>{classItem.students} alunos</span>
          </div>
          {highlightCurrent && (
            <div className="hidden md:flex md:col-span-1 px-4 justify-center">
              {classItem.current && (
                <Check className="h-5 w-5 text-[#00C853]" />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}