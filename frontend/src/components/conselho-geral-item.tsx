"use client"

import type React from "react"
import { useState } from "react"
import { User, CheckCircle, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { ConfirmationDialog } from "./confirmation-dialog"

interface ConselhoGeralItemProps {
  id: number
  name: string
  students: number
  time: string
  color: string
  status: string
}

export function ConselhoGeralItem({ id, name, students, time, color, status }: ConselhoGeralItemProps) {
  const router = useRouter()
  const [showCompletedAlert, setShowCompletedAlert] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    if (status === "active") {
      // Se o status for "active" (ícone verde), mostra o alerta de conselho concluído
      setShowCompletedAlert(true)
    } else if (status === "pending") {
      // Se o status for "pending" (ícone amarelo), mostra o popup de confirmação
      setShowConfirmation(true)
    }
  }

  const handleConfirmConselho = () => {
    // Redireciona para a página de conselho específica
    router.push(`/pedagogical-technique/conselho-pedagogical-technique?turma=${name}`)
  }

  return (
    <>
      <div
        className="relative rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
        onClick={handleClick}
      >
        <div className="h-20" style={{ backgroundColor: color }}></div>
        <div className="p-4 bg-[#003366] text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold truncate">{name}</h3>
            {status === "active" ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <Clock className="h-5 w-5 text-yellow-500" />
            )}
          </div>
          <div className="flex items-center text-white mt-2">
            <User className="mr-1 h-4 w-4" />
            <span className="text-sm">{students} alunos</span>
            <span className="mx-2">•</span>
            <span className="text-sm">{time}</span>
          </div>
        </div>
      </div>

      {/* Alerta para turmas com conselho concluído */}
      <ConfirmationDialog
        isOpen={showCompletedAlert}
        onClose={() => setShowCompletedAlert(false)}
        onConfirm={() => setShowCompletedAlert(false)}
        title="Conselho Concluído"
        message={`O conselho dessa turma já foi concluído.`}
        confirmButtonText="OK"
        cancelButtonText=""
        confirmButtonColor="#003366"
      />

      {/* Confirmação para iniciar conselho de turma pendente */}
      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmConselho}
        title="Iniciar Conselho"
        message={`Deseja realizar o conselho de ${name}?`}
        confirmButtonText="Sim"
        cancelButtonText="Não"
        confirmButtonColor="#319F43"
        cancelButtonColor="#003366"
      />
    </>
  )
}
