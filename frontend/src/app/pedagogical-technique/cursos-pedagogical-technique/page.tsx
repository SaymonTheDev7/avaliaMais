"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Header from "@/components/header"
import { ChevronLeft } from "lucide-react"
import axios from "axios"
import { SearchBar } from "@/components/search-bar"
import { useRouter } from "next/navigation"
import { ViewModeToggle } from "@/components/view-mode-toggle"
import AdicionarButton from "@/components/adicionar-button"
import { CourseItem } from "@/components/course-item"
import { CourseList } from "@/components/course-list"
import ErrorToast from "@/components/erro-buscar-curso-toast"
import CorrectToastCurso from "@/components/correct-curso-toast"
import UpdateToastCurso from "@/components/update-curso-toast"
import DeleteToastCurso from "@/components/delete-curso-toast"
import { ToastContainer } from "@/components/toast-container"
import { PopupDadosCursos } from "@/components/popup-dados-curso"

const classColors = [
  "#B6B881",
  "#D88C7E",
  "#A58D64",
  "#9F70AB",
  "#AF878D",
  "#8795BA",
  "#9F93D0",
  "#8A6FBA",
  "#B5B681",
  "#BE7DDB",
  "#557CA3",
  "#425DBB",
]

const getRandomColor = () => {
  return classColors[Math.floor(Math.random() * classColors.length)]
}

// Exportando o tipo para ser usado em outros componentes
export type CourseItemType = {
  id: string
  name: string
  type: string
  workload: number
  color: string
  time?: number // Adicionando o campo time como opcional
}

// Tipo para os dados do curso para o popup
type CourseData = {
  id?: string
  nameCourse: string
  startAndEndLocation: string
  typeCourse: string
  shift: string
  workloadCourse: number
  time: number
  color?: string
}

