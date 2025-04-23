"use client"
import { X, Clock } from 'lucide-react'

// Definindo o tipo para os cursos
export type CourseItemType = {
  id: string
  name: string
  type: string
  workload: number
  color: string
  time?: number // Adicionando o campo time como opcional
}

export interface CourseListProps {
  courses: CourseItemType[]
  onRemoveCourse?: (id: string) => void
  onCourseClick?: (course: CourseItemType) => void
}

export function CourseList({ courses, onRemoveCourse, onCourseClick }: CourseListProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="grid grid-cols-12 bg-gray-100 py-4 font-semibold text-[#003366]">
        <div className="col-span-1"></div>
        <div className="col-span-3 px-4">Nome do curso</div>
        <div className="col-span-2 px-4">Tipo do curso</div>
        <div className="col-span-2 px-4">Carga horária</div>
        <div className="col-span-3 px-4">Duração</div>
        <div className="col-span-1"></div>
      </div>

      {courses.map((course, index) => (
        <div
          key={course.id}
          className={`grid grid-cols-12 py-4 items-center ${
            index % 2 === 0 ? "bg-gray-50" : "bg-white"
          } ${onCourseClick ? "cursor-pointer hover:bg-gray-100 transition-colors duration-200" : ""}`}
          onClick={() => onCourseClick && onCourseClick(course)}
        >
          <div className="col-span-1 flex justify-center">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: course.color }}
            >
              <div className="text-white font-bold">
                {course.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .substring(0, 2)}
              </div>
            </div>
          </div>
          <div className="col-span-3 px-4 font-medium">{course.name}</div>
          <div className="col-span-2 px-4">{course.type}</div>
          <div className="col-span-2 px-4">{course.workload} horas</div>
          <div className="col-span-3 px-4 flex items-center">
            <Clock className="h-4 w-4 mr-1 text-gray-500" />
            {course.time ? `${course.time} ${course.time === 1 ? "mês" : "meses"}` : "Não definido"}
          </div>
          <div className="col-span-1 flex justify-center">
            {onRemoveCourse && (
              <button
                onClick={(e) => {
                  e.stopPropagation() // Evita que o clique no botão de remover acione o onCourseClick
                  onRemoveCourse(course.id)
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
