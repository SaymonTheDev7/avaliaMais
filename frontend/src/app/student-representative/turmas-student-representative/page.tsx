"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Header from "@/components/header-student-representative"
import { ChevronLeft } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { ViewModeToggle } from "@/components/view-mode-toggle"
import { AlunosTurmasList } from "@/components/alunos-turmas-list"
import { AlunosTurmasItem } from "@/components/alunos-turmas-item"
import Link from "next/link"

const classColors = [
  "#B6B881","#D88C7E","#A58D64","#9F70AB","#AF878D","#8795BA","#9F93D0","#8A6FBA","#B5B681","#BE7DDB","#907D78","#B7A4D4",
]

const getRandomColor = () => {
  return classColors[Math.floor(Math.random() * classColors.length)]
}

const initialClassData = [
  { id: 1, name: "MI-74 PSIN 2023/1", students: 21, time: "13:40-22:00", status: "active", current: true },
  { id: 2, name: "MQ-75 PSIN 2023/2", students: 21, time: "13:40-22:00", status: "pending", current: false },
  { id: 3, name: "JB-76 PSIN 2022/1", students: 21, time: "13:40-22:00", status: "pending", current: false },
  { id: 4, name: "MI-75 PSIN 2021/2", students: 21, time: "13:40-22:00", status: "active", current: false },
  { id: 5, name: "FG-75 PSIN 2020/2", students: 21, time: "13:40-22:00", status: "pending", current: false },
]

type ViewMode = "grid" | "list"

export default function ConselhoGeralPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [classList, setClassList] = useState<
    { id: number; name: string; students: number; time: string; color: string; status: string; current: boolean }[]
  >([])
  const [viewMode, setViewMode] = useState<ViewMode>("grid")

  useEffect(() => {
    const savedClasses = initialClassData.map((item) => {
      const key = `classColor-${item.id}`
      const savedColor = localStorage.getItem(key)
      const color = savedColor || getRandomColor()

      if (!savedColor) {
        localStorage.setItem(key, color)
      }

      return { ...item, color }
    })

    setClassList(savedClasses)
  }, [])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleRemoveClass = (id: number) => {
    setClassList(classList.filter((item) => item.id !== id))
  }

  const filteredClasses = classList.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="p-4 md:p-6 flex-1 ml-2 md:ml-6 lg:ml-10 mr-2 md:mr-6 lg:mr-10 mt-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 px-4">
          <div className="flex items-center">
            <Link href="/student-representative/inicio-student-representative" className="text-[#003366] mr-4">
              <ChevronLeft className="chevron" size={28} strokeWidth={2.5} />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#003366] uppercase pb-1 border-b-2 border-[#003366] w-fit">
              TURMAS
            </h1>
          </div>
        </div>

        {/* Botão centralizado para telas pequenas */}
        <div className="flex justify-center mb-4 sm:hidden">
          <button className="bg-[#003366] hover:bg-[#005099] text-white px-4 py-2 rounded-md text-lg transition duration-200 w-4/5 max-w-xs">
            Finalizar conselho
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center mb-6 gap-4 px-4 justify-between">
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>

        {/* Seção destacando a turma atual */}
        <div className="mb-8 px-4">
          <h2 className="text-xl font-semibold text-[#003366] mb-4">MINHA TURMA ATUAL</h2>
          {classList.filter(c => c.current).length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {classList
                  .filter(c => c.current)
                  .map((item) => (
                    <AlunosTurmasItem
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      students={item.students}
                      time={item.time}
                      color={item.color}
                      current={true}
                    />
                  ))}
              </div>
            ) : (
              <AlunosTurmasList classes={classList.filter(c => c.current)} highlightCurrent />
            )
          ) : (
            <p className="text-gray-500">Nenhuma turma atual selecionada</p>
          )}
        </div>

        {/* Seção para todas as turmas */}
        <div className="px-4">
          <h2 className="text-xl font-semibold text-[#003366] mb-4">TODAS AS MINHAS TURMAS</h2>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {filteredClasses
                .filter(c => !c.current)
                .map((item) => (
                  <AlunosTurmasItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    students={item.students}
                    time={item.time}
                    color={item.color}
                    current={false}
                  />
                ))}
            </div>
          ) : (
            <AlunosTurmasList classes={filteredClasses} />
          )}
        </div>
      </div>
    </div>
  )
}