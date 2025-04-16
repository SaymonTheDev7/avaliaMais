"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Header from "@/components/header"
import { ChevronLeft } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { ViewModeToggle } from "@/components/view-mode-toggle"
import { ConselhoItem } from "@/components/conselho-item"
import { ConselhoList } from "@/components/conselho-list"
import Link from "next/link"

interface Conselho {
  id: number
  date: string
}

export default function HistoricoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [conselhoList, setConselhoList] = useState<Conselho[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    // Dados iniciais de exemplo
    const initialConselhos: Conselho[] = [
      { id: 1, date: "03/01/2025" },
      { id: 2, date: "12/12/2024" },
      { id: 3, date: "07/06/2024" },
      { id: 4, date: "17/02/2024" },
      { id: 5, date: "16/12/2023" },
      { id: 6, date: "28/06/2023" },
      { id: 7, date: "30/01/2023" },
      { id: 8, date: "14/12/2022" },
    ]
    setConselhoList(initialConselhos)
  }, [])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const filteredConselhos = conselhoList.filter((item) => item.date.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="p-4 md:p-6 flex-1 ml-2 md:ml-6 lg:ml-10 mr-2 md:mr-6 lg:mr-10 mt-8">
        <div className="flex items-center mb-6 px-4">
          <Link href="/pedagogical-technique/inicio-pedagogical-technique" className="text-[#003366] mr-4">
            <ChevronLeft className="chevron" size={28} strokeWidth={2.5} />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#003366] uppercase border-b-2 border-[#003366] pb-1">
            HISTÓRICO
          </h1>
        </div>

        <div className="flex items-center mb-6 gap-4 px-4 justify-between">
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <div className="flex gap-2">
            <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mt-8">
            {filteredConselhos.map((conselho) => (
              <ConselhoItem key={conselho.id} id={conselho.id} date={conselho.date} />
            ))}
          </div>
        ) : (
          <div className="px-4 mt-8">
            <ConselhoList conselhos={filteredConselhos} />
          </div>
        )}
      </div>
    </div>
  )
}
