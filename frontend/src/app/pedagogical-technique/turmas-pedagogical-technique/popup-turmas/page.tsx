"use client"

import { useState } from "react"
import { PopupDados } from "@/components/popup-dados"

// Tipo para os dados da turma
type ClassData = {
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

// Tipo para configuração dos campos
type FieldConfig = {
  label: string
  editable: boolean
  tooltip?: {
    text: string
    icon: "red" | "white" | null
  } | null
}

export default function TurmaPage({ params }: { params: { id: string } }) {
  // Dados de exemplo da turma (em produção, estes seriam buscados do backend)
  const [classData, setClassData] = useState<ClassData>({
    id: Number.parseInt(params.id),
    name: "Turma 2023/2",
    students: 25,
    time: "14:00 - 18:00",
    color: "#003366",
    course: "JGS - AI PSIN 2023/2 INT1",
    hoursLoad: "2800 horas",
    shift: "Vespertino",
    fullTime: "14:00 - 18:00",
  })

  // Configuração dos campos - movida para a página
  const fieldConfig: Record<string, FieldConfig> = {
    course: {
      label: "Curso",
      editable: false,
      tooltip: {
        text: "Esse campo não pode ser alterado",
        icon: "red",
      },
    },
    hoursLoad: {
      label: "Carga horária",
      editable: false,
      tooltip: {
        text: "Esse campo herda seu valor do curso informado",
        icon: "white",
      },
    },
    name: {
      label: "Nome da turma",
      editable: false,
      tooltip: {
        text: "Esse campo não pode ser alterado",
        icon: "red",
      },
    },
    students: {
      label: "Quantidade de alunos",
      editable: false,
      tooltip: null,
    },
    shift: {
      label: "Turno/Horário",
      editable: true,
      tooltip: null,
    },
    fullTime: {
      label: "Horário completo",
      editable: true,
      tooltip: null,
    },
  }

  const [isPopupOpen, setIsPopupOpen] = useState(true)

  const handleClosePopup = () => {
    setIsPopupOpen(false)
    // Em um cenário real, você redirecionaria para outra página
  }

  const handleUpdateClassData = (updatedData: ClassData) => {
    setClassData(updatedData)
    // Aqui você poderia salvar os dados no backend
  }

  // Renderiza o componente de popup com as configurações
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {isPopupOpen && (
        <PopupDados
          classData={classData}
          onClose={handleClosePopup}
          fieldConfig={fieldConfig}
          onUpdate={handleUpdateClassData}
        />
      )}

      {/* Conteúdo da página quando o popup estiver fechado */}
      {!isPopupOpen && (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Detalhes da Turma</h1>
          <p>O popup está fechado. Clique para reabrir:</p>
          <button onClick={() => setIsPopupOpen(true)} className="mt-4 px-4 py-2 bg-[#003366] text-white rounded-md">
            Abrir Popup
          </button>
        </div>
      )}
    </div>
  )
}
