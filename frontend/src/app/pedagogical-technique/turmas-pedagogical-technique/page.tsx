"use client"

import React, { useState, useEffect } from "react"
import Header from "@/components/header"
import { ChevronLeft } from "lucide-react"
import { SearchBar } from "@/components/search-bar"
import ClassItem from "@/components/class-item"
import { ClassList } from "@/components/class-list"
import { AddButton } from "@/components/add-button"
import { ViewModeToggle } from "@/components/view-mode-toggle"
import AdicionarButton from "@/components/adicionar-button"
import { PopupDados } from "@/components/popup-dados-turma"
import Link from "next/link"

// Define the class item type directly in this file
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

const classColors = [
  "#B6B881", "#D88C7E", "#A58D64", "#9F70AB", "#AF878D", "#8795BA", "#9F93D0", "#8A6FBA",
  "#B5B681", "#BE7DDB", "#907D78", "#B7A4D4", "#8FA76C", "#94C36B", "#C46694", "#7866AD",
  "#DCDA90", "#C1D3B4", "#9A9ED2", "#AFD8AB", "#C8CDC4", "#CFBDDB", "#657BCF", "#99BDAF",
  "#CC78CF", "#D393A6", "#D675B6", "#A680CA", "#897DAB", "#767D88", "#78CA8E", "#B985AA",
  "#6B80AD", "#A39790", "#856688", "#A8D46C", "#C4BA73", "#9BC7DB", "#DABDD6", "#748F97",
  "#C8ABAC", "#CBAEC3", "#9D98BC", "#D0D08B", "#87CF75", "#6BBA7A", "#A7B890", "#A36CAE",
  "#65A1AC", "#BA9076", "#CC839B", "#D2BFB2", "#7F8AA0", "#DCA4C4", "#81A3C6", "#99C471",
  "#80988A", "#C1AE6B", "#65767E", "#9176C8", "#8AA7A7", "#64CB9E", "#666BAC", "#C4808A",
  "#DCB18F", "#9D79BD", "#9B7287", "#7FB970", "#A6987A", "#A097C9",
]

const getRandomColor = () => {
  return classColors[Math.floor(Math.random() * classColors.length)]
}


const availableCourses = [
  { name: "Desenvolvimento Web", hoursLoad: "120h" },
  { name: "Programação em Java", hoursLoad: "80h" },
  { name: "Banco de Dados", hoursLoad: "60h" },
  { name: "Design UX/UI", hoursLoad: "90h" },
  { name: "Marketing Digital", hoursLoad: "70h" },
  { name: "Gestão de Projetos", hoursLoad: "100h" },
  { name: "Inglês Técnico", hoursLoad: "60h" },
  { name: "Redes de Computadores", hoursLoad: "80h" },
  { name: "Inteligência Artificial", hoursLoad: "120h" },
  { name: "Segurança da Informação", hoursLoad: "90h" },
]

const fieldLabels = {
  course: "Curso",
  hoursLoad: "Carga horária",
  name: "Nome da turma",
  students: "Quantidade de alunos",
  shift: "Turno",
  fullTime: "Horário detalhado",
  createButton: "Criar Turma",
  cancelButton: "Cancelar",
  confirmButton: "Confirmar",
  doneButton: "Concluído",
  popupTitle: "Detalhes da Turma",
  newClassTitle: "Nova Turma",
  deleteButton: "Excluir Turma",
  cancelConfirmTitle: "Descartar alterações",
  cancelConfirmMessage: "Tem certeza que deseja descartar as alterações feitas?",
  cancelConfirmYes: "Sim, descartar",
  cancelConfirmNo: "Não, continuar editando",
}

const fieldPlaceholders = {
  course: "Selecione um curso",
  name: "Digite o nome da turma",
  students: "0",
  shift: "Selecione o turno",
  fullTime: "Ex: 08:00 - 10:00",
}

export default function VerTurmasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [classList, setClassList] = useState<ClassItemType[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedClass, setSelectedClass] = useState<ClassItemType | null>(null)
  const [isCreatingClass, setIsCreatingClass] = useState(false)

  
  useEffect(() => {
    const storedClasses = localStorage.getItem('classes');
    if (storedClasses) {
      setClassList(JSON.parse(storedClasses));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('classes', JSON.stringify(classList));
  }, [classList]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleRemoveClass = (id: number) => {
    setClassList(classList.filter((item) => item.id !== id))
  }

  const handleAddClass = () => {
    setIsCreatingClass(true)
  }

  const handleCreateClass = (newClassData: ClassItemType) => {
    const newClass = {
      ...newClassData,
      id: Date.now(),
      color: getRandomColor(),
    }

    // Add the new class to the list
    setClassList([...classList, newClass])
    setIsCreatingClass(false)
  }

  const handleClassClick = (classItem: ClassItemType) => {
    setSelectedClass(classItem)
  }

  const closePopup = () => {
    setSelectedClass(null)
    setIsCreatingClass(false)
  }

  const handleUpdateClass = (updatedData: ClassItemType) => {
    // Update the class in the classList state
    const updatedClassList = classList.map((classItem) => {
      if (classItem.id === updatedData.id) {
        return {
          ...updatedData,
          // Ensure we keep the color if it's not in the updated data
          color: updatedData.color || classItem.color,
        }
      }
      return classItem
    })

    setClassList(updatedClassList)
  }

  const filteredClasses = classList.filter((item) => 
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="p-4 md:p-6 flex-1 ml-2 md:ml-6 lg:ml-10 mr-2 md:mr-6 lg:mr-10 mt-8">
        <div className="flex items-center mb-6 px-4">
          <Link href="/pedagogical-technique/inicio-pedagogical-technique" className="text-[#003366] mr-4">
            <ChevronLeft className="chevron" size={28} strokeWidth={2.5} />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#003366] uppercase border-b-2 border-[#003366] pb-1">
            VER TURMAS
          </h1>
        </div>

        <div className="flex items-center mb-6 gap-4 px-4 justify-between">
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <div className="flex gap-2">
            {viewMode === "list" && <AdicionarButton onClick={handleAddClass} />}
            <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-4 mt-8">
            <div onClick={handleAddClass}>
              <AddButton text="Adicionar turma" />
            </div>

            {filteredClasses.map((classItem) => (
              <ClassItem
                key={classItem.id}
                id={classItem.id}
                name={classItem.name}
                students={classItem.students}
                time={classItem.time}
                color={classItem.color}
                onClick={() => handleClassClick(classItem)}
              />
            ))}
          </div>
        ) : (
          <div className="px-4 mt-8">
            <ClassList classes={filteredClasses} onRemoveClass={handleRemoveClass} onClassClick={handleClassClick} />
          </div>
        )}
      </div>

      {selectedClass && (
        <PopupDados
          classData={selectedClass}
          onClose={closePopup}
          onUpdate={handleUpdateClass}
          onDelete={handleRemoveClass}
          fieldLabels={fieldLabels}
          fieldPlaceholders={fieldPlaceholders}
          availableCourses={availableCourses}
        />
      )}

      {isCreatingClass && (
        <PopupDados
          onClose={closePopup}
          onCreate={handleCreateClass}
          isCreating={true}
          fieldLabels={fieldLabels}
          fieldPlaceholders={fieldPlaceholders}
          availableCourses={availableCourses}
        />
      )}
    </div>
  )
}