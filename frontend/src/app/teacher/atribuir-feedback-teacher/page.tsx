"use client"

import { useState } from "react"
import { ChevronLeft, X } from "lucide-react"
import Header from "@/components/header"
import Link from "next/link"

// Definindo tipos para melhorar a tipagem
type FeedbackFields = "positiveFeedback" | "improvementPoints" | "improvementSuggestions"
type FeedbackData = {
  positiveFeedback: string
  improvementPoints: string
  improvementSuggestions: string
}

export default function AtribuirFeedbackPage() {
  // Lista de alunos estáticos
  const students = [
    {
      id: 1,
      name: "André Felipe Witt",
      color: "#4CAF50", // Verde
    },
    {
      id: 2,
      name: "Fernanda Agnes Amorim",
      color: "#2196F3", // Azul
    },
    {
      id: 3,
      name: "Gabriel Leite Medeiros",
      color: "#FFC107", // Amarelo
    },
    {
      id: 4,
      name: "Saymon Oliveira de Castro",
      color: "#9C27B0", // Roxo
    },
    {
      id: 5,
      name: "Emily Hefter de Souza",
      color: "#F44336", // Vermelho
    },
  ]

  // Estados para controlar o formulário e navegação
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>(
    students.map(() => ({
      positiveFeedback: "",
      improvementPoints: "",
      improvementSuggestions: "",
    })),
  )

  // Aluno atual
  const currentStudent = students[currentStudentIndex]

  // Manipuladores de eventos
  const handleCancel = () => {
    // Reset form
    const updatedFeedbacks = [...feedbacks]
    updatedFeedbacks[currentStudentIndex] = {
      positiveFeedback: "",
      improvementPoints: "",
      improvementSuggestions: "",
    }
    setFeedbacks(updatedFeedbacks)
  }

  const handleSubmit = () => {
    // Mostrar tela de revisão antes de enviar
    setShowReview(true)
  }

  const handleConfirmSubmit = () => {
    // Lógica para enviar os feedbacks
    console.log("Feedbacks enviados:", feedbacks)
    // Redirecionar para a página de alunos
    window.location.href = "/teacher/alunos-teacher"
  }

  const handleNext = () => {
    // Verificar se é o último aluno
    if (currentStudentIndex === students.length - 1) {
      // Se for o último, mostrar tela de revisão
      setShowReview(true)
    } else {
      // Senão, avançar para o próximo aluno
      setCurrentStudentIndex(currentStudentIndex + 1)
    }
  }

  const handleUpdateFeedback = (field: FeedbackFields, value: string) => {
    const updatedFeedbacks = [...feedbacks]
    updatedFeedbacks[currentStudentIndex] = {
      ...updatedFeedbacks[currentStudentIndex],
      [field]: value,
    }
    setFeedbacks(updatedFeedbacks)
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <div className="p-4 md:p-6 flex-1 ml-2 md:ml-6 lg:ml-10 mr-2 md:mr-6 lg:mr-10 mt-8">
        {!showReview ? (
          <>
            <div className="flex items-center mb-6">
              <Link href="/teacher/alunos-teacher" className="text-[#003366] mr-4">
                <ChevronLeft size={28} strokeWidth={2.5} />
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#003366] uppercase pb-1 border-b-2 border-primary w-fit">
                ATRIBUIR FEEDBACK
              </h1>
            </div>

            <div className="flex flex-col items-center mt-25">
              <div
                className="w-24 h-24 rounded-full overflow-hidden mb-4 flex items-center justify-center"
                style={{ backgroundColor: currentStudent.color }}
              ></div>
              <h2 className="text-xl font-semibold text-[#003366]">{currentStudent.name}</h2>
              <p className="text-sm text-gray-500 mt-2">
                Aluno {currentStudentIndex + 1} de {students.length}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-[#003366] rounded-lg p-4">
                <h3 className="text-white text-lg font-medium mb-3">Pontos positivos</h3>
                <textarea
                  className="w-full p-3 rounded border border-gray-300 min-h-[150px] text-foreground bg-background placeholder:text-muted-foreground"
                  placeholder="Este aluno..."
                  value={feedbacks[currentStudentIndex].positiveFeedback}
                  onChange={(e) => handleUpdateFeedback("positiveFeedback", e.target.value)}
                />
              </div>

              <div className="bg-[#003366] rounded-lg p-4">
                <h3 className="text-white text-lg font-medium mb-3">Pontos de melhoria</h3>
                <textarea
                  className="w-full p-3 rounded border border-gray-300 min-h-[150px] text-foreground bg-background placeholder:text-muted-foreground"
                  placeholder="Este aluno..."
                  value={feedbacks[currentStudentIndex].improvementPoints}
                  onChange={(e) => handleUpdateFeedback("improvementPoints", e.target.value)}
                />
              </div>

              <div className="bg-[#003366] rounded-lg p-4">
                <h3 className="text-white text-lg font-medium mb-3">Sugestões de melhoria</h3>
                <textarea
                  className="w-full p-3 rounded border border-gray-300 min-h-[150px] text-foreground bg-background placeholder:text-muted-foreground"
                  placeholder="Este aluno..."
                  value={feedbacks[currentStudentIndex].improvementSuggestions}
                  onChange={(e) => handleUpdateFeedback("improvementSuggestions", e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <div>
                <button onClick={handleCancel} className="bg-[#FF5722] text-white px-6 py-2 rounded mr-3 font-medium">
                  Cancelar
                </button>
                <button onClick={handleSubmit} className="bg-[#4CAF50] text-white px-6 py-2 rounded font-medium">
                  Enviar
                </button>
              </div>
              <button onClick={handleNext} className="bg-[#003366] text-white px-6 py-2 rounded font-medium">
                {currentStudentIndex === students.length - 1 ? "Revisar" : "Próximo"}
              </button>
            </div>
          </>
        ) : (
          // Tela de revisão
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#003366]">Revisão de Feedbacks</h2>
              <button onClick={() => setShowReview(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-8">
              {students.map((student, index) => (
                <div key={student.id} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: student.color }}
                    ></div>
                    <h3 className="text-xl font-semibold text-[#003366]">{student.name}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium text-[#003366] mb-2">Pontos positivos</h4>
                      <p className="bg-gray-50 p-3 rounded min-h-[100px]">
                        {feedbacks[index].positiveFeedback || "Nenhum feedback fornecido"}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-[#003366] mb-2">Pontos de melhoria</h4>
                      <p className="bg-gray-50 p-3 rounded min-h-[100px]">
                        {feedbacks[index].improvementPoints || "Nenhum feedback fornecido"}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-[#003366] mb-2">Sugestões de melhoria</h4>
                      <p className="bg-gray-50 p-3 rounded min-h-[100px]">
                        {feedbacks[index].improvementSuggestions || "Nenhum feedback fornecido"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-8 gap-4">
              <button
                onClick={() => setShowReview(false)}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded font-medium"
              >
                Voltar
              </button>
              <button
                onClick={() => setShowConfirmation(true)}
                className="bg-[#4CAF50] text-white px-6 py-2 rounded font-medium"
              >
                Enviar Todos os Feedbacks
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de confirmação */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold text-[#003366] mb-4">Confirmar envio</h3>
            <p className="mb-6">
              Tem certeza que deseja enviar os feedbacks para todos os {students.length} alunos? Esta ação não pode ser
              desfeita.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button onClick={handleConfirmSubmit} className="bg-[#4CAF50] text-white px-4 py-2 rounded">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
