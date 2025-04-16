"use client"

import { User, CheckCircle, Clock } from "lucide-react"

interface ConselhoGeralItemProps {
  id: number
  name: string
  students: number
  time: string
  color: string
  status: string
}

export function ConselhoGeralItem({ id, name, students, time, color, status }: ConselhoGeralItemProps) {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-md bg-[#003366] text-white h-[180px]">
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
      <div className="absolute bottom-2 right-2">
        {status === "active" ? (
          <CheckCircle className="h-6 w-6 text-green-500" />
        ) : (
          <Clock className="h-6 w-6 text-yellow-500" />
        )}
      </div>
    </div>
  )
}
