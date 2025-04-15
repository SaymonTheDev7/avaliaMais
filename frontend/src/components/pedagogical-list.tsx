"use client"
import { Clock, X } from "lucide-react"

interface PedagogicalListProps {
  pedagogicals: {
    id: number
    name: string
    position: string
    hours: number
    photoUrl: string | null
    color: string
  }[]
  onRemovePedagogical: (id: number) => void
}

export function PedagogicalList({ pedagogicals, onRemovePedagogical }: PedagogicalListProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="grid grid-cols-12 bg-gray-100 py-4 font-semibold text-[#003366]">
        <div className="col-span-1"></div>
        <div className="col-span-4 px-4">Nome</div>
        <div className="col-span-3 px-4">Cargo</div>
        <div className="col-span-3 px-4">Carga horária semanal</div>
        <div className="col-span-1"></div>
      </div>

      {pedagogicals.map((pedagogical, index) => (
        <div
          key={pedagogical.id}
          className={`grid grid-cols-12 py-4 items-center ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
        >
          <div className="col-span-1 flex justify-center">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: pedagogical.color }}
            >
              <img
                src={pedagogical.photoUrl || "/placeholder.svg?height=40&width=40"}
                alt={pedagogical.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
          </div>
          <div className="col-span-4 px-4 font-medium">{pedagogical.name}</div>
          <div className="col-span-3 px-4">{pedagogical.position}</div>
          <div className="col-span-3 px-4 flex items-center">
            <Clock className="mr-2 h-4 w-4 text-[#003366]" />
            <span>{pedagogical.hours} horas</span>
          </div>
          <div className="col-span-1 flex justify-center">
            <button
              onClick={() => onRemovePedagogical(pedagogical.id)}
              className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            >
              <X className="h-4 w-4 cursor-pointer" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
