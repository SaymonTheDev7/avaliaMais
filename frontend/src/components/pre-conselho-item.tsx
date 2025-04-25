"use client"

import { User, CheckCircle, Clock } from "lucide-react"

interface PreConselhoItemProps {
  id: number
  name: string
  students: number
  time: string
  color: string
  status: "active" | "completed"
  date?: string
  isActive?: boolean
  onClick?: (id: number) => void
}

export function PreConselhoItem({ 
  id, 
  name, 
  students, 
  time, 
  color, 
  status, 
  date,
  isActive = false,
  onClick
}: PreConselhoItemProps) {
  const handleClick = () => {
    if (onClick) onClick(id)
  }

  return (
    <div 
      className={`relative rounded-xl overflow-hidden shadow-md bg-[#003366] text-white h-[180px] cursor-pointer transition-all
        ${isActive ? 'ring-4 ring-[#00C853]' : 'hover:shadow-lg'}`}
      onClick={handleClick}
    >
      <div className="h-20" style={{ backgroundColor: color }}></div>
      <div className="p-4 mt-2">
        <h3 className="text-xl sm:text-2xl font-bold truncate">{name}</h3>
        <div className="flex items-center text-base mt-3">
          <User className="mr-1 h-4 sm:h-5 w-4 sm:w-5" />
          <span>{students} alunos</span>
          <span className="mx-2">-</span>
          <span>{time}</span>
        </div>
        {date && (
          <div className="flex items-center text-sm mt-2">
            <span>{date}</span>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-2 right-2">
        {status === "active" ? (
          <Clock className="h-6 w-6 text-yellow-500" />
        ) : (
          <CheckCircle className="h-6 w-6 text-green-500" />
        )}
      </div>
    </div>
  )
}