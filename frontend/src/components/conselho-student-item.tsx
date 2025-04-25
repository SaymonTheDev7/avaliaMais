"use client"

import { Users } from "lucide-react"
import Link from "next/link"

interface ConselhoItemProps {
  id: number
  date: string
  participantes?: number
  isActive?: boolean
}

export function ConselhoItem({ 
  id, 
  date, 
  participantes = Math.floor(Math.random() * 20) + 5,
  isActive = false
}: ConselhoItemProps) {
  return (
    <Link href={`/conselho/${id}`}>
      <div className={`relative rounded-xl overflow-hidden shadow-md bg-[#003366] text-white h-[180px] transition-all
        ${isActive ? 'ring-4 ring-[#00C853]' : 'hover:shadow-lg'}`}>
        <div className="h-20 bg-[#0078D4]"></div>
        <div className="p-4 mt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-bold truncate">
              <span className="font-medium text-base block">Conselho</span>
              <span className="ml-1">{date}</span>
            </h3>
            <div className="flex items-center text-base">
              <Users className="mr-1 h-4 sm:h-5 w-4 sm:w-5" />
              <span>{participantes}</span>
            </div>
          </div>
        </div>
        
        {/* Indicador de status (opcional) */}
        {isActive && (
          <div className="absolute top-2 right-2 bg-[#00C853] text-white px-2 py-1 rounded-full text-xs">
            Ativo
          </div>
        )}
      </div>
    </Link>
  )
}