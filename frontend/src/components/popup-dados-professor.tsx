"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Pencil, AlertCircle, Trash2, XCircle } from "lucide-react"
import { ConfirmationDialog } from "./confirmation-dialog"

// Tipo para os dados do professor
type ProfessorData = {
  id: number
  name: string
  email: string
  department?: string // Mantido para compatibilidade, mas não será exibido
  hours: number
  photoUrl: string | null
  color: string
  initials?: string
  classes?: string[]
  shift?: string
  professionalArea?: string
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

// Tipo para o alerta
type AlertProps = {
  message: string
  onClose: () => void
}

// Componente de alerta personalizado
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
  name?: string
  email?: string
  hours?: string
  classes?: string
  shift?: string
  professionalArea?: string
  createButton?: string
  cancelButton?: string
  confirmButton?: string
  doneButton?: string
  popupTitle?: string
  newProfessorTitle?: string
  deleteButton?: string
  cancelConfirmTitle?: string
  cancelConfirmMessage?: string
  cancelConfirmYes?: string
  cancelConfirmNo?: string
  viewClassesButton?: string
  addClassButton?: string
  removeClassButton?: string
  classesTitle?: string
}

type FieldPlaceholders = {
  name?: string
  email?: string
  hours?: string
  shift?: string
  professionalArea?: string
}

type PopupDadosProfessorProps = {
  professorData?: ProfessorData
  onClose: () => void
  fieldConfig?: Record<string, FieldConfig>
  onUpdate?: (updatedData: ProfessorData) => void
  onCreate?: (newData: ProfessorData) => void
  onDelete?: (id: number) => void
  isCreating?: boolean
  fieldLabels?: FieldLabels
  fieldPlaceholders?: FieldPlaceholders
}

