"use client"

import { CheckCircle, Clock, Users } from "lucide-react"
import Link from "next/link"

interface ConselhoCardProps {
  id: number
  date: string
  status: "active" | "completed"
  participantes: number
  isActive?: boolean
}

export function ConselhoCard({
  id,
  date,
  status,
  participantes,
  isActive = false
}: ConselhoCardProps) {
  return (
    <div 
      className={`relative rounded-xl overflow-hidden shadow-md bg-[#003366] text-white h-[180px] transition-all cursor-pointer
        ${isActive ? 'ring-4 ring-[#00C853]' : 'hover:shadow-lg'}`}
    >
      {/* Header colorido por status */}
      <div className={`h-20 ${status === 'active' ? 'bg-blue-500' : 'bg-gray-500'}`}></div>
      
      {/* Conteúdo principal */}
      <div className="p-4 mt-2">
        <h3 className="text-xl font-bold truncate">
          Conselho {date}
        </h3>
        
        <div className="flex items-center mt-4">
          <Users className="mr-2 h-5 w-5" />
          <span>{participantes} participantes</span>
        </div>
      </div>
      
      {/* Ícone de status */}
      <div className="absolute top-3 right-3">
        {status === "active" ? (
          <Clock className="h-6 w-6 text-yellow-400" />
        ) : (
          <CheckCircle className="h-6 w-6 text-green-400" />
        )}
      </div>
      
      {/* Badge de ativo */}
      {isActive && (
        <div className="absolute top-2 left-2 bg-[#00C853] text-white px-2 py-1 rounded-full text-xs">
          Selecionado
        </div>
      )}
    </div>
  )
}