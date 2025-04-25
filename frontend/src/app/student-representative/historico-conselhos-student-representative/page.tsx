"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Header from "@/components/header-student-representative"
import { ChevronLeft, Trash2 } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { ViewModeToggle } from "@/components/view-mode-toggle"
import { PreConselhoItem } from "@/components/pre-conselho-item"
import { PreConselhoList } from "@/components/pre-conselho-list"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface Conselho {
  id: number
  date: string
  status: "active" | "completed"
  representante: string
  descricao?: string
}

const HistoricoConselhosPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [conselhoList, setConselhoList] = useState<Conselho[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [activeConselho, setActiveConselho] = useState<number | null>(null)

  const loadInitialData = () => {
    const initialConselhos: Conselho[] = [
      { 
        id: 1, 
        date: "03/01/2025", 
        status: "active",
        representante: "Você",
        descricao: "Pré-conselho em andamento - aguardando seu feedback"
      },
      { 
        id: 2, 
        date: "12/12/2024", 
        status: "completed",
        representante: "Maria Oliveira",
        descricao: "Pré-conselho concluído com sucesso - 85% de participação"
      },
      { 
        id: 3, 
        date: "07/06/2024", 
        status: "completed",
        representante: "Carlos Souza",
        descricao: "Pré-conselho finalizado - todas as questões resolvidas"
      },
    ]
    
    localStorage.setItem('preConselhos', JSON.stringify(initialConselhos))
    localStorage.removeItem('preConselhoCompleto')
    localStorage.removeItem('activeConselhoId')
    setConselhoList(initialConselhos)
    setActiveConselho(1)
    toast.success("Dados resetados com sucesso!")
  }

  useEffect(() => {
    const savedConselhos = localStorage.getItem('preConselhos')
    if (savedConselhos) {
      setConselhoList(JSON.parse(savedConselhos))
      setActiveConselho(1)
    } else {
      loadInitialData()
    }
  }, [])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleConselhoClick = (id: number) => {
    setActiveConselho(id)
  }

  const filteredConselhos = conselhoList.filter((item) =>
    item.date.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="p-4 md:p-6 flex-1 ml-2 md:ml-6 lg:ml-10 mr-2 md:mr-6 lg:mr-10 mt-8">
        <div className="flex items-center mb-6 px-4">
          <Link href="/student-representative/turmas-student-representative" className="text-[#003366] mr-4">
            <ChevronLeft className="chevron" size={28} strokeWidth={2.5} />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#003366] uppercase border-b-2 border-[#003366] pb-1">
            PRÉ-CONSELHO | MI-74 PSIN 2023/1
          </h1>
        </div>

        <div className="flex items-center mb-6 gap-4 px-4 justify-between">
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <div className="flex gap-3 items-center">
            <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
            <Button 
              variant="outline" 
              onClick={loadInitialData}
              className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700 px-4 py-2 rounded-md transition-colors duration-200"
            >
              <Trash2 size={18} className="text-red-500" />
              <span className="font-medium">Resetar Dados</span>
            </Button>
          </div>
        </div>

        {activeConselho && (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            {conselhoList.find(c => c.id === activeConselho)?.status === "active" ? (
              <>
                <h2 className="text-xl font-semibold text-[#003366] mb-2">Pré-Conselho Ativo</h2>
                <p className="text-gray-700 mb-4">
                  Este pré-conselho está aguardando seu feedback. Clique no botão abaixo para responder o formulário.
                </p>
                <Link 
                  href="/student-representative/pre-conselho-student-representative"
                  onClick={() => localStorage.setItem('activeConselhoId', activeConselho.toString())}
                >
                  <button className="bg-[#003366] hover:bg-[#005099] text-white px-4 py-2 rounded-md">
                    Responder Formulário
                  </button>
                </Link>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-[#003366] mb-2">Pré-Conselho Concluído</h2>
                <p className="text-gray-700 mb-1">
                  <strong>Representante:</strong> {conselhoList.find(c => c.id === activeConselho)?.representante}
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Descrição:</strong> {conselhoList.find(c => c.id === activeConselho)?.descricao}
                </p>
                <div className="p-3 bg-green-50 text-green-700 rounded-md border border-green-200">
                  Este formulário já foi respondido e não pode mais ser editado.
                </div>
              </>
            )}
          </div>
        )}

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-4 mt-8">
            {filteredConselhos.map((conselho) => (
              <PreConselhoItem
                key={conselho.id}
                id={conselho.id}
                name={`Pré-Conselho ${conselho.date}`}
                students={30}
                time="14:00"
                color={conselho.status === "active" ? "#1e90ff" : "#808080"}
                status={conselho.status}
                date={conselho.date}
                isActive={activeConselho === conselho.id}
                onClick={() => handleConselhoClick(conselho.id)}
              />
            ))}
          </div>
        ) : (
          <div className="px-4 mt-8">
            <PreConselhoList 
              preconselhos={filteredConselhos.map(c => ({
                id: c.id,
                date: c.date,
                status: c.status,
                students: 30,
                time: "14:00"
              }))} 
              activeId={activeConselho}
              onItemClick={handleConselhoClick}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default HistoricoConselhosPage