"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Header from "@/components/header-administrator"
import { ChevronLeft } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { ViewModeToggle } from "@/components/view-mode-toggle"
import { PedagogicalItem } from "@/components/pedagogical-item"
import { PedagogicalList } from "@/components/pedagogical-list"
import { AddButton } from "@/components/add-button"
import AdicionarButton from "@/components/adicionar-button"
import Link from "next/link"

const pedagogicalColors = [
  "#B6B881","#D88C7E","#A58D64","#9F70AB","#AF878D","#8795BA","#9F93D0",
  "#8A6FBA","#B5B681","#BE7DDB","#907D78","#B7A4D4","#8FA76C","#94C36B",
  "#C46694","#7866AD","#DCDA90","#C1D3B4","#9A9ED2","#AFD8AB","#C8CDC4",
  "#CFBDDB","#657BCF","#99BDAF","#CC78CF","#D393A6","#D675B6","#A680CA",
  "#897DAB","#767D88","#78CA8E","#B985AA","#6B80AD","#A39790","#856688",
  "#A8D46C","#C4BA73","#9BC7DB","#DABDD6","#748F97","#C8ABAC","#CBAEC3",
  "#9D98BC","#D0D08B","#87CF75","#6BBA7A","#A7B890","#A36CAE","#65A1AC",
  "#BA9076","#CC839B","#D2BFB2","#7F8AA0","#DCA4C4","#81A3C6","#99C471",
  "#80988A","#C1AE6B","#65767E","#9176C8","#8AA7A7","#64CB9E","#666BAC",
  "#C4808A","#DCB18F","#9D79BD","#9B7287","#7FB970","#A6987A","#A097C9",
]

const getRandomColor = () => {
  return pedagogicalColors[Math.floor(Math.random() * pedagogicalColors.length)]
}

interface Pedagogical {
  id: number
  name: string
  position: string
  hours: number
  photoUrl: string | null
  initials?: string
  color: string
}

export default function VerPedagogicoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [pedagogicalList, setPedagogicalList] = useState<Pedagogical[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    const storedPedagogicals = localStorage.getItem("pedagogicals")
    if (storedPedagogicals) {
      setPedagogicalList(JSON.parse(storedPedagogicals))
    } else {
      const sampleData: Pedagogical[] = []
      setPedagogicalList(sampleData)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("pedagogicals", JSON.stringify(pedagogicalList))
  }, [pedagogicalList])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleRemovePedagogical = (id: number) => {
    setPedagogicalList(pedagogicalList.filter((item) => item.id !== id))
  }

  const handleAddPedagogical = () => {
    const newId = Date.now() // Generate a unique ID
    const newColor = getRandomColor()
    const newPedagogical: Pedagogical = {
      id: newId,
      name: "Novo Pedagógico",
      position: "Cargo",
      hours: 20,
      photoUrl: "https://tryeasel.dev/placeholder.svg?width=60&height=60",
      color: newColor,
    }
    setPedagogicalList([...pedagogicalList, newPedagogical])
  }

  const filteredPedagogicals = pedagogicalList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="p-4 md:p-6 flex-1 ml-2 md:ml-6 lg:ml-10 mr-2 md:mr-6 lg:mr-10 mt-8">
        <div className="flex items-center mb-6 px-4">
          <Link href="/administrator/inicio-administrator" className="text-[#003366] mr-4">
            <ChevronLeft className="chevron" size={28} strokeWidth={2.5} />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#003366] uppercase border-b-2 border-[#003366] pb-1">
            VER PEDAGÓGICO
          </h1>
        </div>

        <div className="flex items-center mb-6 gap-4 px-4 justify-between">
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <div className="flex gap-2">
            {viewMode === "list" && <AdicionarButton />}
            <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-4 mt-8">
            <div onClick={handleAddPedagogical}>
              <AddButton text="Adicionar pedagógico" />
            </div>

            {filteredPedagogicals.map((pedagogical) => (
              <PedagogicalItem
                key={pedagogical.id}
                id={pedagogical.id}
                name={pedagogical.name}
                position={pedagogical.position}
                hours={pedagogical.hours}
                photoUrl={pedagogical.photoUrl}
                color={pedagogical.color}
                onRemovePedagogical={handleRemovePedagogical}
              />
            ))}
          </div>
        ) : (
          <div className="px-4 mt-8">
            <PedagogicalList pedagogicals={filteredPedagogicals} onRemovePedagogical={handleRemovePedagogical} />
          </div>
        )}
      </div>
    </div>
  )
}
