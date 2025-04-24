"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Pencil, AlertCircle, Info, XCircle, Trash2, BookOpen } from "lucide-react"
import { ConfirmationDialog } from "./confirmation-dialog"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"

// Tipo para os dados do aluno
type AlunoData = {
  id?: string
  username: string
  email: string
  workShift: string
  workloadWeek: number
  password?: string // Adicionando campo de senha
  currentCourse?: {
    id: string
    name: string
  } | null
  classIds?: string[]
}

// Tipo para os dados do curso para seleção
type CourseOption = {
  id: string
  name: string
  type: string
  workload: number
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

// Modificar o componente CourseSelector para buscar e exibir corretamente o curso atual
const CourseSelector = ({
  selectedCourseId,
  onCourseSelect,
  isEditing,
}: {
  selectedCourseId?: string | null
  onCourseSelect: (courseId: string | null) => void
  isEditing: boolean
}) => {
  const [courses, setCourses] = useState<CourseOption[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentCourseName, setCurrentCourseName] = useState<string | null>(null)

  // Efeito para buscar os cursos quando o componente é montado ou quando o modo de edição muda
  useEffect(() => {
    // Sempre buscar todos os cursos para ter a lista completa
    fetchCourses()

    // Se temos um ID de curso selecionado, buscar os detalhes desse curso específico
    if (selectedCourseId) {
      fetchCurrentCourse()
    }
  }, [isEditing, selectedCourseId])

  const fetchCurrentCourse = async () => {
    if (!selectedCourseId) return

    setIsLoading(true)
    try {
      const response = await axios.get(`http://localhost:9090/course/findByUuid/${selectedCourseId}`, {
        withCredentials: true,
      })
      setCurrentCourseName(response.data.nameCourse)
    } catch (err) {
      console.error("Erro ao buscar curso atual:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCourses = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.get("http://localhost:9090/course/find/all?page=0", {
        withCredentials: true,
      })
      const coursesData = response.data.content || []

      const formattedCourses = coursesData.map((course: any) => ({
        id: course.uuid,
        name: course.nameCourse,
        type: course.typeCourse,
        workload: course.workloadCourse,
      }))

      setCourses(formattedCourses)
    } catch (err) {
      console.error("Erro ao buscar cursos:", err)
      setError("Não foi possível carregar os cursos. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-4 border rounded-md p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-700 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[#003366]" />
          Curso Atual
        </h3>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#003366]"></div>
        </div>
      ) : isEditing ? (
        <select
          className="w-full p-2 rounded-md border border-gray-300 bg-white focus:outline-none"
          value={selectedCourseId || ""}
          onChange={(e) => onCourseSelect(e.target.value || null)}
        >
          <option value="">Nenhum curso selecionado</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name} - {course.type} ({course.workload}h)
            </option>
          ))}
        </select>
      ) : (
        <div className="p-2 bg-gray-100 rounded-md border border-gray-300">
          {selectedCourseId ? (
            currentCourseName ? (
              <span className="font-medium">{currentCourseName}</span>
            ) : (
              <span className="text-gray-500">Carregando informações do curso...</span>
            )
          ) : (
            <span className="text-gray-500">Nenhum curso selecionado</span>
          )}
        </div>
      )}
    </div>
  )
}

// Tipo para as labels e placeholders
type FieldLabels = {
  username?: string
  email?: string
  workShift?: string
  workloadWeek?: string
  password?: string
  createButton?: string
  cancelButton?: string
  confirmButton?: string
  doneButton?: string
  popupTitle?: string
  newAlunoTitle?: string
  deleteButton?: string
  cancelConfirmTitle?: string
  cancelConfirmMessage?: string
  cancelConfirmYes?: string
  cancelConfirmNo?: string
}

type FieldPlaceholders = {
  username?: string
  email?: string
  workShift?: string
  workloadWeek?: string
  password?: string
}

type PopupDadosAlunosProps = {
  alunoData?: AlunoData
  onClose: () => void
  fieldConfig?: Record<string, FieldConfig>
  onUpdate?: (updatedData: AlunoData) => void
  onCreate?: (newData: AlunoData) => void
  onDelete?: (id: string) => void
  isCreating?: boolean
  fieldLabels?: FieldLabels
  fieldPlaceholders?: FieldPlaceholders
}

