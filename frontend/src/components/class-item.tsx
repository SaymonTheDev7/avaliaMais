"use client"

import { User } from "lucide-react"

type ClassItemProps = {
  id: number
  name: string
  students: number
  time: string
  color: string
  onClick?: () => void
}

export default function ClassItem({ id, name, students, time, color, onClick }: ClassItemProps) {
  return (
    <div
      key={id}
      className="relative rounded-xl overflow-hidden shadow-md bg-[#003366] text-white h-[180px] cursor-pointer"
      onClick={onClick}
    >
      <div className="h-20" style={{ backgroundColor: color }}></div>
      <div className="p-4 mt-2">
        <h3 className="text-xl sm:text-2xl font-bold truncate">{name}</h3>
        <div className="flex items-center text-base mt-3">
          <User className="mr-1 h-4 sm:h-5 w-4 sm:w-5" />
          <span>{students}</span>
          <span className="mx-2">-</span>
          <span>Horário da turma: {time}</span>
        </div>
      </div>
    </div>
  )
}
