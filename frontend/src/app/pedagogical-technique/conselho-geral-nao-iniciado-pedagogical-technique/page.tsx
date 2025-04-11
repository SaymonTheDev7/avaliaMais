"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Header from "@/components/header"
import { ChevronLeft } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { ViewModeToggle } from "@/components/view-mode-toggle"

type ViewMode = "grid" | "list"

export default function ConselhoGeralPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [hasActiveCouncils, setHasActiveCouncils] = useState(false)

  useEffect(() => {
    setHasActiveCouncils(false)
  }, [])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="p-4 md:p-6 flex-1 ml-2 md:ml-6 lg:ml-10 mr-2 md:mr-6 lg:mr-10 mt-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 px-4">
          <div className="flex items-center">
            <a href="#" className="text-[#003366] mr-4">
              <ChevronLeft className="chevron" size={28} strokeWidth={2.5} />
            </a>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#003366] uppercase pb-1 border-b-2 border-[#003366] w-fit">
              CONSELHO GERAL
            </h1>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center mb-6 gap-4 px-4 justify-between">
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>

        {!hasActiveCouncils ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <p className="text-center text-lg mb-4">
              Nenhum conselho está acontecendo, caso queira iniciar um clique no botão abaixo.
            </p>
            <button className="bg-[#003366] hover:bg-[#005099] text-white px-8 py-2 rounded-md text-lg transition duration-200">
              Iniciar conselho
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <p className="text-center text-lg mb-4">
              Nenhum conselho ativo no momento.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
