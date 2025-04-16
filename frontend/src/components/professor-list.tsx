"use client"

import type React from "react"

import { useState } from "react"
import { Clock, X } from "lucide-react"
import { ConfirmationDialog } from "./confirmation-dialog"
import { PopupDadosProfessor } from "./popup-dados-professor"

interface Professor {
  id: number
  name: string
  email: string
  department?: string
  hours: number
  photoUrl: string | null
  color: string
  initials?: string
  classes?: string[]
  shift?: string
  professionalArea?: string
}

interface ProfessorListProps {
  professors: Professor[]
  onRemoveProfessor: (id: number) => void
  onUpdateProfessor?: (updatedData: Professor) => void
}

export function ProfessorList({ professors, onRemoveProfessor, onUpdateProfessor }: ProfessorListProps) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [professorToDelete, setProfessorToDelete] = useState<number | null>(null)
  const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null)

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation() // Prevent row click event
    setProfessorToDelete(id)
    setShowDeleteConfirmation(true)
  }

  const handleRowClick = (professor: Professor) => {
    setSelectedProfessor(professor)
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-100 py-4 font-semibold text-[#003366]">
          <div className="col-span-1"></div>
          <div className="col-span-3 px-4">Nome do professor</div>
          <div className="col-span-2 px-4">Email</div>
          <div className="col-span-2 px-4">Área profissionalizante</div>
          <div className="col-span-2 px-4">Carga horária</div>
          <div className="col-span-1 px-4">Turno</div>
          <div className="col-span-1"></div>
        </div>

        {professors.map((professor, index) => (
          <div
            key={professor.id}
            className={`grid grid-cols-12 py-4 items-center ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            } cursor-pointer`}
            onClick={() => handleRowClick(professor)}
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
            <div className="col-span-2 px-4">{professor.email || "-"}</div>
            <div className="col-span-2 px-4">{professor.professionalArea || "-"}</div>
            <div className="col-span-2 px-4 flex items-center">
              <Clock className="mr-2 h-4 w-4 text-[#003366]" />
              <span>{professor.hours} horas</span>
            </div>
            <div className="col-span-1 px-4">{professor.shift || "-"}</div>
            <div className="col-span-1 flex justify-center">
              <button
                onClick={(e) => handleDelete(e, professor.id)}
                className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="h-4 w-4 cursor-pointer" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete confirmation dialog */}
      <ConfirmationDialog
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={() => {
          if (professorToDelete !== null) {
            onRemoveProfessor(professorToDelete)
            setProfessorToDelete(null)
          }
          setShowDeleteConfirmation(false)
        }}
        title="Excluir professor"
        message="Tem certeza que deseja excluir o professor?"
        confirmButtonText="Sim, excluir"
        cancelButtonText="Não, cancelar"
        confirmButtonColor="#F13F00"
        cancelButtonColor="#003366"
      />

      {/* Professor details popup */}
      {selectedProfessor && (
        <PopupDadosProfessor
          professorData={selectedProfessor}
          onClose={() => setSelectedProfessor(null)}
          onUpdate={onUpdateProfessor}
          onDelete={onRemoveProfessor}
        />
      )}
    </>
  )
}
