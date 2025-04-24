"use client"
import { X, User } from "lucide-react"
import Image from "next/image"

// Definindo o tipo para os alunos
export type AlunoItemType = {
  id: string // Modificado para usar apenas string como tipo para id
  name: string
  turma: string
  turno: string
  photoUrl?: string | null
  color: string
  email?: string
  workloadWeek?: number
}

export interface AlunoListProps {
  alunos: AlunoItemType[]
  onRemoveAluno?: (id: string) => void // Modificado para aceitar apenas string
  onAlunoClick?: (aluno: AlunoItemType) => void
}

export function AlunoList({ alunos, onRemoveAluno, onAlunoClick }: AlunoListProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="grid grid-cols-12 bg-gray-100 py-4 font-semibold text-[#003366]">
        <div className="col-span-1"></div>
        <div className="col-span-3 px-4">Nome do aluno</div>
        <div className="col-span-2 px-4">Turma</div>
        <div className="col-span-2 px-4">Turno</div>
        <div className="col-span-3 px-4">Email</div>
        <div className="col-span-1"></div>
      </div>

      {alunos.map((aluno, index) => (
        <div
          key={aluno.id}
          className={`grid grid-cols-12 py-4 items-center ${
            index % 2 === 0 ? "bg-gray-50" : "bg-white"
          } ${onAlunoClick ? "cursor-pointer hover:bg-gray-100 transition-colors duration-200" : ""}`}
          onClick={() => onAlunoClick && onAlunoClick(aluno)}
        >
          <div className="col-span-1 flex justify-center">
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
              {aluno.photoUrl ? (
                <Image
                  src={aluno.photoUrl || "/placeholder.svg"}
                  alt={aluno.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: aluno.color }}
                >
                  <div className="text-white font-bold">
                    {aluno.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                      .substring(0, 2)}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-3 px-4 font-medium">{aluno.name}</div>
          <div className="col-span-2 px-4">{aluno.turma}</div>
          <div className="col-span-2 px-4">{aluno.turno}</div>
          <div className="col-span-3 px-4 flex items-center">
            <User className="h-4 w-4 mr-1 text-gray-500" />
            {aluno.email || "Não definido"}
          </div>
          <div className="col-span-1 flex justify-center">
            {onRemoveAluno && (
              <button
                onClick={(e) => {
                  e.stopPropagation() // Evita que o clique no botão de remover acione o onAlunoClick
                  onRemoveAluno(aluno.id)
                }}
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
