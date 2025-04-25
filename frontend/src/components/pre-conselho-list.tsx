"use client"

import { Calendar, Users, CheckCircle, Clock, Info } from "lucide-react"
import Link from "next/link"

interface PreConselhoListProps {
  preconselhos: {
    id: number
    date: string
    status: "active" | "completed"
    students?: number
    time?: string
  }[]
  activeId?: number | null
  onItemClick?: (id: number) => void
}

export function PreConselhoList({ preconselhos, activeId = null, onItemClick }: PreConselhoListProps) {
  const handleClick = (id: number, e: React.MouseEvent) => {
    e.preventDefault()
    if (onItemClick) onItemClick(id)
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="hidden md:grid grid-cols-12 bg-gray-100 py-4 font-semibold text-[#003366]">
        <div className="col-span-1"></div>
        <div className="col-span-3 px-4">Conselho</div>
        <div className="col-span-3 px-4">Data</div>
        <div className="col-span-2 px-4">Participantes</div>
        <div className="col-span-2 px-4">Horário</div>
        <div className="col-span-1 px-4">Status</div>
      </div>

      {preconselhos.map((preconselho, index) => {
        const participantes = preconselho.students || Math.floor(Math.random() * 20) + 5
        const horario = preconselho.time || "14:00"

        return (
          <Link 
            href={preconselho.status === "active" ? `/conselho/editar/${preconselho.id}` : `/conselho/${preconselho.id}`} 
            key={preconselho.id}
          >
            <div
              className={`grid grid-cols-1 md:grid-cols-12 py-4 items-center ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100
                ${activeId === preconselho.id ? 'bg-blue-50' : ''}`}
              onClick={(e) => handleClick(preconselho.id, e)}
            >
              {/* Mobile View */}
              <div className="md:hidden p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Conselho {preconselho.date}</h3>
                  <div>
                    {preconselho.status === "active" ? (
                      <Clock className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    <span>{participantes} alunos</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{horario}</span>
                  </div>
                </div>
              </div>

              {/* Desktop View */}
              <div className="hidden md:flex md:col-span-1 justify-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#003366] text-white">
                  <Info className="h-5 w-5" />
                </div>
              </div>
              <div className="hidden md:block md:col-span-3 px-4 font-medium">
                Conselho {preconselho.status === "active" && "(Pendente)"}
              </div>
              <div className="hidden md:flex md:col-span-3 px-4 items-center">
                <Calendar className="mr-2 h-4 w-4 text-[#003366]" />
                <span>{preconselho.date}</span>
              </div>
              <div className="hidden md:flex md:col-span-2 px-4 items-center">
                <Users className="mr-2 h-4 w-4 text-[#003366]" />
                <span>{participantes}</span>
              </div>
              <div className="hidden md:flex md:col-span-2 px-4 items-center">
                <Clock className="mr-2 h-4 w-4 text-[#003366]" />
                <span>{horario}</span>
              </div>
              <div className="hidden md:flex md:col-span-1 px-4 justify-center">
                {preconselho.status === "active" ? (
                  <Clock className="h-5 w-5 text-yellow-500" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}