"use client"

import { useState } from "react"
import { Trash2, User } from "lucide-react"
import { ConfirmationDialog } from "./confirmation-dialog"

// Define the class item type directly in this file
type ClassItemType = {
  id: number
  name: string
  students: number
  time: string
  color: string
  course?: string
  fullTime?: string
  shift?: string
  hoursLoad?: string
}

export type ClassListProps = {
  classes: ClassItemType[]
  onRemoveClass: (id: number) => void
  onClassClick: (classItem: ClassItemType) => void
}

export function ClassList({ classes, onRemoveClass, onClassClick }: ClassListProps) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [classToDelete, setClassToDelete] = useState<number | null>(null)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-[#003366] tracking-wider">
              Turma
            </th>
            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-[#003366] tracking-wider">
              Alunos
            </th>
            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-[#003366] tracking-wider">
              Horário
            </th>
            <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-[#003366] tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {classes.map((classItem) => (
            <tr key={classItem.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onClassClick(classItem)}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full mr-3" style={{ backgroundColor: classItem.color }}></div>
                  <div className="text-sm font-medium text-gray-900">{classItem.name}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-500">
                  <User className="mr-1 h-4 w-4" />
                  <span>{classItem.students}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{classItem.time}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={(e) => {
                    e.stopPropagation() // Prevent row click event
                    setClassToDelete(classItem.id)
                    setShowDeleteConfirmation(true)
                  }}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete confirmation dialog */}
      <ConfirmationDialog
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={() => {
          if (classToDelete !== null) {
            onRemoveClass(classToDelete)
            setClassToDelete(null)
          }
          setShowDeleteConfirmation(false)
        }}
        title="Excluir turma"
        message="Tem certeza que deseja excluir a turma?"
        confirmButtonText="Sim, excluir"
        cancelButtonText="Não, cancelar"
        confirmButtonColor="#F13F00"
        cancelButtonColor="#003366"
      />
    </div>
  )
}
