"use client"

import { useState, useEffect } from "react"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header-student"
import { ConselhoCard } from "@/components/conselho-card-student"

interface Conselho {
  id: number
  date: string
  status: "active" | "completed"
  participantes: number
}

const HistoricoConselhosPage = () => {
  const [conselhos, setConselhos] = useState<Conselho[]>([])

  useEffect(() => {
    // Dados mockados - substitua por sua chamada API ou dados reais
    const initialData: Conselho[] = [
      { 
        id: 1, 
        date: "15/03/2024", 
        status: "active",
        participantes: 28
      },
      { 
        id: 2, 
        date: "10/02/2024", 
        status: "completed",
        participantes: 30
      },
      { 
        id: 3, 
        date: "20/01/2024", 
        status: "completed",
        participantes: 25
      },
    ]
    
    setConselhos(initialData)
  }, [])

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="p-4 md:p-6 flex-1 ml-2 md:ml-6 lg:ml-10 mr-2 md:mr-6 lg:mr-10 mt-8">
        <div className="flex items-center mb-6">
          <Link href="/student-representative/turmas-student-representative" className="text-[#003366] mr-4">
            <ChevronLeft size={28} strokeWidth={2.5} />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#003366] uppercase border-b-2 border-[#003366] pb-1">
            CONSELHOS | MI-74 PSIN 2023/1
          </h1>
        </div>

        {/* Área de cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {conselhos.map(conselho => (
            <ConselhoCard
              key={conselho.id}
              id={conselho.id}
              date={conselho.date}
              status={conselho.status}
              participantes={conselho.participantes}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HistoricoConselhosPage