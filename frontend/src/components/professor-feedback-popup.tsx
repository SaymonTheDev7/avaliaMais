"use client"

import type React from "react"

import { X } from "lucide-react"
import { useEffect } from "react"

interface ProfessorFeedbackPopupProps {
  professor: {
    id: number
    name: string
    department?: string
    hours: number
    photoUrl: string | null
    color: string
    email?: string
    shift?: string
    professionalArea?: string
  }
  onClose: () => void
}

export function ProfessorFeedbackPopup({ professor, onClose }: ProfessorFeedbackPopupProps) {
  // Fechar o popup ao pressionar ESC
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscKey)
    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [onClose])

  // Impedir que cliques dentro do popup fechem o popup
  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const initials = professor.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .substring(0, 2)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      style={{ backdropFilter: "blur(5px)" }}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden" onClick={handlePopupClick}>
        <div className="flex items-center justify-between bg-[#003366] text-white p-6">
          <div className="flex items-center gap-3">
            {professor.photoUrl ? (
              <img
                src={professor.photoUrl || "/placeholder.svg"}
                alt={professor.name}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div
                className="h-12 w-12 rounded-full flex items-center justify-center text-xl font-bold"
                style={{ backgroundColor: professor.color }}
              >
                {initials}
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold">{professor.name}</h2>
              <p className="text-sm text-white/80">{professor.professionalArea || professor.department}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#003366] mb-2">Informações do Professor</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-base font-medium text-[#003366]">
                  {professor.email || `${professor.name.toLowerCase().replace(/\s+/g, ".")}@email.com`}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Carga Horária</p>
                <p className="text-base font-medium text-[#003366]">{professor.hours} horas</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Turno</p>
                <p className="text-base font-medium text-[#003366]">{professor.shift || "Integral"}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Área</p>
                <p className="text-base font-medium text-[#003366]">
                  {professor.professionalArea || professor.department || "Não especificado"}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#003366] mb-2">Feedback da Coordenação</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                O professor tem demonstrado excelente desempenho em sala de aula. Os alunos relatam boa didática e
                disponibilidade para tirar dúvidas. Recomendamos que continue com o bom trabalho e considere participar
                de mais projetos interdisciplinares no próximo semestre.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#003366] mb-2">Turmas Atribuídas</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                  <span>MI-74 PSIN 2023/1</span>
                </li>
                <li className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                  <span>JB-76 PSIN 2023/2</span>
                </li>
                <li className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                  <span>TP-74 PSIN 2023/2</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#003366] hover:bg-[#002244] text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
