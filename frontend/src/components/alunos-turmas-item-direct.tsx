"use client"

import { User, Check } from "lucide-react"
import { useRouter } from "next/navigation"

interface AlunosTurmasProps {
  id: number
  name: string
  students: number
  time: string
  color: string
  current?: boolean
}

export function AlunosTurmasItemDirect({ id, name, students, time, color, current = false }: AlunosTurmasProps) {
  const router = useRouter()

  const handleClick = () => {
    if (current) {
      router.push("/student/conselhos-student")
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`relative rounded-xl overflow-hidden shadow-md bg-[#003366] text-white h-[180px] transition-all 
        ${current ? "ring-4 ring-[#00C853] cursor-pointer hover:shadow-xl" : "hover:shadow-lg"}`}
    >
      {current && (
        <div className="absolute top-2 right-2 bg-[#00C853] text-white px-2 py-1 rounded-full flex items-center text-xs z-10">
          <Check className="h-3 w-3 mr-1" />
          Atual
        </div>
      )}

      <div className="h-20" style={{ backgroundColor: color }}></div>
      <div className="p-4 mt-2">
        <h3 className="text-xl sm:text-2xl font-bold truncate">{name}</h3>
        <div className="flex items-center text-base mt-3">
          <User className="mr-1 h-4 sm:h-5 w-4 sm:w-5" />
          <span>{students}</span>
          <span className="mx-2">-</span>
          <span>{time}</span>
        </div>
      </div>
    </div>
  )
}
