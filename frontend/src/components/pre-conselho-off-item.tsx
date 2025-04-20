"use client"

import { User, AlertCircle } from "lucide-react"

interface PreConselhoOffItemProps {
  id: number
  name: string
  students: number
  time: string
  color: string
  status: string
}

export function PreConselhoOffItem({ id, name, students, time, color, status }: PreConselhoOffItemProps) {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-md bg-gray-500 text-white h-[180px]">
      <div className="h-20" style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}></div>
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
        <div className="bg-red-500 rounded-full w-6 h-6 flex items-center justify-center">
          <AlertCircle className="h-4 w-4 text-white" />
        </div>
      </div>
    </div>
  )
}
