"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Header from "@/components/header"
import { ChevronLeft } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { ViewModeToggle } from "@/components/view-mode-toggle"
import { TurmasTeacherItem } from "@/components/turmas-teacher-item"
import { TurmasTeacherList } from "@/components/turmas-teacher-list"
import Link from "next/link"

const classColors = [
  "#B6B881","#D88C7E","#A58D64","#9F70AB","#AF878D","#8795BA","#9F93D0","#8A6FBA",
  "#B5B681","#BE7DDB","#907D78","#B7A4D4","#8FA76C","#94C36B","#C46694","#7866AD",
  "#DCDA90","#C1D3B4","#9A9ED2","#AFD8AB","#C8CDC4","#CFBDDB","#657BCF","#99BDAF",
  "#CC78CF","#D393A6","#D675B6","#A680CA","#897DAB","#767D88","#78CA8E","#B985AA",
  "#6B80AD","#A39790","#856688","#A8D46C","#C4BA73","#9BC7DB","#DABDD6","#748F97",
  "#C8ABAC","#CBAEC3","#9D98BC","#D0D08B","#87CF75","#6BBA7A","#A7B890","#A36CAE",
  "#65A1AC","#BA9076","#CC839B","#D2BFB2","#7F8AA0","#DCA4C4","#81A3C6","#99C471",
  "#80988A","#C1AE6B","#65767E","#9176C8","#8AA7A7","#64CB9E","#666BAC","#C4808A",
  "#DCB18F","#9D79BD","#9B7287","#7FB970","#A6987A","#A097C9",
]

const getRandomColor = () => {
  return classColors[Math.floor(Math.random() * classColors.length)]
}

const initialClassData = [
  { id: 1, name: "MI-74 PSIN 2023/1", students: 21, time: "13:40-22:00", status: "active" },
  { id: 2, name: "MQ-75 PSIN 2024/2", students: 21, time: "13:40-22:00", status: "pending" },
  { id: 3, name: "JB-76 PSIN 2023/2", students: 21, time: "13:40-22:00", status: "pending" },
  { id: 4, name: "MI-75 PSIN 2023/2", students: 21, time: "13:40-22:00", status: "active" },
  { id: 5, name: "FG-75 PSIN 2023/2", students: 21, time: "13:40-22:00", status: "pending" },
  { id: 6, name: "TP-74 PSIN 2023/2", students: 21, time: "13:40-22:00", status: "active" },
  { id: 7, name: "FA-73 PSIN 2023/2", students: 21, time: "13:40-22:00", status: "pending" },
  { id: 8, name: "FA-78 PSIN 2023/2", students: 21, time: "13:40-22:00", status: "pending" },
]

type ViewMode = "grid" | "list"

export default function TurmasTeacherPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [classList, setClassList] = useState<
    { id: number; name: string; students: number; time: string; color: string; status: string }[]
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

  const filteredClasses = classList.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="p-4 md:p-6 flex-1 ml-2 md:ml-6 lg:ml-10 mr-2 md:mr-6 lg:mr-10 mt-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 px-4">
          <div className="flex items-center">
            <Link href="/teacher/inicio-teacher" className="text-[#003366] mr-4">
              <ChevronLeft className="chevron" size={28} strokeWidth={2.5} />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#003366] uppercase pb-1 border-b-2 border-[#003366] w-fit">
              TURMAS
            </h1>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center mb-6 gap-4 px-4 justify-between">
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-4 mt-8">
            {filteredClasses.map((item) => (
              <TurmasTeacherItem
                key={item.id}
                id={item.id}
                name={item.name}
                students={item.students}
                time={item.time}
                color={item.color}
                status={item.status}
              />
            ))}
          </div>
        ) : (
          <div className="px-4 mt-8">
            <TurmasTeacherList classes={filteredClasses} />
          </div>
        )}
      </div>
    </div>
  )
}