export function PopupDadosAlunos({
  alunoData,
  onClose,
  fieldConfig,
  onUpdate,
  onCreate,
  onDelete,
  isCreating = false,
  fieldLabels = {},
  fieldPlaceholders = {},
}: PopupDadosAlunosProps) {
  // Configuração padrão dos campos
  const defaultFieldConfig: Record<string, FieldConfig> = {
    username: {
      label: fieldLabels.username || "Nome do aluno",
      editable: true,
      tooltip: null,
      placeholder: fieldPlaceholders.username || "Digite o nome do aluno",
    },
    email: {
      label: fieldLabels.email || "Email",
      editable: true,
      tooltip: null,
      placeholder: fieldPlaceholders.email || "exemplo@email.com",
    },
    password: {
      label: fieldLabels.password || "Senha",
      editable: true,
      tooltip: null,
      placeholder: fieldPlaceholders.password || "Digite a senha",
    },
    workShift: {
      label: fieldLabels.workShift || "Turno",
      editable: true,
      tooltip: null,
      placeholder: fieldPlaceholders.workShift || "Selecione o turno",
    },
    workloadWeek: {
      label: fieldLabels.workloadWeek || "Carga Horária Semanal",
      editable: true,
      tooltip: null,
      placeholder: fieldPlaceholders.workloadWeek || "0",
    },
  }

  // Usar a configuração fornecida ou a padrão
  const config = fieldConfig || defaultFieldConfig

  // Default values for creating a new aluno
  const defaultAlunoData: AlunoData = {
    username: "",
    email: "",
    workShift: "",
    workloadWeek: 0,
    password: "", // Senha padrão inicial
    currentCourse: null,
  }

  const [isEditing, setIsEditing] = useState(isCreating)
  const [formData, setFormData] = useState<AlunoData>(alunoData || defaultAlunoData)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(alunoData?.currentCourse?.id || null)
  const [availableCourses, setAvailableCourses] = useState<CourseOption[]>([])
  // Adicionar estado para armazenar os cursos
  const [courses, setCourses] = useState<CourseOption[]>([])

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
      [name]: name === "workloadWeek" ? Number(value) : value,
    })
    setHasChanges(true) // Mark that changes have been made
  }

  // Remover o console.log de depuração do handleCourseSelect
  const handleCourseSelect = (courseId: string | null) => {
    setSelectedCourseId(courseId)
    setHasChanges(true)
  }

  const validateForm = () => {
    // Verificar campos obrigatórios
    if (!formData.username.trim()) {
      setAlertMessage("Por favor, preencha o nome do aluno.")
      setShowAlert(true)
      return false
    }

    if (!formData.email.trim()) {
      setAlertMessage("Por favor, informe o email do aluno.")
      setShowAlert(true)
      return false
    }

    if (!formData.workShift) {
      setAlertMessage("Por favor, selecione o turno.")
      setShowAlert(true)
      return false
    }

    if (formData.workloadWeek <= 0) {
      setAlertMessage("Por favor, informe uma carga horária semanal válida.")
      setShowAlert(true)
      return false
    }

    return true
  }

  // Modificar o handleSubmit para garantir que o curso seja enviado corretamente
  const handleSubmit = async () => {
    // Validar o formulário antes de enviar
    if (!validateForm()) {
      return
    }

    try {
      // Preparar os dados para envio
      const dataToSubmit = {
        ...formData,
        currentCourse: selectedCourseId
          ? {
              id: selectedCourseId,
              // Buscar o nome do curso na lista de cursos disponíveis
              name: courses.find((c) => c.id === selectedCourseId)?.name || "",
            }
          : null,
      }

      if (isCreating && onCreate) {
        onCreate(dataToSubmit)
      } else if (onUpdate && alunoData?.id) {
        onUpdate(dataToSubmit)
      }
      setIsClosing(true)
    } catch (error) {
      setAlertMessage("Erro ao salvar o aluno. Tente novamente!")
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
        if (alunoData) {
          setFormData(alunoData)
          setSelectedCourseId(alunoData.currentCourse?.id || null)
        }
      }
    }
  }

  const handleDelete = () => {
    if (onDelete && alunoData?.id) {
      setShowDeleteConfirmation(true)
    }
  }

  const confirmDelete = () => {
    if (onDelete && alunoData?.id) {
      onDelete(alunoData.id)
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
              {/* Cabeçalho do popup */}
              <div className="bg-[#003366] text-white p-6 relative">
                <h2 className="text-2xl sm:text-3xl font-bold text-center">
                  {isCreating ? fieldLabels.newAlunoTitle || "Novo Aluno" : formData.username}
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
                {/* Formulário */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Campo Nome do Aluno */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {config.username?.label}
                      {isCreating && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        readOnly={!isEditing}
                        onChange={handleInputChange}
                        autoComplete="off"
                        className={`w-full p-2 rounded-md border ${
                          isCreating && !formData.username.trim() ? "border-red-300" : "border-gray-300"
                        } ${isEditing ? "bg-white" : "bg-gray-50"} focus:outline-none pr-8 appearance-none transition-all duration-200`}
                        placeholder={config.username?.placeholder}
                      />
                      {renderTooltipIcon(config.username?.tooltip)}
                    </div>
                  </div>

                  {/* Campo Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {config.email?.label}
                      {isCreating && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        readOnly={!isEditing}
                        onChange={handleInputChange}
                        autoComplete="off"
                        className={`w-full p-2 rounded-md border ${
                          isCreating && !formData.email.trim() ? "border-red-300" : "border-gray-300"
                        } ${isEditing ? "bg-white" : "bg-gray-50"} focus:outline-none pr-8 appearance-none transition-all duration-200`}
                        placeholder={config.email?.placeholder}
                      />
                      {renderTooltipIcon(config.email?.tooltip)}
                    </div>
                  </div>

                  {isCreating && (
                    <div className="col-span-2 mt-2 bg-blue-50 p-3 rounded-md border border-blue-200">
                      <p className="text-sm text-blue-700 flex items-center">
                        <Info className="h-4 w-4 mr-2 flex-shrink-0" />A senha padrão para todos os alunos é{" "}
                        <span className="font-bold mx-1">aluno@</span>
                      </p>
                    </div>
                  )}

                  {/* Campo Turno */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {config.workShift?.label}
                      {isCreating && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <div className="relative">
                      <select
                        name="workShift"
                        value={formData.workShift}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        autoComplete="off"
                        className={`w-full p-2 rounded-md border ${
                          isCreating && !formData.workShift ? "border-red-300" : "border-gray-300"
                        } ${
                          isEditing ? "bg-white appearance-auto" : "bg-gray-50 appearance-none"
                        } focus:outline-none transition-all duration-200`}
                      >
                        <option value="">{config.workShift?.placeholder}</option>
                        <option value="Manhã">Manhã</option>
                        <option value="Tarde">Tarde</option>
                        <option value="Noite">Noite</option>
                        <option value="Integral">Integral</option>
                      </select>
                    </div>
                  </div>

                  {/* Campo Carga Horária Semanal */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {config.workloadWeek?.label}
                      {isCreating && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="workloadWeek"
                        value={formData.workloadWeek || ""}
                        readOnly={!isEditing}
                        onChange={handleInputChange}
                        autoComplete="off"
                        className={`w-full p-2 rounded-md border ${
                          isCreating && formData.workloadWeek <= 0 ? "border-red-300" : "border-gray-300"
                        } ${
                          isEditing ? "bg-white" : "bg-gray-50"
                        } focus:outline-none pr-8 appearance-none transition-all duration-200`}
                        placeholder={config.workloadWeek?.placeholder}
                        min="0"
                      />
                      {renderTooltipIcon(config.workloadWeek?.tooltip)}
                    </div>
                  </div>
                </div>

                {/* Seletor de Curso */}
                <CourseSelector
                  selectedCourseId={selectedCourseId}
                  onCourseSelect={handleCourseSelect}
                  isEditing={isEditing}
                />

                {isCreating && (
                  <div className="mt-4 text-sm text-gray-500">
                    <span className="text-red-500">*</span> Campos obrigatórios
                  </div>
                )}

                <div className="flex justify-between gap-4 mt-8">
                  {/* Delete button - only show in view mode for existing alunos */}
                  {!isCreating && !isEditing && onDelete && (
                    <button
                      onClick={handleDelete}
                      className="px-6 py-2 bg-[#F13F00] text-white rounded-md hover:bg-opacity-90 transition-colors font-medium flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      {fieldLabels.deleteButton || "Excluir Aluno"}
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
                          {fieldLabels.createButton || "Criar Aluno"}
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
            if (alunoData) {
              setFormData(alunoData)
              setSelectedCourseId(alunoData.currentCourse?.id || null)
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
        title="Excluir aluno"
        message="Tem certeza que deseja excluir o aluno?"
        confirmButtonText="Sim, excluir"
        cancelButtonText="Não, cancelar"
        confirmButtonColor="#F13F00"
        cancelButtonColor="#003366"
      />
    </>
  )
}
