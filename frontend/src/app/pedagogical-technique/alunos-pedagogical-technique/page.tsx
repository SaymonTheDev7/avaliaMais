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
import { AlunoItem } from "@/components/aluno-item"
import { AlunoList } from "@/components/aluno-list"
import ErrorToastAluno from "@/components/erro-buscar-aluno-toast"
import CorrectToastAluno from "@/components/correct-aluno-toast"
import UpdateToastAluno from "@/components/update-aluno-toast"
import DeleteToastAluno from "@/components/delete-aluno-toast"
import { ToastContainer } from "@/components/toast-container"
import { PopupDadosAlunos } from "@/components/popup-dados-alunos"

const alunoColors = [
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
  return alunoColors[Math.floor(Math.random() * alunoColors.length)]
}

// Exportando o tipo para ser usado em outros componentes
export type AlunoItemType = {
  id: string
  name: string
  turma: string
  turno: string
  photoUrl?: string | null
  color: string
  email?: string
  workloadWeek?: number
  currentCourse?: {
    id: string
    name: string
  } | null
}

export default function VerAlunosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [alunoList, setAlunoList] = useState<AlunoItemType[]>([])
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

  const [isCreatingAluno, setIsCreatingAluno] = useState(false)
  const [selectedAluno, setSelectedAluno] = useState<any | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  // Modificar a função fetchAlunos para buscar corretamente os nomes dos alunos
  const fetchAlunos = async () => {
    try {
      // Primeiro, buscar todos os alunos
      const res = await axios.get("http://localhost:9090/users/student/find/all?page=0", {
        withCredentials: true,
      })

      // Depois, buscar todos os usuários para obter os nomes
      const authUsersRes = await axios.get("http://localhost:9090/auth/getAll", {
        withCredentials: true,
      })

      const alunos = res.data.content || []
      const authUsers = authUsersRes.data || []

      console.log("Dados recebidos da API:", alunos)
      console.log("Dados de autenticação:", authUsers)

      const updatedAlunos: AlunoItemType[] = alunos.map((item: any) => {
        const key = `alunoColor-${item.uuid}`
        let color = localStorage.getItem(key)

        if (!color) {
          color = getRandomColor()
          localStorage.setItem(key, color)
        }

        // Encontrar o usuário correspondente pelo UUID
        const authUser = authUsers.find((user: any) => user.uuid === item.authUserUuid)
        const name = authUser?.username || "Aluno sem nome"

        return {
          id: item.uuid,
          name: name,
          email: item.email,
          turma: item.classIds && item.classIds.length > 0 ? item.classIds[0].name : "Sem turma",
          turno: item.workShift || "Não definido",
          workloadWeek: item.workloadWeek,
          color,
          currentCourse: item.currentCourse
            ? {
                id: item.currentCourse.uuid,
                name: item.currentCourse.nameCourse,
              }
            : null,
        }
      })

      setAlunoList(updatedAlunos)
      setSuccessToast({
        show: true,
        message: "Alunos carregados com sucesso",
        id: "success-toast-" + Date.now(),
      })
    } catch (err) {
      console.error("Erro ao buscar alunos:", err)
      setErrorToast({
        show: true,
        message: "Erro ao buscar alunos, tente novamente!",
        id: "error-toast-" + Date.now(),
      })
    }
  }

  useEffect(() => {
    fetchAlunos()
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

  const filteredAlunos = alunoList.filter((item) => item.name?.toLowerCase().includes(searchTerm.toLowerCase()))

  // Função para abrir o popup de criação de aluno
  const handleAddAlunoClick = () => {
    setIsCreatingAluno(true)
  }

  // Função para fechar o popup
  const closePopup = () => {
    setIsCreatingAluno(false)
    setSelectedAluno(null)
  }

  // Modificar a função handleCreateAluno para garantir que o curso seja enviado corretamente
  const handleCreateAluno = async (newAluno: any) => {
    try {
      // Usar o nome do aluno diretamente como nome de usuário
      const username = newAluno.username

      // Registrar o usuário de autenticação
      const registerData = {
        username: username,
        password: "aluno@", // Senha padrão para todos os alunos
        role: "STUDENT", // Definindo o papel como STUDENT
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

      // Em seguida, criar o aluno associado ao usuário de autenticação
      const studentData = {
        email: newAluno.email,
        workShift: newAluno.workShift,
        workloadWeek: Number(newAluno.workloadWeek), // Garantir que seja um número
        currentCourseId: newAluno.currentCourse?.id || null, // Enviar apenas o ID do curso
        authUserUuid: authUserUuid, // UUID do AuthUser criado
      }

      console.log("Dados do aluno a serem enviados:", studentData)

      const studentResponse = await axios.post("http://localhost:9090/users/student/add", studentData, {
        withCredentials: true,
      })

      fetchAlunos() // Recarregar a lista de alunos
      setSuccessToast({
        show: true,
        message: "Aluno adicionado com sucesso (senha padrão: aluno@)",
        id: "success-toast-" + Date.now(),
      })
      closePopup()
    } catch (error: any) {
      // Mostrar mensagem de erro mais detalhada
      const errorMessage = error.response?.data || error.message || "Erro ao adicionar aluno, tente novamente!"
      setErrorToast({
        show: true,
        message: typeof errorMessage === "string" ? errorMessage : JSON.stringify(errorMessage),
        id: "error-toast-" + Date.now(),
      })
    }
  }

  // Modificar a função handleUpdateAluno para garantir que o curso seja enviado corretamente
  const handleUpdateAluno = async (updatedAluno: any) => {
    try {
      if (updatedAluno.id) {
        const updateData = {
          email: updatedAluno.email,
          workShift: updatedAluno.workShift,
          workloadWeek: Number(updatedAluno.workloadWeek),
          currentCourseId: updatedAluno.currentCourse?.id || null,
        }

        console.log("Dados enviados para atualização:", updateData)

        // Atualizar o aluno usando PATCH com o formato correto
        await axios.patch(`http://localhost:9090/users/student/update/${updatedAluno.id}`, updateData, {
          withCredentials: true,
        })
        fetchAlunos() // Recarregar a lista de alunos
        setUpdateToast({
          show: true,
          message: "Aluno atualizado com sucesso",
          id: "update-toast-" + Date.now(),
        })
        closePopup()
      }
    } catch (error: any) {
      console.error("Erro ao atualizar aluno:", error)
      // Mostrar mensagem de erro mais detalhada
      const errorMessage = error.response?.data?.message || "Erro ao atualizar aluno, tente novamente!"
      setErrorToast({
        show: true,
        message: errorMessage,
        id: "error-toast-" + Date.now(),
      })
    }
  }

  // Função para excluir um aluno
  const handleDeleteAluno = async (id: string) => {
    try {
      await axios.delete(`http://localhost:9090/users/student/delete/${id}`, {
        withCredentials: true,
      })
      fetchAlunos() // Recarregar a lista de alunos
      closePopup()
      setDeleteToast({
        show: true,
        message: "Aluno excluído com sucesso",
        id: "delete-toast-" + Date.now(),
      })
    } catch (error: any) {
      console.error("Erro ao excluir aluno:", error)
      // Mostrar mensagem de erro mais detalhada
      const errorMessage = error.response?.data?.message || "Erro ao excluir aluno, tente novamente!"
      setErrorToast({
        show: true,
        message: errorMessage,
        id: "error-toast-" + Date.now(),
      })
    }
  }

  // Modificar a função handleAlunoClick para garantir que o curso seja recuperado corretamente
  const handleAlunoClick = async (aluno: AlunoItemType) => {
    try {
      // Buscar detalhes completos do aluno
      const response = await axios.get(`http://localhost:9090/users/student/findByUuid/${aluno.id}`, {
        withCredentials: true,
      })

      // Buscar todos os usuários para obter o nome correto
      const authUsersRes = await axios.get("http://localhost:9090/auth/getAll", {
        withCredentials: true,
      })

      const alunoDetalhado = response.data
      const authUsers = authUsersRes.data || []

      // Encontrar o usuário correspondente pelo UUID
      const authUser = authUsers.find((user: any) => user.uuid === alunoDetalhado.authUserUuid)
      const name = authUser?.username || aluno.name

      // Verificar se temos os dados do curso
      let currentCourse = null
      if (alunoDetalhado.currentCourse) {
        currentCourse = {
          id: alunoDetalhado.currentCourse.uuid,
          name: alunoDetalhado.currentCourse.nameCourse,
        }
      } else if (alunoDetalhado.currentCourseId) {
        // Se temos apenas o ID do curso, buscar os detalhes do curso
        try {
          const courseResponse = await axios.get(
            `http://localhost:9090/course/findByUuid/${alunoDetalhado.currentCourseId}`,
            {
              withCredentials: true,
            },
          )

          if (courseResponse.data) {
            currentCourse = {
              id: courseResponse.data.uuid,
              name: courseResponse.data.nameCourse,
            }
          }
        } catch (courseError) {
          console.error("Erro ao buscar detalhes do curso:", courseError)
        }
      }

      setSelectedAluno({
        id: alunoDetalhado.uuid,
        username: name,
        email: alunoDetalhado.email || "",
        workShift: alunoDetalhado.workShift || aluno.turno,
        workloadWeek: alunoDetalhado.workloadWeek || 0,
        currentCourse: currentCourse,
      })
    } catch (error) {
      console.error("Erro ao buscar detalhes do aluno:", error)
      // Fallback para os dados que já temos
      setSelectedAluno({
        id: aluno.id,
        username: aluno.name,
        email: aluno.email || "",
        workShift: aluno.turno,
        workloadWeek: aluno.workloadWeek || 0,
        currentCourse: aluno.currentCourse,
      })
    }
  }

  // Configuração de labels para o popup
  const fieldLabels = {
    username: "Nome do aluno",
    email: "Email",
    workShift: "Turno",
    workloadWeek: "Carga Horária Semanal",
    createButton: "Criar Aluno",
    cancelButton: "Cancelar",
    confirmButton: "Confirmar",
    doneButton: "Concluído",
    newAlunoTitle: "Novo Aluno",
    deleteButton: "Excluir Aluno",
    cancelConfirmTitle: "Descartar alterações",
    cancelConfirmMessage: "Tem certeza que deseja descartar as alterações feitas?",
    cancelConfirmYes: "Sim, descartar",
    cancelConfirmNo: "Não, continuar editando",
  }

  // Configuração de placeholders para o popup
  const fieldPlaceholders = {
    username: "Digite o nome do aluno",
    email: "exemplo@email.com",
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
            VER ALUNOS
          </h1>
        </div>

        <div className="flex items-center mb-6 gap-4 px-4 justify-between">
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <div className="flex gap-2">
            {viewMode === "list" && showAddButton && <AdicionarButton onClick={handleAddAlunoClick} />}
            <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-4 mt-8">
            {showAddButton && (
              <div
                key="-1"
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#003366] text-white cursor-pointer h-[180px] transition-transform hover:scale-105 active:scale-95"
                onClick={handleAddAlunoClick}
              >
                <div className="rounded-full p-4 mb-2">
                  <div className="text-4xl sm:text-5xl font-bold">+</div>
                </div>
                <div className="font-medium text-xl sm:text-2xl text-center">Adicionar aluno</div>
              </div>
            )}
            {filteredAlunos.map((item) => (
              <AlunoItem
                key={item.id}
                id={item.id}
                name={item.name}
                turma={item.turma}
                turno={item.turno}
                photoUrl={null}
                color={item.color}
                onClick={() => handleAlunoClick(item)}
              />
            ))}
          </div>
        ) : (
          <div className="px-4 mt-8">
            <AlunoList
              alunos={filteredAlunos}
              onAlunoClick={handleAlunoClick}
              onRemoveAluno={(id) => handleDeleteAluno(id)}
            />
          </div>
        )}

        {/* Toast Container para organizar as notificações */}
        <ToastContainer>
          {errorToast.show && (
            <ErrorToastAluno
              key={errorToast.id}
              message={errorToast.message}
              onClose={() => setErrorToast({ ...errorToast, show: false })}
            />
          )}
          {successToast.show && (
            <CorrectToastAluno
              key={successToast.id}
              message={successToast.message}
              onClose={() => setSuccessToast({ ...successToast, show: false })}
            />
          )}
          {updateToast.show && (
            <UpdateToastAluno
              key={updateToast.id}
              message={updateToast.message}
              onClose={() => setUpdateToast({ ...updateToast, show: false })}
            />
          )}
          {deleteToast.show && (
            <DeleteToastAluno
              key={deleteToast.id}
              message={deleteToast.message}
              onClose={() => setDeleteToast({ ...deleteToast, show: false })}
            />
          )}
        </ToastContainer>

        {/* Popup de criação de aluno */}
        {isCreatingAluno && (
          <PopupDadosAlunos
            onClose={closePopup}
            onCreate={handleCreateAluno}
            isCreating={true}
            fieldLabels={fieldLabels}
            fieldPlaceholders={fieldPlaceholders}
          />
        )}

        {/* Popup de detalhes/edição de aluno */}
        {selectedAluno && (
          <PopupDadosAlunos
            alunoData={selectedAluno}
            onClose={closePopup}
            onUpdate={handleUpdateAluno}
            onDelete={handleDeleteAluno}
            fieldLabels={fieldLabels}
            fieldPlaceholders={fieldPlaceholders}
          />
        )}
      </div>
    </div>
  )
}
