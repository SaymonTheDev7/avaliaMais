"use client"

import type React from "react"

import { X } from "lucide-react"
import { useEffect } from "react"

interface FeedbackPopupProps {
  student: {
    id: number
    name: string
    color: string
  }
  onClose: () => void
}

export function FeedbackPopup({ student, onClose }: FeedbackPopupProps) {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      style={{ backdropFilter: "blur(5px)" }}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden" onClick={handlePopupClick}>
        <div className="flex items-center justify-between bg-[#003366] text-white p-6">
          <div className="flex items-center gap-3">
            <div
              className="h-12 w-12 overflow-hidden rounded-full flex items-center justify-center"
              style={{ backgroundColor: student.color }}
            ></div>
            <h2 className="text-2xl font-bold">{student.name}</h2>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#003366] mb-2">Feedback do Professor</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                O aluno tem demonstrado um excelente desempenho nas atividades práticas, mas precisa melhorar sua
                participação em discussões em grupo. Suas entregas são sempre pontuais e com boa qualidade técnica.
                Recomendo que busque mais oportunidades para desenvolver suas habilidades de comunicação.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#003366] mb-2">Desempenho Acadêmico</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Média Geral</p>
                <p className="text-xl font-bold text-[#003366]">8.5</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Frequência</p>
                <p className="text-xl font-bold text-[#003366]">92%</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#003366] mb-2">Observações</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                O estudante demonstra grande potencial e interesse pela área. Tem facilidade com conceitos técnicos e
                boa capacidade de resolução de problemas. Sugiro que participe de projetos extracurriculares para
                desenvolver ainda mais suas habilidades práticas.
              </p>
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
