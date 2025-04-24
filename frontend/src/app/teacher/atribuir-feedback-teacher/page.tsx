"use client"

import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import Header from "@/components/header"
import Link from "next/link"

export default function AtribuirFeedbackPage() {
  const [positiveFeedback, setPositiveFeedback] = useState("")
  const [improvementPoints, setImprovementPoints] = useState("")
  const [improvementSuggestions, setImprovementSuggestions] = useState("")

  const handleCancel = () => {
    // Reset form or navigate back
    setPositiveFeedback("")
    setImprovementPoints("")
    setImprovementSuggestions("")
  }

  const handleSubmit = () => {
    // Submit feedback logic would go here
    console.log({
      positiveFeedback,
      improvementPoints,
      improvementSuggestions
    })
  }

  const handleNext = () => {
    // Navigate to next student or save and continue
    console.log("Moving to next student")
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <div className="p-4 md:p-6 flex-1 ml-2 md:ml-6 lg:ml-10 mr-2 md:mr-6 lg:mr-10 mt-8">
        <div className="flex items-center mb-6">
          <Link href="/student/inicio-student" className="text-[#003366] mr-4">
            <ChevronLeft size={28} strokeWidth={2.5} />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#003366] uppercase pb-1 border-b-2 border-primary w-fit">
            ATRIBUIR FEEDBACK
          </h1>
        </div>

        <div className="flex flex-col items-center mt-6">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
            <img 
              src="https://tryeasel.dev/placeholder.svg?width=96&height=96" 
              alt="Student profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold text-[#003366]">André Felipe Witt</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-[#003366] rounded-lg p-4">
            <h3 className="text-white text-lg font-medium mb-3">Pontos positivos</h3>
            <textarea 
              className="w-full p-3 rounded border border-gray-300 min-h-[150px] text-foreground bg-background placeholder:text-muted-foreground" 
              placeholder="Este aluno..."
              value={positiveFeedback}
              onChange={(e) => setPositiveFeedback(e.target.value)}
            />
          </div>

          <div className="bg-[#003366] rounded-lg p-4">
            <h3 className="text-white text-lg font-medium mb-3">Pontos de melhoria</h3>
            <textarea 
              className="w-full p-3 rounded border border-gray-300 min-h-[150px] text-foreground bg-background placeholder:text-muted-foreground" 
              placeholder="Este aluno..."
              value={improvementPoints}
              onChange={(e) => setImprovementPoints(e.target.value)}
            />
          </div>

          <div className="bg-[#003366] rounded-lg p-4">
            <h3 className="text-white text-lg font-medium mb-3">Sugestões de melhoria</h3>
            <textarea 
              className="w-full p-3 rounded border border-gray-300 min-h-[150px] text-foreground bg-background placeholder:text-muted-foreground" 
              placeholder="Este aluno..."
              value={improvementSuggestions}
              onChange={(e) => setImprovementSuggestions(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <div>
            <button 
              onClick={handleCancel}
              className="bg-[#FF5722] text-white px-6 py-2 rounded mr-3 font-medium"
            >
              Cancelar
            </button>
            <button 
              onClick={handleSubmit}
              className="bg-[#4CAF50] text-white px-6 py-2 rounded font-medium"
            >
              Enviar
            </button>
          </div>
          <button 
            onClick={handleNext}
            className="bg-[#003366] text-white px-6 py-2 rounded font-medium"
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  )
}