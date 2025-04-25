"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Pencil, AlertCircle, XCircle, CalendarIcon } from "lucide-react"
import { ConfirmationDialog } from "./confirmation-dialog"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar } from "@/components/ui/calendar"
import { format, parse } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useRouter } from "next/navigation"

// Tipo para os dados do conselho
type ConselhoData = {
  responsavel: string
  local: string
  auxiliar: string
  data: string
  horario: string
  turmas: string[]
  professores: string[]
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

// Componente de popup para seleção de turmas ou professores
type SelectionPopupProps = {
  title: string
  items: { id: string; name: string }[]
  selectedItems: string[]
  onSelect: (selectedItems: string[]) => void
  onClose: () => void
}

const SelectionPopup = ({ title, items, selectedItems, onSelect, onClose }: SelectionPopupProps) => {
  const [selected, setSelected] = useState<string[]>(selectedItems)

  const handleToggleItem = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id))
    } else {
      setSelected([...selected, id])
    }
  }

  const handleConfirm = () => {
    onSelect(selected)
    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-[100]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        ></motion.div>
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative z-10 mx-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-[#003366]">{title}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="mb-2">
                <label className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.includes(item.id)}
                    onChange={() => handleToggleItem(item.id)}
                    className="rounded text-[#003366] focus:ring-[#003366]"
                  />
                  <span>{item.name}</span>
                </label>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md mr-2 hover:bg-gray-50">
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-[#003366] text-white rounded-md hover:bg-opacity-90"
            >
              Confirmar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Componente de calendário popup
type DatePickerProps = {
  selectedDate: Date | undefined
  onSelect: (date: Date | undefined) => void
  onClose: () => void
}

const DatePickerPopup = ({ selectedDate, onSelect, onClose }: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(selectedDate)

  const handleSelect = (newDate: Date | undefined) => {
    setDate(newDate)
    if (newDate) {
      onSelect(newDate)
      onClose()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-[100]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        ></motion.div>
        <motion.div
          className="bg-white rounded-lg shadow-lg p-4 relative z-10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-[#003366]">Selecionar Data</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>
          <Calendar mode="single" selected={date} onSelect={handleSelect} locale={ptBR} className="border rounded-md" />
          <div className="flex justify-end mt-4">
            <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md mr-2 hover:bg-gray-50">
              Cancelar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

type PopupConselhoClasseProps = {
  onClose: () => void
  isCreating?: boolean
}

export function PopupConselhoClasse({ onClose, isCreating = true }: PopupConselhoClasseProps) {
  const router = useRouter()
  // Dados fictícios para turmas e professores
  const turmas = [
    { id: "t1", name: "MI-74 PSIN 2023/2" },
    { id: "t2", name: "WF-78 PSIN 2024/1" },
    { id: "t3", name: "MQ-75 PSIN 2024/2" },
    { id: "t4", name: "JB-76 PSIN 2023/2" },
    { id: "t5", name: "MI-75 PSIN 2023/2" },
    { id: "t6", name: "FG-75 PSIN 2023/2" },
    { id: "t7", name: "TP-74 PSIN 2023/2" },
    { id: "t8", name: "FA-73 PSIN 2023/2" },
  ]

  const professores = [
    { id: "p1", name: "Romário Hornburg" },
    { id: "p2", name: "Kristian Erdermann" },
    { id: "p3", name: "João Pedro Valentim" },
    { id: "p4", name: "Roberto Baungartel" },
    { id: "p5", name: "Bruno da Silva Andrade" },
    { id: "p6", name: "Vinicius Jacobowski" },
    { id: "p7", name: "Fabiano da Silva" },
  ]

  const [formData, setFormData] = useState<ConselhoData>({
    responsavel: "",
    local: "",
    auxiliar: "",
    data: "",
    horario: "",
    turmas: [],
    professores: [],
  })

  const [isEditing, setIsEditing] = useState(isCreating)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [showTurmasPopup, setShowTurmasPopup] = useState(false)
  const [showProfessoresPopup, setShowProfessoresPopup] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    setHasChanges(true) // Mark that changes have been made
  }

  const handleTurmasSelect = (selectedTurmas: string[]) => {
    setFormData({
      ...formData,
      turmas: selectedTurmas,
    })
    setHasChanges(true)
  }

  const handleProfessoresSelect = (selectedProfessores: string[]) => {
    setFormData({
      ...formData,
      professores: selectedProfessores,
    })
    setHasChanges(true)
  }

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, "dd/MM/yyyy")
      setFormData({
        ...formData,
        data: formattedDate,
      })
      setHasChanges(true)
    }
  }

  const getSelectedDate = (): Date | undefined => {
    if (!formData.data) return undefined
    try {
      return parse(formData.data, "dd/MM/yyyy", new Date())
    } catch (error) {
      return undefined
    }
  }

  const validateForm = () => {
    // Verificar campos obrigatórios
    if (!formData.responsavel.trim()) {
      setAlertMessage("Por favor, preencha o nome do responsável.")
      setShowAlert(true)
      return false
    }

    if (!formData.local.trim()) {
      setAlertMessage("Por favor, informe o local.")
      setShowAlert(true)
      return false
    }

    if (!formData.data.trim()) {
      setAlertMessage("Por favor, informe a data.")
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
      console.log("Dados do conselho:", formData)

      // Redirecionar para a página de pré-conselho
      router.push("/pedagogical-technique/pre-conselho-off-pedagogical-technique")
    } catch (error) {
      setAlertMessage("Erro ao salvar o conselho. Tente novamente!")
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
      }
    }
  }

  const handleClosePopup = () => {
    if (hasChanges && isEditing) {
      setShowCancelConfirmation(true)
    } else {
      setIsClosing(true)
    }
  }

  // Função para obter os nomes das turmas selecionadas
  const getSelectedTurmasText = () => {
    if (formData.turmas.length === 0) return ""
    return turmas
      .filter((turma) => formData.turmas.includes(turma.id))
      .map((turma) => turma.name)
      .join(", ")
  }

  // Função para obter os nomes dos professores selecionados
  const getSelectedProfessoresText = () => {
    if (formData.professores.length === 0) return ""
    return professores
      .filter((professor) => formData.professores.includes(professor.id))
      .map((professor) => professor.name)
      .join(", ")
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
              {/* Cabeçalho */}
              <div className="bg-[#003366] text-white p-6 relative">
                <h2 className="text-2xl sm:text-3xl font-bold text-center">Conselho de Classe</h2>

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Responsável */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Responsável</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="responsavel"
                        value={formData.responsavel}
                        readOnly={!isEditing}
                        onChange={handleInputChange}
                        autoComplete="off"
                        className={`w-full p-2 rounded-md border border-gray-300 ${
                          isEditing ? "bg-white" : "bg-gray-50"
                        } focus:outline-none pr-8 appearance-none transition-all duration-200`}
                      />
                    </div>
                  </div>

                  {/* Local */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="local"
                        value={formData.local}
                        readOnly={!isEditing}
                        onChange={handleInputChange}
                        autoComplete="off"
                        className={`w-full p-2 rounded-md border border-gray-300 ${
                          isEditing ? "bg-white" : "bg-gray-50"
                        } focus:outline-none pr-8 appearance-none transition-all duration-200`}
                      />
                    </div>
                  </div>

                  {/* Auxiliar */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Auxiliar</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="auxiliar"
                        value={formData.auxiliar}
                        readOnly={!isEditing}
                        onChange={handleInputChange}
                        autoComplete="off"
                        className={`w-full p-2 rounded-md border border-gray-300 ${
                          isEditing ? "bg-white" : "bg-gray-50"
                        } focus:outline-none pr-8 appearance-none transition-all duration-200`}
                      />
                    </div>
                  </div>

                  {/* Data/Horário */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data/Horário</label>
                    <div className="flex gap-2">
                      <div className="relative flex-grow">
                        <input
                          type="text"
                          name="data"
                          value={formData.data}
                          readOnly={true} // Sempre somente leitura, pois usamos o calendário
                          placeholder="DD/MM/AAAA"
                          autoComplete="off"
                          className={`w-full p-2 rounded-md border border-gray-300 ${
                            isEditing ? "bg-white cursor-pointer" : "bg-gray-50"
                          } focus:outline-none pr-8 appearance-none transition-all duration-200`}
                          onClick={() => {
                            if (isEditing) setShowDatePicker(true)
                          }}
                        />
                        {isEditing && (
                          <button
                            onClick={() => setShowDatePicker(true)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#003366]"
                          >
                            <CalendarIcon className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        name="horario"
                        value={formData.horario}
                        readOnly={!isEditing}
                        onChange={handleInputChange}
                        placeholder="HH:MM"
                        autoComplete="off"
                        className={`w-1/3 p-2 rounded-md border border-gray-300 ${
                          isEditing ? "bg-white" : "bg-gray-50"
                        } focus:outline-none appearance-none transition-all duration-200`}
                      />
                    </div>
                  </div>

                  {/* Turmas */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Turmas</label>
                    <div className="relative">
                      <input
                        type="text"
                        readOnly
                        value={getSelectedTurmasText()}
                        placeholder="Selecione as turmas"
                        className={`w-full p-2 rounded-md border border-gray-300 ${
                          isEditing ? "bg-white" : "bg-gray-50"
                        } focus:outline-none pr-8 appearance-none transition-all duration-200 ${
                          isEditing ? "cursor-pointer" : ""
                        }`}
                        onClick={() => {
                          if (isEditing) setShowTurmasPopup(true)
                        }}
                      />
                      {isEditing && (
                        <button
                          onClick={() => setShowTurmasPopup(true)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#003366]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="12" y1="8" x2="12" y2="16"></line>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Professores */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Professores</label>
                    <div className="relative">
                      <input
                        type="text"
                        readOnly
                        value={getSelectedProfessoresText()}
                        placeholder="Selecione os professores"
                        className={`w-full p-2 rounded-md border border-gray-300 ${
                          isEditing ? "bg-white" : "bg-gray-50"
                        } focus:outline-none pr-8 appearance-none transition-all duration-200 ${
                          isEditing ? "cursor-pointer" : ""
                        }`}
                        onClick={() => {
                          if (isEditing) setShowProfessoresPopup(true)
                        }}
                      />
                      {isEditing && (
                        <button
                          onClick={() => setShowProfessoresPopup(true)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#003366]"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="12" y1="8" x2="12" y2="16"></line>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between gap-4 mt-8">
                  <div className="flex gap-4 ml-auto">
                    {isCreating ? (
                      <>
                        <button
                          onClick={handleCancel}
                          className="px-6 py-2 bg-[#F13F00] text-white rounded-md hover:bg-opacity-90 transition-colors font-medium"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={handleSubmit}
                          className="px-6 py-2 bg-[#319F43] text-white rounded-md hover:bg-opacity-90 transition-colors font-medium"
                        >
                          Criar Conselho
                        </button>
                      </>
                    ) : isEditing ? (
                      <>
                        <button
                          onClick={handleCancel}
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
                        onClick={handleClosePopup}
                        className="px-6 py-2 bg-[#02335E] text-white rounded-md hover:bg-opacity-90 transition-colors font-medium"
                      >
                        Concluído
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
          }
          setShowCancelConfirmation(false)
        }}
        title="Descartar alterações"
        message="Tem certeza que deseja descartar as alterações feitas?"
        confirmButtonText="Sim, descartar"
        cancelButtonText="Não, continuar editando"
        confirmButtonColor="#F13F00"
        cancelButtonColor="#003366"
      />

      {/* Popup de seleção de turmas */}
      {showTurmasPopup && (
        <SelectionPopup
          title="Selecionar Turmas"
          items={turmas}
          selectedItems={formData.turmas}
          onSelect={handleTurmasSelect}
          onClose={() => setShowTurmasPopup(false)}
        />
      )}

      {/* Popup de seleção de professores */}
      {showProfessoresPopup && (
        <SelectionPopup
          title="Selecionar Professores"
          items={professores}
          selectedItems={formData.professores}
          onSelect={handleProfessoresSelect}
          onClose={() => setShowProfessoresPopup(false)}
        />
      )}

      {/* Calendário para seleção de data */}
      {showDatePicker && (
        <DatePickerPopup
          selectedDate={getSelectedDate()}
          onSelect={handleDateSelect}
          onClose={() => setShowDatePicker(false)}
        />
      )}
    </>
  )
}
