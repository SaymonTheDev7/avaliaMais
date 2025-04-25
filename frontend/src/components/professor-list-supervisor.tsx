"use client"

import { Clock } from "lucide-react"
import { useState } from "react"
import { ProfessorFeedbackPopup } from "./professor-feedback-popup"

interface Professor {
  id: number
  name: string
  email?: string
  department?: string
  hours: number
  photoUrl: string | null
  color: string
  initials?: string
  classes?: string[]
  shift?: string
  professionalArea?: string
}

interface ProfessorListSupervisorProps {
  professors: Professor[]
}

export function ProfessorListSupervisor({ professors }: ProfessorListSupervisorProps) {
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null)

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-100 py-4 font-semibold text-[#003366]">
          <div className="col-span-1"></div>
          <div className="col-span-3 px-4">Nome do professor</div>
          <div className="col-span-3 px-4">Área profissionalizante</div>
          <div className="col-span-3 px-4">Carga horária</div>
          <div className="col-span-2 px-4">Turno</div>
        </div>

        {professors.map((professor, index) => (
          <div
            key={professor.id}
            className={`grid grid-cols-12 py-4 items-center ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} cursor-pointer hover:bg-gray-100`}
            onClick={() => setSelectedProfessor(professor)}
          >
            <div className="col-span-1 flex justify-center">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: professor.color }}
              >
                {professor.photoUrl ? (
                  <img
                    src={professor.photoUrl || "/placeholder.svg"}
                    alt={professor.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="text-white font-bold">
                    {professor.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                      .substring(0, 2)}
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-3 px-4 font-medium">{professor.name}</div>
            <div className="col-span-3 px-4">{professor.professionalArea || professor.department || "-"}</div>
            <div className="col-span-3 px-4 flex items-center">
              <Clock className="mr-2 h-4 w-4 text-[#003366]" />
              <span>{professor.hours} horas</span>
            </div>
            <div className="col-span-2 px-4">{professor.shift || "-"}</div>
          </div>
        ))}
      </div>

      {/* Popup de Feedback */}
      {selectedProfessor && (
        <ProfessorFeedbackPopup professor={selectedProfessor} onClose={() => setSelectedProfessor(null)} />
      )}
    </>
  )
}
