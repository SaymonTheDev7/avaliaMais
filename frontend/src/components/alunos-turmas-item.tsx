"use client"

import { User, Check, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface AlunosTurmasProps {
  id: number
  name: string
  students: number
  time: string
  color: string
  current?: boolean
}

export function AlunosTurmasItem({ id, name, students, time, color, current = false }: AlunosTurmasProps) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div 
        onClick={() => current && setShowModal(true)}
        className={`relative rounded-xl overflow-hidden shadow-md bg-[#003366] text-white h-[180px] transition-all 
          ${current ? 'ring-4 ring-[#00C853] cursor-pointer hover:shadow-xl' : 'hover:shadow-lg'}`}
      >
        {current && (
          <div className="absolute top-2 right-2 bg-[#00C853] text-white px-2 py-1 rounded-full flex items-center text-xs z-10">
            <Check className="h-3 w-3 mr-1" />
            Atual
          </div>
        )}
        
        <div className="h-20" style={{ backgroundColor: color }}></div>
        <div className="p-4 mt-2">
          <h3 className="text-xl sm:text-2xl font-bold truncate">{name}</h3>
          <div className="flex items-center text-base mt-3">
            <User className="mr-1 h-4 sm:h-5 w-4 sm:w-5" />
            <span>{students}</span>
            <span className="mx-2">-</span>
            <span>{time}</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#003366]">{name}</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <p className="text-white-600 mb-6">Selecione o modo que deseja acessar:</p>
              
              <div className="space-y-4 text-white">
                <Link
                  href="/student-representative/historico-conselhos-student-representative"
                  className="block bg-[#003366] hover:bg-[#004080] text-white py-3 px-4 rounded-lg text-center font-medium transition-colors shadow-md"
                  onClick={() => setShowModal(false)}
                >
                  Pré-Conselho
                </Link>
                
                <Link
                  href="/student-representative/conselhos-student-representative"
                  className="block bg-[#003366] hover:bg-[#004080] text-white py-3 px-4 rounded-lg text-center font-medium transition-colors shadow-md"
                  onClick={() => setShowModal(false)}
                >
                  Conselho
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}