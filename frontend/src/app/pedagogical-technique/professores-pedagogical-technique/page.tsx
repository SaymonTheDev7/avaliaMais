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
import { TeacherItem } from "@/components/teacher-item"
import { TeacherList } from "@/components/teacher-list"
import ErrorToastTeacher from "@/components/erro-buscar-teacher-toast"
import CorrectToastTeacher from "@/components/correct-teacher-toast"
import UpdateToastTeacher from "@/components/update-teacher-toast"
import DeleteToastTeacher from "@/components/delete-teacher-toast"
import { ToastContainer } from "@/components/toast-container"
import { PopupDadosTeachers } from "@/components/popup-dados-teachers"

const teacherColors = [
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
  return teacherColors[Math.floor(Math.random() * teacherColors.length)]
}

// Exportando o tipo para ser usado em outros componentes
export type TeacherItemType = {
  id: string
  name: string
  professionalArea: string
  workShift: string
  photoUrl?: string | null
  color: string
  email?: string
  workloadWeek?: number
}

export default function VerTeachersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [teacherList, setTeacherList] = useState<TeacherItemType[]>([])
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

  const [isCreatingTeacher, setIsCreatingTeacher] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<any | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  // Função para buscar professores
  const fetchTeachers = async () => {
    try {
      // Primeiro, buscar todos os professores
      const res = await axios.get("http://localhost:9090/users/teacher/find-all/teachers?page=0", {
        withCredentials: true,
      })

      // Depois, buscar todos os usuários para obter os nomes
      const authUsersRes = await axios.get("http://localhost:9090/auth/getAll", {
        withCredentials: true,
      })

      const teachers = res.data.content || []
      const authUsers = authUsersRes.data || []

      const updatedTeachers: TeacherItemType[] = teachers.map((item: any) => {
        const key = `teacherColor-${item.uuid}`
        let color = localStorage.getItem(key)

        if (!color) {
          color = getRandomColor()
          localStorage.setItem(key, color)
        }

        // Encontrar o usuário correspondente pelo UUID
        const authUser = authUsers.find((user: any) => user.uuid === item.authUserUuid)
        const name = authUser?.username || "Professor sem nome"

        return {
          id: item.uuid,
          name: name,
          email: item.email,
          professionalArea: item.professionalArea || "Não definido",
          workShift: item.workShift || "Não definido",
          workloadWeek: item.workloadWeek,
          color,
        }
      })

      setTeacherList(updatedTeachers)
      setSuccessToast({
        show: true,
        message: "Professores carregados com sucesso",
        id: "success-toast-" + Date.now(),
      })
    } catch (err) {
      console.error("Erro ao buscar professores:", err)
      setErrorToast({
        show: true,
        message: "Erro ao buscar professores, tente novamente!",
        id: "error-toast-" + Date.now(),
      })
    }
  }

  useEffect(() => {
    fetchTeachers()
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

  const filteredTeachers = teacherList.filter((item) => item.name?.toLowerCase().includes(searchTerm.toLowerCase()))

  // Função para abrir o popup de criação de professor
  const handleAddTeacherClick = () => {
    setIsCreatingTeacher(true)
  }

  // Função para fechar o popup
  const closePopup = () => {
    setIsCreatingTeacher(false)
    setSelectedTeacher(null)
  }

  // Função para criar um novo professor
  const handleCreateTeacher = async (newTeacher: any) => {
    try {
      // Usar o nome do professor diretamente como nome de usuário
      const username = newTeacher.username

      // Registrar o usuário de autenticação
      const registerData = {
        username: username,
        password: "professor@", // Senha padrão para todos os professores
        role: "TEACHER", // Definindo o papel como TEACHER
      }

      const registerResponse = await axios.post("http://localhost:9090/auth/register", registerData, {
        withCredentials: true,
      })

      // Obter o UUID do usuário recém-criado
      const allUsersResponse = await axios.get("http://localhost:9090/auth/getAll", {
        withCredentials: true,
      })

      // Encontrar o usuário que acabamos de criar pelo nome de usuário
      const createdUser = allUsersResponse.data.find((user: any) => user.username === username)

      if (!createdUser || !createdUser.uuid) {
        throw new Error("Não foi possível encontrar o usuário recém-criado")
      }

      const authUserUuid = createdUser.uuid

      // Em seguida, criar o professor associado ao usuário de autenticação
      const teacherData = {
        email: newTeacher.email,
        workShift: newTeacher.workShift,
        workloadWeek: Number(newTeacher.workloadWeek),
        professionalArea: newTeacher.professionalArea,
        authUserUuid: authUserUuid,
      }

      const teacherResponse = await axios.post("http://localhost:9090/users/teacher/add", teacherData, {
        withCredentials: true,
      })

      fetchTeachers() // Recarregar a lista de professores
      setSuccessToast({
        show: true,
        message: "Professor adicionado com sucesso (senha padrão: professor@)",
        id: "success-toast-" + Date.now(),
      })
      closePopup()
    } catch (error: any) {
      // Mostrar mensagem de erro mais detalhada
      const errorMessage = error.response?.data || error.message || "Erro ao adicionar professor, tente novamente!"
      setErrorToast({
        show: true,
        message: typeof errorMessage === "string" ? errorMessage : JSON.stringify(errorMessage),
        id: "error-toast-" + Date.now(),
      })
    }
  }

  // Função para atualizar um professor existente
  const handleUpdateTeacher = async (updatedTeacher: any) => {
    try {
      if (updatedTeacher.id) {
        const updateData = {
          email: updatedTeacher.email,
          workShift: updatedTeacher.workShift,
          workloadWeek: Number(updatedTeacher.workloadWeek),
          professionalArea: updatedTeacher.professionalArea,
        }

        // Atualizar o professor usando PATCH com o formato correto
        await axios.patch(`http://localhost:9090/users/teacher/update/${updatedTeacher.id}`, updateData, {
          withCredentials: true,
        })
        fetchTeachers() // Recarregar a lista de professores
        setUpdateToast({
          show: true,
          message: "Professor atualizado com sucesso",
          id: "update-toast-" + Date.now(),
        })
        closePopup()
      }
    } catch (error: any) {
      console.error("Erro ao atualizar professor:", error)
      // Mostrar mensagem de erro mais detalhada
      const errorMessage = error.response?.data?.message || "Erro ao atualizar professor, tente novamente!"
      setErrorToast({
        show: true,
        message: errorMessage,
        id: "error-toast-" + Date.now(),
      })
    }
  }

  // Função para excluir um professor
  const handleDeleteTeacher = async (id: string) => {
    try {
      await axios.delete(`http://localhost:9090/users/teacher/delete/${id}`, {
        withCredentials: true,
      })
      fetchTeachers() // Recarregar a lista de professores
      closePopup()
      setDeleteToast({
        show: true,
        message: "Professor excluído com sucesso",
        id: "delete-toast-" + Date.now(),
      })
    } catch (error: any) {
      console.error("Erro ao excluir professor:", error)
      // Mostrar mensagem de erro mais detalhada
      const errorMessage = error.response?.data?.message || "Erro ao excluir professor, tente novamente!"
      setErrorToast({
        show: true,
        message: errorMessage,
        id: "error-toast-" + Date.now(),
      })
    }
  }

  // Função para buscar detalhes de um professor
  const handleTeacherClick = async (teacher: TeacherItemType) => {
    try {
      // Buscar detalhes completos do professor
      const response = await axios.get(`http://localhost:9090/users/teacher/find/${teacher.id}`, {
        withCredentials: true,
      })

      // Buscar todos os usuários para obter o nome correto
      const authUsersRes = await axios.get("http://localhost:9090/auth/getAll", {
        withCredentials: true,
      })

      const teacherDetalhado = response.data
      const authUsers = authUsersRes.data || []

      // Encontrar o usuário correspondente pelo UUID
      const authUser = authUsers.find((user: any) => user.uuid === teacherDetalhado.authUserUuid)
      const name = authUser?.username || teacher.name

      setSelectedTeacher({
        id: teacherDetalhado.uuid,
        username: name,
        email: teacherDetalhado.email || "",
        workShift: teacherDetalhado.workShift || teacher.workShift,
        workloadWeek: teacherDetalhado.workloadWeek || 0,
        professionalArea: teacherDetalhado.professionalArea || teacher.professionalArea,
      })
    } catch (error) {
      console.error("Erro ao buscar detalhes do professor:", error)
      // Fallback para os dados que já temos
      setSelectedTeacher({
        id: teacher.id,
        username: teacher.name,
        email: teacher.email || "",
        workShift: teacher.workShift,
        workloadWeek: teacher.workloadWeek || 0,
        professionalArea: teacher.professionalArea,
      })
    }
  }

  // Configuração de labels para o popup
  const fieldLabels = {
    username: "Nome do professor",
    email: "Email",
    professionalArea: "Área Profissional",
    workShift: "Turno",
    workloadWeek: "Carga Horária Semanal",
    createButton: "Criar Professor",
    cancelButton: "Cancelar",
    confirmButton: "Confirmar",
    doneButton: "Concluído",
    newTeacherTitle: "Novo Professor",
    deleteButton: "Excluir Professor",
    cancelConfirmTitle: "Descartar alterações",
    cancelConfirmMessage: "Tem certeza que deseja descartar as alterações feitas?",
    cancelConfirmYes: "Sim, descartar",
    cancelConfirmNo: "Não, continuar editando",
  }

  // Configuração de placeholders para o popup
  const fieldPlaceholders = {
    username: "Digite o nome do professor",
    email: "exemplo@email.com",
    professionalArea: "Digite a área profissional",
    workShift: "Selecione o turno",
    workloadWeek: "0",
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
            VER PROFESSORES
          </h1>
        </div>

        <div className="flex items-center mb-6 gap-4 px-4 justify-between">
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <div className="flex gap-2">
            {viewMode === "list" && showAddButton && <AdicionarButton onClick={handleAddTeacherClick} />}
            <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-4 mt-8">
            {showAddButton && (
              <div
                key="-1"
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#003366] text-white cursor-pointer h-[180px] transition-transform hover:scale-105 active:scale-95"
                onClick={handleAddTeacherClick}
              >
                <div className="rounded-full p-4 mb-2">
                  <div className="text-4xl sm:text-5xl font-bold">+</div>
                </div>
                <div className="font-medium text-xl sm:text-2xl text-center">Adicionar professor</div>
              </div>
            )}
            {filteredTeachers.map((item) => (
              <TeacherItem
                key={item.id}
                id={item.id}
                name={item.name}
                professionalArea={item.professionalArea}
                workShift={item.workShift}
                photoUrl={null}
                color={item.color}
                onClick={() => handleTeacherClick(item)}
              />
            ))}
          </div>
        ) : (
          <div className="px-4 mt-8">
            <TeacherList
              teachers={filteredTeachers}
              onTeacherClick={handleTeacherClick}
              onRemoveTeacher={(id) => handleDeleteTeacher(id)}
            />
          </div>
        )}

        {/* Toast Container para organizar as notificações */}
        <ToastContainer>
          {errorToast.show && (
            <ErrorToastTeacher
              key={errorToast.id}
              message={errorToast.message}
              onClose={() => setErrorToast({ ...errorToast, show: false })}
            />
          )}
          {successToast.show && (
            <CorrectToastTeacher
              key={successToast.id}
              message={successToast.message}
              onClose={() => setSuccessToast({ ...successToast, show: false })}
            />
          )}
          {updateToast.show && (
            <UpdateToastTeacher
              key={updateToast.id}
              message={updateToast.message}
              onClose={() => setUpdateToast({ ...updateToast, show: false })}
            />
          )}
          {deleteToast.show && (
            <DeleteToastTeacher
              key={deleteToast.id}
              message={deleteToast.message}
              onClose={() => setDeleteToast({ ...deleteToast, show: false })}
            />
          )}
        </ToastContainer>

        {/* Popup de criação de professor */}
        {isCreatingTeacher && (
          <PopupDadosTeachers
            onClose={closePopup}
            onCreate={handleCreateTeacher}
            isCreating={true}
            fieldLabels={fieldLabels}
            fieldPlaceholders={fieldPlaceholders}
          />
        )}

        {/* Popup de detalhes/edição de professor */}
        {selectedTeacher && (
          <PopupDadosTeachers
            teacherData={selectedTeacher}
            onClose={closePopup}
            onUpdate={handleUpdateTeacher}
            onDelete={handleDeleteTeacher}
            fieldLabels={fieldLabels}
            fieldPlaceholders={fieldPlaceholders}
          />
        )}
      </div>
    </div>
  )
}
