"use client"

import { Calendar, Info, Users } from "lucide-react"
import Link from "next/link"

interface ConselhoListProps {
  conselhos: {
    id: number
    date: string
    participantes?: number
    isActive?: boolean
  }[]
}

export function ConselhoList({ conselhos }: ConselhoListProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Cabeçalho da tabela (desktop) */}
      <div className="hidden md:grid grid-cols-12 bg-gray-100 py-4 font-semibold text-[#003366]">
        <div className="col-span-1"></div>
        <div className="col-span-4 px-4">Conselho</div>
        <div className="col-span-4 px-4">Data</div>
        <div className="col-span-3 px-4">Participantes</div>
      </div>

      {/* Linhas da tabela */}
      {conselhos.map((conselho, index) => {
        const participantes = conselho.participantes || Math.floor(Math.random() * 20) + 5
        
        return (
          <Link href={`/conselho/${conselho.id}`} key={conselho.id}>
            <div
              className={`grid grid-cols-1 md:grid-cols-12 py-4 items-center transition-colors
                ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                ${conselho.isActive ? 'bg-blue-50' : 'hover:bg-gray-100'}`}
            >
              {/* Visualização mobile */}
              <div className="md:hidden p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#003366] text-white mr-3">
                      <Info className="h-5 w-5" />
                    </div>
                    <h3 className="font-medium">Conselho</h3>
                  </div>
                  {conselho.isActive && (
                    <span className="bg-[#00C853] text-white text-xs px-2 py-1 rounded-full">
                      Ativo
                    </span>
                  )}
                </div>
                <div className="mt-3 pl-13 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-[#003366]" />
                    <span>{conselho.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-[#003366]" />
                    <span>{participantes} part.</span>
                  </div>
                </div>
              </div>

              {/* Visualização desktop */}
              <div className="hidden md:flex md:col-span-1 justify-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#003366] text-white">
                  <Info className="h-5 w-5" />
                </div>
              </div>
              <div className="hidden md:flex md:col-span-4 px-4 items-center">
                <span className="font-medium">Conselho</span>
                {conselho.isActive && (
                  <span className="ml-2 bg-[#00C853] text-white text-xs px-2 py-1 rounded-full">
                    Ativo
                  </span>
                )}
              </div>
              <div className="hidden md:flex md:col-span-4 px-4 items-center">
                <Calendar className="mr-2 h-4 w-4 text-[#003366]" />
                <span>{conselho.date}</span>
              </div>
              <div className="hidden md:flex md:col-span-3 px-4 items-center">
                <Users className="mr-2 h-4 w-4 text-[#003366]" />
                <span>{participantes}</span>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}