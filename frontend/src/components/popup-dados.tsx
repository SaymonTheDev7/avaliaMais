"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Pencil, ExternalLink, AlertCircle, Info, XCircle, Trash2 } from "lucide-react"
import { ConfirmationDialog } from "./confirmation-dialog"

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
  placeholder?: string
}

// Tipo para os cursos disponíveis
type CourseOption = {
  name: string
  hoursLoad: string
}

// Tipo para o alerta
type AlertProps = {
  message: string
  onClose: () => void
}

// Componente de alerta
const Alert = ({ message, onClose }: AlertProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100]">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative z-10 mx-4">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <XCircle className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
          <h3 className="text-lg font-semibold text-gray-900">Atenção</h3>
        </div>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#003366] text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  )
}

// Tipo para as labels e placeholders
type FieldLabels = {
  course?: string
  hoursLoad?: string
  name?: string
  students?: string
  shift?: string
  fullTime?: string
  createButton?: string
  cancelButton?: string
  confirmButton?: string
  doneButton?: string
  popupTitle?: string
  newClassTitle?: string
  deleteButton?: string
  cancelConfirmTitle?: string
  cancelConfirmMessage?: string
  cancelConfirmYes?: string
  cancelConfirmNo?: string
}

type FieldPlaceholders = {
  course?: string
  hoursLoad?: string
  name?: string
  students?: string
  shift?: string
  fullTime?: string
}

type PopupDadosProps = {
  classData?: ClassData
  onClose: () => void
  fieldConfig?: Record<string, FieldConfig>
  onUpdate?: (updatedData: ClassData) => void
  onCreate?: (newData: ClassData) => void
  onDelete?: (id: number) => void
  isCreating?: boolean
  availableCourses?: CourseOption[]
  fieldLabels?: FieldLabels
  fieldPlaceholders?: FieldPlaceholders
}