export default function VerCursosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [courseList, setCourseList] = useState<CourseItemType[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [errorToast, setErrorToast] = useState<{ show: boolean; message: string; id: string }>({
    show: false,
    message: "",
    id: "error-toast",
  })
  const [successToast, setSuccessToast] = useState<{ show: boolean; message: string; id: string }>({
    show: false,
    message: "",
    id: "success-toast",
  })
  const [updateToast, setUpdateToast] = useState<{ show: boolean; message: string; id: string }>({
    show: false,
    message: "",
    id: "update-toast",
  })
  const [deleteToast, setDeleteToast] = useState<{ show: boolean; message: string; id: string }>({
    show: false,
    message: "",
    id: "delete-toast",
  })
  const router = useRouter()

  const [isCreatingCourse, setIsCreatingCourse] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:9090/course/find/all?page=0", {
        withCredentials: true,
      })

      const courses = res.data.content || []

      const updatedCourses: CourseItemType[] = courses.map((item: any) => {
        const key = `courseColor-${item.uuid}`
        let color = localStorage.getItem(key)

        if (!color) {
          color = getRandomColor()
          localStorage.setItem(key, color)
        }

        return {
          id: item.uuid,
          name: item.nameCourse,
          type: item.typeCourse,
          workload: item.workloadCourse,
          time: item.time, // Adicionando o campo time
          color,
        }
      })

      setCourseList(updatedCourses)
      setSuccessToast({
        show: true,
        message: "Cursos carregados com sucesso",
        id: "success-toast-" + Date.now(),
      })
    } catch (err) {
      console.error("Erro ao buscar cursos:", err)
      setErrorToast({
        show: true,
        message: "Erro ao buscar cursos, tente novamente!",
        id: "error-toast-" + Date.now(),
      })
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  // Efeito para atualizar o estado isSearching quando searchTerm mudar
  useEffect(() => {
    // Atualizamos o estado isSearching com base no conteúdo do searchTerm
    const searching = searchTerm.trim().length > 0
    setIsSearching(searching)
  }, [searchTerm])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchTerm(value)
  }

  const filteredCourses = courseList.filter((item) => item.name?.toLowerCase().includes(searchTerm.toLowerCase()))

  // Função para abrir o popup de criação de curso
  const handleAddCourseClick = () => {
    setIsCreatingCourse(true)
  }

  // Função para fechar o popup
  const closePopup = () => {
    setIsCreatingCourse(false)
    setSelectedCourse(null)
  }

  // Função para criar um novo curso
  const handleCreateCourse = async (newCourse: CourseData) => {
    try {
      await axios.post("http://localhost:9090/course/add", newCourse, { withCredentials: true })
      fetchCourses() // Recarregar a lista de cursos
      setSuccessToast({
        show: true,
        message: "Curso adicionado com sucesso",
        id: "success-toast-" + Date.now(),
      })
      closePopup()
    } catch (error) {
      setErrorToast({
        show: true,
        message: "Erro ao adicionar curso, tente novamente!",
        id: "error-toast-" + Date.now(),
      })
    }
  }

  // Função para atualizar um curso existente
  const handleUpdateCourse = async (updatedCourse: CourseData) => {
    try {
      if (updatedCourse.id) {
        // Usando o endpoint correto para atualizar o curso
        await axios.put(`http://localhost:9090/course/update/${updatedCourse.nameCourse}`, updatedCourse, {
          withCredentials: true,
        })
        fetchCourses() // Recarregar a lista de cursos
        setUpdateToast({
          show: true,
          message: "Curso atualizado com sucesso",
          id: "update-toast-" + Date.now(),
        })
        closePopup()
      }
    } catch (error) {
      setErrorToast({
        show: true,
        message: "Erro ao atualizar curso, tente novamente!",
        id: "error-toast-" + Date.now(),
      })
    }
  }

  // Função para excluir um curso
  const handleDeleteCourse = async (id: string) => {
    try {
      // Primeiro, buscar o nome do curso para usar no endpoint de exclusão
      const courseToDelete = courseList.find((course) => course.id === id)
      if (courseToDelete) {
        await axios.delete(`http://localhost:9090/course/delete/${courseToDelete.name}`, {
          withCredentials: true,
        })
        fetchCourses() // Recarregar a lista de cursos
        closePopup()
        setDeleteToast({
          show: true,
          message: "Curso excluído com sucesso",
          id: "delete-toast-" + Date.now(),
        })
      }
    } catch (error) {
      setErrorToast({
        show: true,
        message: "Erro ao excluir curso, tente novamente!",
        id: "error-toast-" + Date.now(),
      })
    }
  }

  // Função para abrir o popup de detalhes do curso
  const handleCourseClick = (course: CourseItemType) => {
    // Buscar detalhes completos do curso usando o endpoint findByUuid
    axios
      .get(`http://localhost:9090/course/findByUuid/${course.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        const courseData = res.data
        setSelectedCourse({
          id: courseData.uuid,
          nameCourse: courseData.nameCourse,
          startAndEndLocation: courseData.startAndEndLocation || "",
          typeCourse: courseData.typeCourse || "",
          shift: courseData.shift || "",
          workloadCourse: courseData.workloadCourse || 0,
          time: courseData.time || 0,
          color: course.color,
        })
      })
      .catch((err) => {
        console.error("Erro ao buscar detalhes do curso:", err)
        setErrorToast({
          show: true,
          message: "Erro ao buscar detalhes do curso, tente novamente!",
          id: "error-toast-" + Date.now(),
        })
      })
  }

  // Configuração de labels para o popup
  const fieldLabels = {
    nameCourse: "Nome do curso",
    startAndEndLocation: "Local e Data",
    typeCourse: "Tipo de Curso",
    shift: "Turno",
    workloadCourse: "Carga Horária",
    time: "Tempo (em meses)",
    createButton: "Criar Curso",
    cancelButton: "Cancelar",
    confirmButton: "Confirmar",
    doneButton: "Concluído",
    newCourseTitle: "Novo Curso",
    deleteButton: "Excluir Curso",
    cancelConfirmTitle: "Descartar alterações",
    cancelConfirmMessage: "Tem certeza que deseja descartar as alterações feitas?",
    cancelConfirmYes: "Sim, descartar",
    cancelConfirmNo: "Não, continuar editando",
  }

  // Configuração de placeholders para o popup
  const fieldPlaceholders = {
    nameCourse: "Digite o nome do curso",
    startAndEndLocation: "Ex: Sala 101, 01/01/2023 - 01/02/2023",
    typeCourse: "Selecione o tipo",
    shift: "Selecione o turno",
    workloadCourse: "0",
    time: "0",
  }

  const showAddButton = !isSearching

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="p-4 md:p-6 flex-1 ml-2 md:ml-6 lg:ml-10 mr-2 md:mr-6 lg:mr-10 mt-8">
        <div className="flex items-center mb-6 px-4">
          <button onClick={() => router.back()} className="text-[#003366] mr-4">
            <ChevronLeft className="chevron cursor-pointer" size={28} strokeWidth={2.5} />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#003366] uppercase border-b-2 border-[#003366] pb-1">
            VER CURSOS
          </h1>
        </div>

        <div className="flex items-center mb-6 gap-4 px-4 justify-between">
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <div className="flex gap-2">
            {viewMode === "list" && showAddButton && <AdicionarButton onClick={handleAddCourseClick} />}
            <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-4 mt-8">
            {showAddButton && (
              <div
                key="-1"
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#003366] text-white cursor-pointer h-[180px] transition-transform hover:scale-105 active:scale-95"
                onClick={handleAddCourseClick}
              >
                <div className="rounded-full p-4 mb-2">
                  <div className="text-4xl sm:text-5xl font-bold">+</div>
                </div>
                <div className="font-medium text-xl sm:text-2xl text-center">Adicionar curso</div>
              </div>
            )}
            {filteredCourses.map((item) => (
              <CourseItem
                key={item.id}
                id={item.id}
                name={item.name}
                type={item.type}
                workload={item.workload}
                color={item.color}
                onClick={() => handleCourseClick(item)}
              />
            ))}
          </div>
        ) : (
          <div className="px-4 mt-8">
            <CourseList
              courses={filteredCourses}
              onCourseClick={handleCourseClick}
              onRemoveCourse={(id) => handleDeleteCourse(id)}
            />
          </div>
        )}

        {/* Toast Container para organizar as notificações */}
        <ToastContainer>
          {errorToast.show && (
            <ErrorToast
              key={errorToast.id}
              message={errorToast.message}
              onClose={() => setErrorToast({ ...errorToast, show: false })}
            />
          )}
          {successToast.show && (
            <CorrectToastCurso
              key={successToast.id}
              message={successToast.message}
              onClose={() => setSuccessToast({ ...successToast, show: false })}
            />
          )}
          {updateToast.show && (
            <UpdateToastCurso
              key={updateToast.id}
              message={updateToast.message}
              onClose={() => setUpdateToast({ ...updateToast, show: false })}
            />
          )}
          {deleteToast.show && (
            <DeleteToastCurso
              key={deleteToast.id}
              message={deleteToast.message}
              onClose={() => setDeleteToast({ ...deleteToast, show: false })}
            />
          )}
        </ToastContainer>

        {/* Popup de criação de curso */}
        {isCreatingCourse && (
          <PopupDadosCursos
            onClose={closePopup}
            onCreate={handleCreateCourse}
            isCreating={true}
            fieldLabels={fieldLabels}
            fieldPlaceholders={fieldPlaceholders}
          />
        )}

        {/* Popup de detalhes/edição de curso */}
        {selectedCourse && (
          <PopupDadosCursos
            courseData={selectedCourse}
            onClose={closePopup}
            onUpdate={handleUpdateCourse}
            onDelete={handleDeleteCourse}
            fieldLabels={fieldLabels}
            fieldPlaceholders={fieldPlaceholders}
          />
        )}
      </div>
    </div>
  )
}
