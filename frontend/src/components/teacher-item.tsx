"use client"

import { X } from "lucide-react"
import Image from "next/image"

export interface TeacherItemProps {
  id: string
  name: string
  professionalArea: string
  workShift: string
  photoUrl: string | null
  color: string
  onClick?: () => void
  onRemoveTeacher?: (id: string) => void
}

export function TeacherItem({
  id,
  name,
  professionalArea,
  workShift,
  photoUrl,
  color,
  onClick,
  onRemoveTeacher,
}: TeacherItemProps) {
  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-md bg-[#003366] text-white h-[180px] cursor-pointer transition-transform hover:scale-105"
      onClick={onClick}
    >
      <div className="h-20" style={{ backgroundColor: color }}></div>
      <div className="absolute top-4 left-4 w-16 h-16 rounded-full border-2 border-white overflow-hidden bg-white">
        {photoUrl ? (
          <Image src={photoUrl || "/placeholder.svg"} alt={name} width={64} height={64} className="object-cover" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-xl font-bold"
            style={{ backgroundColor: color, color: "white" }}
          >
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)}
          </div>
        )}
      </div>
      <div className="p-4 mt-2">
        <h3 className="text-xl sm:text-2xl font-bold truncate">{name}</h3>
        <div className="flex items-center text-base mt-3">
          <span>Turno: {workShift}</span>
        </div>
      </div>
      {onRemoveTeacher && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemoveTeacher(id)
          }}
          className="absolute top-2 right-2 text-white hover:text-red-300 transition-colors duration-200"
        >
          <X size={20} />
        </button>
      )}
    </div>
  )
}
