"use client"

import type React from "react"
import { useState } from "react"
import { X, Pencil, ExternalLink, AlertCircle, Info } from "lucide-react"

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

type PopupDadosProps = {
  classData: ClassData
  onClose: () => void
  fieldConfig?: Record<string, FieldConfig>
  onUpdate?: (updatedData: ClassData) => void
}

export function PopupDados({ classData, onClose, fieldConfig, onUpdate }: PopupDadosProps) {
  // Configuração padrão dos campos
  const defaultFieldConfig: Record<string, FieldConfig> = {
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

  // Usar a configuração fornecida ou a padrão
  const config = fieldConfig || defaultFieldConfig

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    ...classData,
    shift: classData.shift || "Vespertino",
    fullTime: classData.fullTime || classData.time,
  })

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = () => {
    if (onUpdate) {
      onUpdate(formData)
    }
    onClose()
  }

  const Tooltip = ({ text, children }: { text: string; children: React.ReactNode }) => {
    return (
      <div className="group relative inline-block">
        {children}
        <div className="absolute right-0 bottom-full mb-2 w-48 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
          {text}
        </div>
      </div>
    )
  }

  // Função para renderizar o ícone do tooltip baseado na configuração
  const renderTooltipIcon = (config?: { text: string; icon: "red" | "white" | null } | null) => {
    if (!config || !isEditing) return null

    return (
      <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
        <Tooltip text={config.text}>
          {config.icon === "red" ? (
            <AlertCircle className="h-4 w-4 text-red-500" />
          ) : config.icon === "white" ? (
            <Info className="h-4 w-4 text-white bg-gray-500 rounded-full p-[1px]" />
          ) : null}
        </Tooltip>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-xl w-full max-w-2xl shadow-xl overflow-hidden border border-gray-200"
        style={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="bg-[#003366] text-white p-6 relative">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">{formData.name}</h2>

          <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors">
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={handleEditToggle}
            className="absolute top-4 right-14 text-white hover:text-gray-300 transition-colors"
          >
            <Pencil className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 bg-white text-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Campo Curso */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{config.course?.label || "Curso"}</label>
              <div className="relative">
                <input
                  type="text"
                  name="course"
                  value={formData.course || ""}
                  readOnly={true}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none pr-8"
                />
                {renderTooltipIcon(config.course?.tooltip)}
              </div>
            </div>

            {/* Campo Carga Horária */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {config.hoursLoad?.label || "Carga horária"}
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="hoursLoad"
                  value={formData.hoursLoad || ""}
                  readOnly={true}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none pr-8"
                />
                {renderTooltipIcon(config.hoursLoad?.tooltip)}
              </div>
            </div>

            {/* Campo Nome da Turma */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {config.name?.label || "Nome da turma"}
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  readOnly={true}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none pr-8"
                />
                {renderTooltipIcon(config.name?.tooltip)}
              </div>
            </div>

            {/* Campo Alunos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alunos</label>
              <div className="flex items-center">
                <div className="w-full p-3 rounded-md border border-gray-300 bg-gray-50 text-center text-gray-500">
                  Os alunos aparecerão aqui :)
                </div>
                <button className="ml-2 bg-[#003366] p-2 rounded-md text-white hover:bg-[#004488] transition-colors">
                  <ExternalLink className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Campo Turno/Horário */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {config.shift?.label || "Turno/Horário"}
              </label>
              <div className="flex gap-2">
                <select
                  name="shift"
                  value={formData.shift || "Vespertino"}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`p-2 rounded-md border border-gray-300 ${
                    isEditing ? "bg-white" : "bg-gray-50"
                  } focus:outline-none w-full`}
                >
                  <option value="Vespertino">Vespertino</option>
                  <option value="Matutino">Matutino</option>
                  <option value="Noturno">Noturno</option>
                  <option value="Horário Normal">Horário Normal</option>
                  <option value="Segundo Turno">Segundo Turno</option>
                </select>
                <input
                  type="text"
                  name="fullTime"
                  value={formData.fullTime || ""}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className={`w-full p-2 rounded-md border border-gray-300 ${
                    isEditing ? "bg-white" : "bg-gray-50"
                  } focus:outline-none`}
                />
              </div>
            </div>

            {/* Campo Quantidade de Alunos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {config.students?.label || "Quantidade de alunos"}
              </label>
              <input
                type="number"
                name="students"
                value={formData.students}
                readOnly={true}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-[#F13F00] text-white rounded-md hover:bg-opacity-90 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-[#319F43] text-white rounded-md hover:bg-opacity-90 transition-colors font-medium"
                >
                  Confirmar
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#02335E] text-white rounded-md hover:bg-opacity-90 transition-colors font-medium"
              >
                Concluído
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
