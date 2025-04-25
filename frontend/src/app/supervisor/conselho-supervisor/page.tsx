"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/header"
import { ChevronLeft } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import { ViewModeToggle } from "@/components/view-mode-toggle"
import { ViewTypeToggle } from "@/components/view-type-toggle"
import { ProfessorItemSupervisor } from "@/components/professor-item-supervisor"
import { ProfessorListSupervisor } from "@/components/professor-list-supervisor"
import { ClassItemSupervisor } from "@/components/class-item-supervisor"
import { ClassListSupervisor } from "@/components/class-list-supervisor"
import Link from "next/link"

// Professor types and colors
interface Professor {
  id: number
  name: string
  department: string
  hours: number
  photoUrl: string | null
  color: string
  initials?: string
}

const professorColors = [
  "#B6B881","#D88C7E","#A58D64","#9F70AB","#AF878D","#8795BA","#9F93D0","#8A6FBA","#B5B681","#BE7DDB",
  "#907D78","#B7A4D4","#8FA76C","#94C36B","#C46694","#7866AD","#DCDA90","#C1D3B4","#9A9ED2","#AFD8AB",
  "#C8CDC4","#CFBDDB","#657BCF","#99BDAF","#CC78CF","#D393A6","#D675B6","#A680CA","#897DAB","#767D88",
  "#78CA8E","#B985AA","#6B80AD","#A39790","#856688","#A8D46C","#C4BA73","#9BC7DB","#DABDD6","#748F97",
  "#C8ABAC","#CBAEC3","#9D98BC","#D0D08B","#87CF75","#6BBA7A","#A7B890","#A36CAE","#65A1AC","#BA9076",
  "#CC839B","#D2BFB2","#7F8AA0","#DCA4C4","#81A3C6","#99C471","#80988A","#C1AE6B","#65767E","#9176C8",
  "#8AA7A7","#64CB9E","#666BAC","#C4808A","#DCB18F","#9D79BD","#9B7287","#7FB970","#A6987A","#A097C9",
]

// Class types and colors
interface ClassItemType {
  id: number
  name: string
  students: number
  time: string
  color: string
  course?: string
  fullTime?: string
  shift?: string
  hoursLoad?: string
}

const classColors = professorColors

// Helper functions
const getRandomColor = () => {
  return professorColors[Math.floor(Math.random() * professorColors.length)]
}

export default function ConselhoSupervisorPage() {
  // Common state
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [activeView, setActiveView] = useState<"professores" | "turmas">("professores")

  // Professor state
  const [professorList, setProfessorList] = useState<Professor[]>([
    { id: 11, name: "Romário Hornburg", department: "Java", hours: 10, photoUrl: null, color: getRandomColor() },
    { id: 12, name: "Kristian Erdmann", department: "Frontend", hours: 12, photoUrl: null, color: getRandomColor() },
    { id: 13, name: "Rodrigo Hagstrom", department: "Testes", hours: 8, photoUrl: null, color: getRandomColor() },
    {
      id: 14,
      name: "Andréia da Silva",
      department: "Desempenho social",
      hours: 4,
      photoUrl: null,
      color: getRandomColor(),
    },
    {
      id: 15,
      name: "João Pedro da Silva",
      department: "Data Science",
      hours: 10,
      photoUrl: null,
      color: getRandomColor(),
    },
    {
      id: 16,
      name: "Peterson Macedo",
      department: "Banco de Dados",
      hours: 16,
      photoUrl: null,
      color: getRandomColor(),
    },
  ])

  // Classes state
  const [classList, setClassList] = useState<ClassItemType[]>([
    { id: 11, name: "MI-74 PSIN 2023/1", students: 20, time: "9:00 AM", color: getRandomColor() },
    { id: 12, name: "MQ-75 PSIN 2024/2", students: 25, time: "10:00 AM", color: getRandomColor() },
    { id: 13, name: "JB-76 PSIN 2023/2", students: 22, time: "4:00 PM", color: getRandomColor() },
    { id: 14, name: "MI-75 PSIN 2023/2", students: 26, time: "11:00 PM", color: getRandomColor() },
    { id: 15, name: "FG-75 PSIN 2023/2", students: 23, time: "9:00 AM", color: getRandomColor() },
    { id: 16, name: "TP-74 PSIN 2023/2", students: 26, time: "12:00 AM", color: getRandomColor() },
    { id: 17, name: "FA-73 PSIN 2023/2", students: 21, time: "6:00 PM", color: getRandomColor() },
    { id: 18, name: "FA-78 PSIN 2023/2", students: 18, time: "10:00 AM", color: getRandomColor() },
  ])

  // Common handlers
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  // Filter data based on search term
  const filteredProfessors = professorList.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredClasses = classList.filter((item) => item.name?.toLowerCase().includes(searchTerm.toLowerCase()))

  // Get page title based on active view
  const getPageTitle = () => {
    return activeView === "professores" ? "VER PROFESSORES" : "VER TURMAS"
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="p-4 md:p-6 flex-1 ml-2 md:ml-6 lg:ml-10 mr-2 md:mr-6 lg:mr-10 mt-8">
        <div className="flex items-center mb-6 px-4">
          <Link href="/supervisor/inicio-conselhos-supervisor" className="text-[#003366] mr-4">
            <ChevronLeft className="chevron" size={28} strokeWidth={2.5} />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#003366] uppercase border-b-2 border-[#003366] pb-1">
            {getPageTitle()}
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center mb-6 gap-4 px-4 justify-between">
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto ml-4">
          <ViewTypeToggle activeView={activeView} onViewChange={setActiveView} />
        </div>

        {/* Professors View */}
        {activeView === "professores" && (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-4 mt-8">
                {filteredProfessors.map((professor) => (
                  <ProfessorItemSupervisor
                    key={professor.id}
                    id={professor.id}
                    name={professor.name}
                    department={professor.department}
                    hours={professor.hours}
                    photoUrl={professor.photoUrl}
                    color={professor.color}
                  />
                ))}
              </div>
            ) : (
              <div className="px-4 mt-8">
                <ProfessorListSupervisor professors={filteredProfessors} />
              </div>
            )}
          </>
        )}

        {/* Classes View */}
        {activeView === "turmas" && (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-4 mt-8">
                {filteredClasses.map((classItem) => (
                  <ClassItemSupervisor
                    key={classItem.id}
                    id={classItem.id}
                    name={classItem.name}
                    students={classItem.students}
                    time={classItem.time}
                    color={classItem.color}
                  />
                ))}
              </div>
            ) : (
              <div className="px-4 mt-8">
                <ClassListSupervisor classes={filteredClasses} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
