"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Pencil, AlertCircle, Info, XCircle, Trash2 } from "lucide-react"
import { ConfirmationDialog } from "./confirmation-dialog"
import { motion, AnimatePresence } from "framer-motion"

// Tipo para os dados do curso
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

// Componente de alerta
const Alert = ({ message, onClose }: AlertProps) => {
  return (
    <AnimatePresence>
      <motion.div
        key="alert-backdrop"
        className="fixed inset-0 flex items-center justify-center z-[100]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          key="alert-overlay"
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        ></motion.div>
        <motion.div
          key="alert-content"
          className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative z-10 mx-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Tipo para as labels e placeholders
type FieldLabels = {
  nameCourse?: string
  startAndEndLocation?: string
  typeCourse?: string
  shift?: string
  workloadCourse?: string
  time?: string
  createButton?: string
  cancelButton?: string
  confirmButton?: string
  doneButton?: string
  popupTitle?: string
  newCourseTitle?: string
  deleteButton?: string
  cancelConfirmTitle?: string
  cancelConfirmMessage?: string
  cancelConfirmYes?: string
  cancelConfirmNo?: string
}

type FieldPlaceholders = {
  nameCourse?: string
  startAndEndLocation?: string
  typeCourse?: string
  shift?: string
  workloadCourse?: string
  time?: string
}

type PopupDadosCursosProps = {
  courseData?: CourseData
  onClose: () => void
  fieldConfig?: Record<string, FieldConfig>
  onUpdate?: (updatedData: CourseData) => void
  onCreate?: (newData: CourseData) => void
  onDelete?: (id: string) => void
  isCreating?: boolean
  fieldLabels?: FieldLabels
  fieldPlaceholders?: FieldPlaceholders
}

export function PopupDadosCursos({
  courseData,
  onClose,
  fieldConfig,
  onUpdate,
  onCreate,
  onDelete,
  isCreating = false,
  fieldLabels = {},
  fieldPlaceholders = {},
}: PopupDadosCursosProps) {
  // Configuração padrão dos campos
  const defaultFieldConfig: Record<string, FieldConfig> = {
    nameCourse: {
      label: fieldLabels.nameCourse || "Nome do curso",
      editable: isCreating, // Apenas editável na criação, não na edição
      tooltip: isCreating
        ? null
        : {
            text: "Este campo não pode ser alterado",
            icon: "red",
          },
      placeholder: fieldPlaceholders.nameCourse || "Digite o nome do curso",
    },
    startAndEndLocation: {
      label: fieldLabels.startAndEndLocation || "Local e Data",
      editable: true,
      tooltip: null,
      placeholder: fieldPlaceholders.startAndEndLocation || "Ex: Sala 101, 01/01/2023 - 01/02/2023",
    },
    typeCourse: {
      label: fieldLabels.typeCourse || "Tipo de Curso",
      editable: true,
      tooltip: null,
      placeholder: fieldPlaceholders.typeCourse || "Selecione o tipo",
    },
    shift: {
      label: fieldLabels.shift || "Turno",
      editable: true,
      tooltip: null,
      placeholder: fieldPlaceholders.shift || "Selecione o turno",
    },
    workloadCourse: {
      label: fieldLabels.workloadCourse || "Carga Horária",
      editable: true,
      tooltip: null,
      placeholder: fieldPlaceholders.workloadCourse || "0",
    },
    time: {
      label: fieldLabels.time || "Tempo (em meses)",
      editable: true,
      tooltip: null,
      placeholder: fieldPlaceholders.time || "0",
    },
  }

  // Usar a configuração fornecida ou a padrão
  const config = fieldConfig || defaultFieldConfig

  // Default values for creating a new course
  const defaultCourseData: CourseData = {
    nameCourse: "",
    startAndEndLocation: "",
    typeCourse: "",
    shift: "",
    workloadCourse: 0,
    time: 0,
  }

  const [isEditing, setIsEditing] = useState(isCreating)
  const [formData, setFormData] = useState<CourseData>(courseData || defaultCourseData)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  // Efeito para animar o fechamento
  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose()
      }, 200) // Tempo da animação de saída
      return () => clearTimeout(timer)
    }
  }, [isClosing, onClose])

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
    setHasChanges(false) // Reset changes flag when toggling edit mode
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "workloadCourse" || name === "time" ? Number(value) : value,
    })
    setHasChanges(true) // Mark that changes have been made
  }

  const validateForm = () => {
    // Verificar campos obrigatórios
    if (!formData.nameCourse.trim()) {
      setAlertMessage("Por favor, preencha o nome do curso.")
      setShowAlert(true)
      return false
    }

    if (!formData.typeCourse) {
      setAlertMessage("Por favor, selecione o tipo de curso.")
      setShowAlert(true)
      return false
    }

    if (!formData.shift) {
      setAlertMessage("Por favor, selecione o turno.")
      setShowAlert(true)
      return false
    }

    if (formData.workloadCourse <= 0) {
      setAlertMessage("Por favor, informe uma carga horária válida.")
      setShowAlert(true)
      return false
    }

    return true
  }

  const handleSubmit = async () => {
    // Validar o formulário antes de enviar
    if (!validateForm()) {
      return
    }

    try {
      if (isCreating && onCreate) {
        onCreate(formData)
      } else if (onUpdate && courseData?.id) {
        onUpdate(formData)
      }
      setIsClosing(true)
    } catch (error) {
      setAlertMessage("Erro ao salvar o curso. Tente novamente!")
      setShowAlert(true)
    }
  }

  const handleCancel = () => {
    if (hasChanges && isEditing) {
      setShowCancelConfirmation(true)
    } else {
      if (isCreating) {
        setIsClosing(true)
      } else {
        setIsEditing(false)
        // Reset form data to original values
        if (courseData) {
          setFormData(courseData)
        }
      }
    }
  }

  const handleDelete = () => {
    if (onDelete && courseData?.id) {
      setShowDeleteConfirmation(true)
    }
  }

  const confirmDelete = () => {
    if (onDelete && courseData?.id) {
      onDelete(courseData.id)
      setIsClosing(true)
    }
  }

  const handleClosePopup = () => {
    if (hasChanges && isEditing) {
      setShowCancelConfirmation(true)
    } else {
      setIsClosing(true)
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
  const renderTooltipIcon = (config?: { text: string; icon: "red" | "white" | null } | null) => {
    if (!config) return null

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
      <AnimatePresence>
        {!isClosing && (
          <motion.div
            key="popup-backdrop"
            className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              key="popup-content"
              className="bg-white rounded-xl w-full max-w-2xl shadow-xl overflow-hidden border border-gray-200"
              style={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Conteúdo do popup permanece o mesmo */}
              <div className="bg-[#003366] text-white p-6 relative">
                <h2 className="text-2xl sm:text-3xl font-bold text-center">
                  {isCreating ? fieldLabels.newCourseTitle || "Novo Curso" : formData.nameCourse}
                </h2>

                <button
                  onClick={handleClosePopup}
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
                {/* Resto do conteúdo permanece o mesmo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Campo Nome do Curso */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {config.nameCourse?.label}
                      {isCreating && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="nameCourse"
                        value={formData.nameCourse}
                        readOnly={!isCreating} // Sempre somente leitura quando não estiver criando
                        onChange={handleInputChange}
                        autoComplete="off" // Desabilitar autocompletar
                        className={`w-full p-2 rounded-md border ${
                          isCreating && !formData.nameCourse.trim() ? "border-red-300" : "border-gray-300"
                        } ${isCreating ? "bg-white" : "bg-gray-50"} focus:outline-none pr-8 appearance-none transition-all duration-200`}
                        placeholder={config.nameCourse?.placeholder}
                      />
                      {!isCreating && renderTooltipIcon(config.nameCourse?.tooltip)}
                    </div>
                  </div>

                  {/* Campo Local e Data */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {config.startAndEndLocation?.label}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="startAndEndLocation"
                        value={formData.startAndEndLocation}
                        readOnly={!isCreating && !isEditing}
                        onChange={handleInputChange}
                        autoComplete="off" // Desabilitar autocompletar
                        className={`w-full p-2 rounded-md border border-gray-300 ${
                          isEditing || isCreating ? "bg-white" : "bg-gray-50"
                        } focus:outline-none pr-8 appearance-none transition-all duration-200`}
                        placeholder={config.startAndEndLocation?.placeholder}
                      />
                      {renderTooltipIcon(config.startAndEndLocation?.tooltip)}
                    </div>
                  </div>

                  {/* Campo Tipo de Curso */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {config.typeCourse?.label}
                      {isCreating && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <div className="relative">
                      <select
                        name="typeCourse"
                        value={formData.typeCourse}
                        onChange={handleInputChange}
                        disabled={!isCreating && !isEditing}
                        autoComplete="off" // Desabilitar autocompletar
                        className={`w-full p-2 rounded-md border ${
                          isCreating && !formData.typeCourse ? "border-red-300" : "border-gray-300"
                        } ${
                          isEditing || isCreating ? "bg-white appearance-auto" : "bg-gray-50 appearance-none"
                        } focus:outline-none transition-all duration-200`}
                      >
                        <option value="">{config.typeCourse?.placeholder}</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Online">Online</option>
                        <option value="Híbrido">Híbrido</option>
                      </select>
                    </div>
                  </div>

                  {/* Campo Turno */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {config.shift?.label}
                      {isCreating && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <div className="relative">
                      <select
                        name="shift"
                        value={formData.shift}
                        onChange={handleInputChange}
                        disabled={!isCreating && !isEditing}
                        autoComplete="off" // Desabilitar autocompletar
                        className={`w-full p-2 rounded-md border ${
                          isCreating && !formData.shift ? "border-red-300" : "border-gray-300"
                        } ${
                          isEditing || isCreating ? "bg-white appearance-auto" : "bg-gray-50 appearance-none"
                        } focus:outline-none transition-all duration-200`}
                      >
                        <option value="">{config.shift?.placeholder}</option>
                        <option value="Manhã">Manhã</option>
                        <option value="Tarde">Tarde</option>
                        <option value="Noite">Noite</option>
                        <option value="Integral">Integral</option>
                      </select>
                    </div>
                  </div>

                  {/* Campo Carga Horária */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {config.workloadCourse?.label}
                      {isCreating && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="workloadCourse"
                        value={formData.workloadCourse || ""}
                        readOnly={!isCreating && !isEditing}
                        onChange={handleInputChange}
                        autoComplete="off" // Desabilitar autocompletar
                        className={`w-full p-2 rounded-md border ${
                          isCreating && formData.workloadCourse <= 0 ? "border-red-300" : "border-gray-300"
                        } ${
                          isEditing || isCreating ? "bg-white" : "bg-gray-50"
                        } focus:outline-none pr-8 appearance-none transition-all duration-200`}
                        placeholder={config.workloadCourse?.placeholder}
                        min="0"
                      />
                      {renderTooltipIcon(config.workloadCourse?.tooltip)}
                    </div>
                  </div>

                  {/* Campo Tempo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{config.time?.label}</label>
                    <div className="relative">
                      <input
                        type="number"
                        name="time"
                        value={formData.time || ""}
                        readOnly={!isCreating && !isEditing}
                        onChange={handleInputChange}
                        autoComplete="off" // Desabilitar autocompletar
                        className={`w-full p-2 rounded-md border border-gray-300 ${
                          isEditing || isCreating ? "bg-white" : "bg-gray-50"
                        } focus:outline-none pr-8 appearance-none transition-all duration-200`}
                        placeholder={config.time?.placeholder}
                        min="0"
                      />
                      {renderTooltipIcon(config.time?.tooltip)}
                    </div>
                  </div>
                </div>

                {isCreating && (
                  <div className="mt-4 text-sm text-gray-500">
                    <span className="text-red-500">*</span> Campos obrigatórios
                  </div>
                )}

                <div className="flex justify-between gap-4 mt-8">
                  {/* Delete button - only show in view mode for existing courses */}
                  {!isCreating && !isEditing && onDelete && (
                    <button
                      onClick={handleDelete}
                      className="px-6 py-2 bg-[#F13F00] text-white rounded-md hover:bg-opacity-90 transition-colors font-medium flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      {fieldLabels.deleteButton || "Excluir Curso"}
                    </button>
                  )}

                  <div
                    className={`flex gap-4 ${!isCreating && !isEditing && onDelete ? "ml-auto" : "w-full justify-end"}`}
                  >
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
                          {fieldLabels.createButton || "Criar Curso"}
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
                        onClick={handleClosePopup}
                        className="px-6 py-2 bg-[#02335E] text-white rounded-md hover:bg-opacity-90 transition-colors font-medium"
                      >
                        {fieldLabels.doneButton || "Concluído"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alert popup */}
      {showAlert && <Alert message={alertMessage} onClose={() => setShowAlert(false)} />}

      {/* Cancel confirmation dialog */}
      <ConfirmationDialog
        isOpen={showCancelConfirmation}
        onClose={() => setShowCancelConfirmation(false)}
        onConfirm={() => {
          if (isCreating) {
            setIsClosing(true)
          } else {
            setIsEditing(false)
            // Reset form data to original values
            if (courseData) {
              setFormData(courseData)
            }
          }
          setShowCancelConfirmation(false)
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
        title="Excluir curso"
        message="Tem certeza que deseja excluir o curso?"
        confirmButtonText="Sim, excluir"
        cancelButtonText="Não, cancelar"
        confirmButtonColor="#F13F00"
        cancelButtonColor="#003366"
      />
    </>
  )
}