export function PopupDadosProfessor({
  professorData,
  onClose,
  fieldConfig,
  onUpdate,
  onCreate,
  onDelete,
  isCreating = false,
  fieldLabels = {},
  fieldPlaceholders = {},
}: PopupDadosProfessorProps) {
  // Adicionar o estado para o modal de turmas
  const [showClassesModal, setShowClassesModal] = useState(false)
  const [newClass, setNewClass] = useState("")

  // Atualizar a configuração padrão dos campos para incluir os novos campos
  const defaultFieldConfig: Record<string, FieldConfig> = {
    name: {
      label: fieldLabels.name || "Nome do professor",
      editable: true,
      tooltip: null,
      placeholder: fieldPlaceholders.name || "Digite o nome do professor",
    },
    email: {
      label: fieldLabels.email || "Email do professor",
      editable: true,
      tooltip: null,
      placeholder: fieldPlaceholders.email || "professor@dominio.com",
    },
    professionalArea: {
      label: fieldLabels.professionalArea || "Área profissionalizante",
      editable: true,
      tooltip: null,
      placeholder: fieldPlaceholders.professionalArea || "Digite a área profissionalizante",
    },
    hours: {
      label: fieldLabels.hours || "Carga horária semanal",
      editable: true,
      tooltip: null,
      placeholder: fieldPlaceholders.hours || "20",
    },
    shift: {
      label: fieldLabels.shift || "Turno",
      editable: true,
      tooltip: null,
      placeholder: fieldPlaceholders.shift || "Selecione o turno",
    },
    classes: {
      label: fieldLabels.classes || "Turmas",
      editable: true,
      tooltip: null,
    },
  }

  // Usar a configuração fornecida ou a padrão
  const config = fieldConfig || defaultFieldConfig

  // Default values for creating a new professor
  const defaultProfessorData: ProfessorData = {
    id: Date.now(),
    name: "",
    email: "",
    hours: 20,
    photoUrl: null,
    color: "#003366",
    classes: [],
    shift: "",
    professionalArea: "",
  }

  const [isEditing, setIsEditing] = useState(isCreating)
  const [formData, setFormData] = useState<ProfessorData>({
    ...(professorData || defaultProfessorData),
  })
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  // Gerar iniciais do nome
  useEffect(() => {
    if (formData.name) {
      const initials = formData.name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .substring(0, 2)
      setFormData((prev) => ({
        ...prev,
        initials,
      }))
    }
  }, [formData.name])

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
    setHasChanges(false) // Reset changes flag when toggling edit mode
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "hours" ? Number.parseInt(value) || 0 : value,
    })
    setHasChanges(true) // Mark that changes have been made
  }

  // Adicionar função para gerenciar turmas
  const handleAddClass = () => {
    if (newClass.trim() !== "") {
      setFormData({
        ...formData,
        classes: [...(formData.classes || []), newClass.trim()],
      })
      setNewClass("")
      setHasChanges(true)
    }
  }

  const handleRemoveClass = (index: number) => {
    const updatedClasses = [...(formData.classes || [])]
    updatedClasses.splice(index, 1)
    setFormData({
      ...formData,
      classes: updatedClasses,
    })
    setHasChanges(true)
  }

  // Atualizar a validação do formulário para incluir os novos campos obrigatórios
  const validateForm = () => {
    // Verificar campos obrigatórios
    if (!formData.name.trim()) {
      setAlertMessage("Por favor, preencha o nome do professor.")
      setShowAlert(true)
      return false
    }

    if (!formData.email?.trim()) {
      setAlertMessage("Por favor, preencha o email do professor.")
      setShowAlert(true)
      return false
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email || "")) {
      setAlertMessage("Por favor, informe um email válido.")
      setShowAlert(true)
      return false
    }

    if (!formData.professionalArea?.trim()) {
      setAlertMessage("Por favor, preencha a área profissionalizante.")
      setShowAlert(true)
      return false
    }

    if (formData.hours <= 0) {
      setAlertMessage("Por favor, informe uma carga horária válida.")
      setShowAlert(true)
      return false
    }

    if (!formData.shift?.trim()) {
      setAlertMessage("Por favor, selecione o turno.")
      setShowAlert(true)
      return false
    }

    return true
  }

  const handleSubmit = () => {
    // Validar o formulário antes de enviar
    if (!validateForm()) {
      return
    }

    if (isCreating && onCreate) {
      onCreate(formData)
    } else if (onUpdate) {
      onUpdate(formData)
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
    if (onDelete && professorData) {
      setShowDeleteConfirmation(true)
    }
  }

  const confirmDelete = () => {
    if (onDelete && professorData) {
      onDelete(professorData.id)
      onClose()
    }
  }

  // Adicionar o componente modal de turmas
  const ClassesModal = () => {
    return (
      <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-[60] p-4">
        <div className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden border border-gray-200">
          <div className="bg-[#003366] text-white p-4 relative">
            <h2 className="text-xl font-bold text-center">{fieldLabels.classesTitle || "Gerenciar Turmas"}</h2>
            <button
              onClick={() => setShowClassesModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                value={newClass}
                onChange={(e) => setNewClass(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md"
                placeholder="Nome da turma"
              />
              <button
                onClick={handleAddClass}
                className="px-3 py-2 bg-[#319F43] text-white rounded-md hover:bg-opacity-90 transition-colors"
              >
                {fieldLabels.addClassButton || "Adicionar"}
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {formData.classes && formData.classes.length > 0 ? (
                <ul className="space-y-2">
                  {formData.classes.map((className, index) => (
                    <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                      <span>{className}</span>
                      <button onClick={() => handleRemoveClass(index)} className="text-red-500 hover:text-red-700">
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500 py-4">Nenhuma turma adicionada</p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Substituir a renderização dos campos no return para incluir os novos campos
  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
        <div
          className="bg-white rounded-xl w-full max-w-2xl shadow-xl overflow-hidden border border-gray-200"
          style={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="bg-[#003366] text-white p-6 relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-center">
              {isCreating ? fieldLabels.newProfessorTitle || "Novo Professor" : formData.name}
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
            <div className="flex items-center justify-center mb-6">
              {formData.photoUrl ? (
                <img
                  src={formData.photoUrl || "/placeholder.svg"}
                  alt={formData.name}
                  className="w-24 h-24 rounded-full object-cover border-4"
                  style={{ borderColor: formData.color }}
                />
              ) : (
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white"
                  style={{ backgroundColor: formData.color }}
                >
                  {formData.initials || ""}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Campo Nome do Professor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {config.name?.label}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    readOnly={!isEditing}
                    onChange={handleInputChange}
                    className={`w-full p-2 rounded-md border ${
                      isCreating && !formData.name.trim() ? "border-red-300" : "border-gray-300"
                    } ${isEditing ? "bg-white" : "bg-gray-50"} focus:outline-none appearance-none`}
                    placeholder={config.name?.placeholder}
                  />
                </div>
              </div>

              {/* Campo Email do Professor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {config.email?.label}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    readOnly={!isEditing}
                    onChange={handleInputChange}
                    className={`w-full p-2 rounded-md border ${
                      isCreating && !formData.email?.trim() ? "border-red-300" : "border-gray-300"
                    } ${isEditing ? "bg-white" : "bg-gray-50"} focus:outline-none appearance-none`}
                    placeholder={config.email?.placeholder}
                  />
                </div>
              </div>

              {/* Campo Área Profissionalizante */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {config.professionalArea?.label}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="professionalArea"
                    value={formData.professionalArea || ""}
                    readOnly={!isEditing}
                    onChange={handleInputChange}
                    className={`w-full p-2 rounded-md border ${
                      isCreating && !formData.professionalArea?.trim() ? "border-red-300" : "border-gray-300"
                    } ${isEditing ? "bg-white" : "bg-gray-50"} focus:outline-none appearance-none`}
                    placeholder={config.professionalArea?.placeholder}
                  />
                </div>
              </div>

              {/* Campo Carga Horária */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {config.hours?.label}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="hours"
                    value={formData.hours}
                    readOnly={!isEditing}
                    onChange={handleInputChange}
                    className={`w-full p-2 rounded-md border ${
                      isCreating && formData.hours <= 0 ? "border-red-300" : "border-gray-300"
                    } ${isEditing ? "bg-white" : "bg-gray-50"} focus:outline-none appearance-none`}
                    placeholder={config.hours?.placeholder}
                  />
                </div>
              </div>

              {/* Campo Turno */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {config.shift?.label}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <select
                    name="shift"
                    value={formData.shift || ""}
                    disabled={!isEditing}
                    onChange={handleInputChange}
                    className={`w-full p-2 rounded-md border ${
                      isCreating && !formData.shift?.trim() ? "border-red-300" : "border-gray-300"
                    } ${isEditing ? "bg-white" : "bg-gray-50"} focus:outline-none appearance-none`}
                  >
                    <option value="">Selecione o turno</option>
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Noite">Noite</option>
                    <option value="Integral">Integral</option>
                  </select>
                </div>
              </div>

              {/* Campo Turmas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{config.classes?.label}</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowClassesModal(true)}
                    disabled={!isEditing && formData.classes?.length === 0}
                    className={`w-full p-2 rounded-md border border-gray-300 text-left flex justify-between items-center ${
                      isEditing ? "bg-white hover:bg-gray-50" : "bg-gray-50"
                    } focus:outline-none`}
                  >
                    <span>
                      {formData.classes?.length
                        ? `${formData.classes.length} turma${formData.classes.length !== 1 ? "s" : ""}`
                        : "Nenhuma turma"}
                    </span>
                    <span className="text-[#003366]">{fieldLabels.viewClassesButton || "Visualizar"}</span>
                  </button>
                </div>
              </div>
            </div>

            {isCreating && (
              <div className="mt-4 text-sm text-gray-500">
                <span className="text-red-500">*</span> Campos obrigatórios
              </div>
            )}

            <div className="flex justify-between gap-4 mt-8">
              {/* Delete button - only show in view mode for existing professors */}
              {!isCreating && !isEditing && onDelete && (
                <button
                  onClick={handleDelete}
                  className="px-6 py-2 bg-[#F13F00] text-white rounded-md hover:bg-opacity-90 transition-colors font-medium flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  {fieldLabels.deleteButton || "Excluir Professor"}
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
                      {fieldLabels.createButton || "Criar Professor"}
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

      {/* Classes modal */}
      {showClassesModal && <ClassesModal />}

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
              ...(professorData || defaultProfessorData),
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
        title="Excluir professor"
        message="Tem certeza que deseja excluir o professor?"
        confirmButtonText="Sim, excluir"
        cancelButtonText="Não, cancelar"
        confirmButtonColor="#F13F00"
        cancelButtonColor="#003366"
      />
    </>
  )
}
