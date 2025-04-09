"use client"

import { Users, Clock, CheckCircle } from "lucide-react"

interface PreConselhoClass {
  id: number
  name: string
  students: number
  time: string
  color: string
  status: string
}

interface PreConselhoClassListProps {
  classes: PreConselhoClass[]
}

export function PreConselhoClassList({ classes }: PreConselhoClassListProps) {
  const getCourseInitials = (fullName: string) => {
    const parts = fullName.trim().split(" ")
    if (parts.length >= 2) {
      return parts[0].substring(0, 1).toUpperCase() + parts[1].substring(0, 1).toUpperCase()
    }
    return fullName.substring(0, 2).toUpperCase()
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Cabeçalho desktop */}
      <div className="hidden md:grid grid-cols-12 bg-gray-100 py-4 font-semibold text-[#003366]">
        <div className="col-span-1"></div>
        <div className="col-span-4 px-4">Nome da turma</div>
        <div className="col-span-3 px-4">Horário</div>
        <div className="col-span-3 px-4">Quantidade de alunos</div>
        <div className="col-span-1 px-4">Status</div>
      </div>

      {classes.map((item, index) => (
        <div
          key={item.id}
          className={`grid grid-cols-1 md:grid-cols-12 py-4 items-center ${
            index % 2 === 0 ? "bg-gray-50" : "bg-white"
          }`}
        >
          {/* Versão mobile */}
          <div className="md:hidden flex flex-col p-4 space-y-2">
            <div className="flex items-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                style={{ backgroundColor: item.color }}
              >
                <div className="text-white font-bold">{getCourseInitials(item.name)}</div>
              </div>
              <div className="font-medium">{item.name}</div>
              <div className="ml-auto">
                {item.status === "active" ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <Clock className="h-5 w-5 text-yellow-500" />
                )}
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4 text-[#003366]" />
                <span>{item.time}</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-1 h-4 w-4 text-[#003366]" />
                <span>{item.students} alunos</span>
              </div>
            </div>
          </div>

          {/* Versão desktop */}
          <div className="hidden md:flex md:col-span-1 justify-center">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: item.color }}
            >
              <div className="text-white font-bold">{getCourseInitials(item.name)}</div>
            </div>
          </div>
          <div className="hidden md:block md:col-span-4 px-4 font-medium">{item.name}</div>
          <div className="hidden md:flex md:col-span-3 px-4 items-center">
            <Clock className="mr-2 h-4 w-4 text-[#003366]" />
            <span>{item.time}</span>
          </div>
          <div className="hidden md:flex md:col-span-3 px-4 items-center">
            <Users className="mr-2 h-4 w-4 text-[#003366]" />
            <span>{item.students} alunos</span>
          </div>
          <div className="hidden md:flex md:col-span-1 justify-center">
            {item.status === "active" ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <Clock className="h-5 w-5 text-yellow-500" />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