export function PopupDados({
  classData,
  onClose,
  fieldConfig,
  onUpdate,
  onCreate,
  onDelete,
  isCreating = false,
  availableCourses = [
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
  ],
  fieldLabels = {},
  fieldPlaceholders = {},
}: PopupDadosProps) {
  // Configuração padrão dos campos
  const defaultFieldConfig: Record<string, FieldConfig> = {
    course: {
      label: fieldLabels.course || "Curso",
      editable: isCreating, // Only editable when creating, not when editing
      tooltip: null,
      placeholder: fieldPlaceholders.course || "Selecione um curso",
    },
    hoursLoad: {
      label: fieldLabels.hoursLoad || "Carga horária",
      editable: false,
      tooltip: {
        text: "Esse campo herda seu valor do curso informado",
        icon: "white",
      },
      placeholder: fieldPlaceholders.hoursLoad || "",
    },
    name: {
      label: fieldLabels.name || "Nome da turma",
      editable: true,
      tooltip: {
        text: isCreating ? "Atenção, esse campo não poderá ser alterado" : "Esse campo não pode ser alterado",
        icon: "red",
      },
      placeholder: fieldPlaceholders.name || "Digite o nome da turma",
    },
    students: {
      label: fieldLabels.students || "Quantidade de alunos",
      editable: true,
      tooltip: null,
      placeholder: fieldPlaceholders.students || "0",
    },
    shift: {
      label: fieldLabels.shift || "Turno/Horário",
      editable: true,
      tooltip: null,
      placeholder: fieldPlaceholders.shift || "Selecione o turno",
    },
    fullTime: {
      label: fieldLabels.fullTime || "Horário completo",
      editable: true,
      tooltip: null,
      placeholder: fieldPlaceholders.fullTime || "Ex: 08:00 - 10:00",
    },
  }

  // Usar a configuração fornecida ou a padrão
  const config = fieldConfig || defaultFieldConfig

  // Default values for creating a new class
  const defaultClassData: ClassData = {
    id: Date.now(),
    name: "",
    students: 0,
    time: "",
    color: "",
    shift: "Vespertino",
    fullTime: "",
    course: "",
    hoursLoad: "",
  }

  const [isEditing, setIsEditing] = useState(isCreating)
  const [formData, setFormData] = useState({
    ...(classData || defaultClassData),
    shift: classData?.shift || defaultClassData.shift || "Vespertino",
    fullTime: classData?.fullTime || classData?.time || "",
  })
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  // Atualiza a carga horária quando o curso é alterado
  useEffect(() => {
    if (formData.course) {
      const selectedCourse = availableCourses.find((course) => course.name === formData.course)
      if (selectedCourse) {
        setFormData((prev) => ({
          ...prev,
          hoursLoad: selectedCourse.hoursLoad,
        }))
      }
    }
  }, [formData.course, availableCourses])

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
    setHasChanges(false) // Reset changes flag when toggling edit mode
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    setHasChanges(true) // Mark that changes have been made
  }

  const validateForm = () => {
    // Verificar campos obrigatórios
    if (!formData.name.trim()) {
      setAlertMessage("Por favor, preencha o nome da turma.")
      setShowAlert(true)
      return false
    }

    if (!formData.course) {
      setAlertMessage("Por favor, selecione um curso.")
      setShowAlert(true)
      return false
    }

    if (!formData.fullTime.trim()) {
      setAlertMessage("Por favor, preencha o horário da turma.")
      setShowAlert(true)
      return false
    }

    if (formData.students <= 0) {
      setAlertMessage("Por favor, informe uma quantidade válida de alunos.")
      setShowAlert(true)
      return false
    }

    return true
  }

  const handleSubmit = () => {
    // Validar o formulário antes de enviar
    if (isCreating && !validateForm()) {
      return
    }

    // Update the time field with the fullTime value to ensure it's passed back to the parent component
    const updatedData = {
      ...formData,
      time: formData.fullTime || formData.time,
    }

    if (isCreating && onCreate) {
      onCreate(updatedData)
    } else if (onUpdate) {
      onUpdate(updatedData)
    }
    onClose()
  }

  const handleCancel = () => {
    if (hasChanges && isEditing) {
      setShowCancelConfirmation(true)
    } else {
      if (isCreating) {
        onClose()
      } else {
        setIsEditing(false)
      }
    }
  }

  const handleDelete = () => {
    if (onDelete && classData) {
      setShowDeleteConfirmation(true)
    }
  }

  const confirmDelete = () => {
    if (onDelete && classData) {
      onDelete(classData.id)
      onClose()
    }
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
  const renderTooltipIcon = (config?: { text: string; icon: "red" | "white" | null } | null, fieldName?: string) => {
    if (!config) return null
    if (config.icon === "red" && !isEditing) return null
    if (isEditing && fieldName === "name") return null
    if (fieldName === "course") return null // Never show tooltip for course field

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
    <>
      <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
        <div
          className="bg-white rounded-xl w-full max-w-2xl shadow-xl overflow-hidden border border-gray-200"
          style={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="bg-[#003366] text-white p-6 relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-center">
              {isCreating ? fieldLabels.newClassTitle || "Nova Turma" : formData.name}
            </h2>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            {!isCreating && (
              <button
                onClick={handleEditToggle}
                className="absolute top-4 right-14 text-white hover:text-gray-300 transition-colors"
              >
                <Pencil className="h-6 w-6" />
              </button>
            )}
          </div>

          <div className="p-6 bg-white text-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Campo Curso */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {config.course?.label}
                  {isCreating && <span className="text-red-500 ml-1">*</span>}
                </label>
                <div className="relative">
                  {isCreating ? (
                    // Dropdown select for creating mode
                    <select
                      name="course"
                      value={formData.course || ""}
                      onChange={handleInputChange}
                      className={`w-full p-2 rounded-md border ${
                        isCreating && !formData.course ? "border-red-300" : "border-gray-300"
                      } bg-white focus:outline-none appearance-auto`}
                    >
                      <option value="">{config.course?.placeholder || "Selecione um curso"}</option>
                      {availableCourses.map((course, index) => (
                        <option key={index} value={course.name}>
                          {course.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    // Input field for view/edit mode (not editable in edit mode)
                    <div className="relative">
                      <input
                        type="text"
                        name="course"
                        value={formData.course || ""}
                        readOnly={true}
                        className="w-full p-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none appearance-none"
                      />
                      {isEditing && (
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
                          <Tooltip text="Esse campo não pode ser editado">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          </Tooltip>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Campo Carga Horária */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{config.hoursLoad?.label}</label>
                <div className="relative">
                  <input
                    type="text"
                    name="hoursLoad"
                    value={formData.hoursLoad || ""}
                    readOnly={true}
                    className="w-full p-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none pr-8 appearance-none"
                    placeholder={config.hoursLoad?.placeholder}
                  />
                  {renderTooltipIcon(config.hoursLoad?.tooltip, "hoursLoad")}
                </div>
              </div>

              {/* Campo Nome da Turma */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {config.name?.label}
                  {isCreating && <span className="text-red-500 ml-1">*</span>}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    readOnly={!isCreating && !isEditing}
                    onChange={handleInputChange}
                    className={`w-full p-2 rounded-md border ${
                      isCreating && !formData.name.trim() ? "border-red-300" : "border-gray-300"
                    } ${isEditing || isCreating ? "bg-white" : "bg-gray-50"} focus:outline-none pr-8 appearance-none`}
                    placeholder={config.name?.placeholder}
                  />
                  {renderTooltipIcon(config.name?.tooltip, "name")}
                </div>
              </div>

              {/* Campo Alunos */}
              {!isCreating ? (
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
              ) : null}

              {/* Campo Turno/Horário */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {config.shift?.label}
                  {isCreating && <span className="text-red-500 ml-1">*</span>}
                </label>
                <div className="flex gap-2">
                  <select
                    name="shift"
                    value={formData.shift || "Vespertino"}
                    onChange={handleInputChange}
                    disabled={!isCreating && !isEditing}
                    className={`p-2 rounded-md border border-gray-300 ${
                      isEditing || isCreating ? "bg-white appearance-auto" : "bg-gray-50 appearance-none"
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
                    readOnly={!isCreating && !isEditing}
                    className={`w-full p-2 rounded-md border ${
                      isCreating && !formData.fullTime.trim() ? "border-red-300" : "border-gray-300"
                    } ${isEditing || isCreating ? "bg-white" : "bg-gray-50"} focus:outline-none appearance-none`}
                    placeholder={config.fullTime?.placeholder}
                  />
                </div>
              </div>

              {/* Campo Quantidade de Alunos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {config.students?.label}
                  {isCreating && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                  type="number"
                  name="students"
                  value={formData.students}
                  readOnly={!isCreating && !isEditing}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded-md border ${
                    isCreating && formData.students <= 0 ? "border-red-300" : "border-gray-300"
                  } ${isEditing || isCreating ? "bg-white" : "bg-gray-50"} focus:outline-none appearance-none`}
                  placeholder={config.students?.placeholder}
                />
              </div>
            </div>

            {isCreating && (
              <div className="mt-4 text-sm text-gray-500">
                <span className="text-red-500">*</span> Campos obrigatórios
              </div>
            )}

            <div className="flex justify-between gap-4 mt-8">
              {/* Delete button - only show in view mode for existing classes */}
              {!isCreating && !isEditing && onDelete && (
                <button
                  onClick={handleDelete}
                  className="px-6 py-2 bg-[#F13F00] text-white rounded-md hover:bg-opacity-90 transition-colors font-medium flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  {fieldLabels.deleteButton || "Excluir Turma"}
                </button>
              )}

              <div className={`flex gap-4 ${!isCreating && !isEditing && onDelete ? "ml-auto" : "w-full justify-end"}`}>
                {isCreating ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-2 bg-[#F13F00] text-white rounded-md hover:bg-opacity-90 transition-colors font-medium"
                    >
                      {fieldLabels.cancelButton || "Cancelar"}
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2 bg-[#319F43] text-white rounded-md hover:bg-opacity-90 transition-colors font-medium"
                    >
                      {fieldLabels.createButton || "Criar Turma"}
                    </button>
                  </>
                ) : isEditing ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-2 bg-[#F13F00] text-white rounded-md hover:bg-opacity-90 transition-colors font-medium"
                    >
                      {fieldLabels.cancelButton || "Cancelar"}
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2 bg-[#319F43] text-white rounded-md hover:bg-opacity-90 transition-colors font-medium"
                    >
                      {fieldLabels.confirmButton || "Confirmar"}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-[#02335E] text-white rounded-md hover:bg-opacity-90 transition-colors font-medium"
                  >
                    {fieldLabels.doneButton || "Concluído"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert popup */}
      {showAlert && <Alert message={alertMessage} onClose={() => setShowAlert(false)} />}

      {/* Cancel confirmation dialog */}
      <ConfirmationDialog
        isOpen={showCancelConfirmation}
        onClose={() => setShowCancelConfirmation(false)}
        onConfirm={() => {
          if (isCreating) {
            onClose()
          } else {
            setIsEditing(false)
            // Reset form data to original values
            setFormData({
              ...(classData || defaultClassData),
              shift: classData?.shift || defaultClassData.shift || "Vespertino",
              fullTime: classData?.fullTime || classData?.time || "",
            })
          }
        }}
        title={fieldLabels.cancelConfirmTitle || "Descartar alterações"}
        message={fieldLabels.cancelConfirmMessage || "Tem certeza que deseja descartar as alterações feitas?"}
        confirmButtonText={fieldLabels.cancelConfirmYes || "Sim, descartar"}
        cancelButtonText={fieldLabels.cancelConfirmNo || "Não, continuar editando"}
        confirmButtonColor="#F13F00"
        cancelButtonColor="#003366"
      />

      {/* Delete confirmation dialog */}
      <ConfirmationDialog
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={confirmDelete}
        title="Excluir turma"
        message="Tem certeza que deseja excluir a turma?"
        confirmButtonText="Sim, excluir"
        cancelButtonText="Não, cancelar"
        confirmButtonColor="#F13F00"
        cancelButtonColor="#003366"
      />
    </>
  )
}
