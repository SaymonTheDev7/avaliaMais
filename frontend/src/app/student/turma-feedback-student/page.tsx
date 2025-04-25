"use client"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header-student-representative"

export default function ConselhoClassePage() {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      
      <div className="p-4 flex-1 mx-4 md:mx-10 mt-6">
        {/* Cabeçalho */}
        <div className="flex items-center mb-6">
          <Link 
            href="/student-representative/turmas-student-representative" 
            className="text-[#003366] mr-4"
          >
            <ChevronLeft size={28} strokeWidth={2.5} />
          </Link>
          <h1 className="text-2xl font-bold text-[#003366] uppercase border-b-2 border-[#003366] pb-1">
            CONSELHO DE CLASSE - 12/03/2024
          </h1>
        </div>

        {/* Feedback Compacto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Feedback Individual */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-[#003366] px-6 py-3"> {/* py-3 em vez de py-4 */}
              <h2 className="text-xl font-bold text-white">DEVOLUTIVA INDIVIDUAL</h2>
            </div>
            <div className="p-5"> {/* p-5 em vez de p-6/p-8 */}
              <p className="text-gray-700 leading-tight"> {/* leading-tight para reduzir espaço entre linhas */}
                O aluno demonstrou excelente desempenho nas atividades em grupo, com contribuições relevantes. Sugere-se maior atenção aos prazos de entrega.
              </p>
            </div>
          </div>

          {/* Feedback da Turma */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="bg-[#003366] px-6 py-3">
              <h2 className="text-xl font-bold text-white">DEVOLUTIVA DA TURMA</h2>
            </div>
            <div className="p-5">
              <p className="text-gray-700 leading-tight">
                A turma apresentou evolução significativa no bimestre, com destaque para o trabalho colaborativo. Necessidade de maior participação nas discussões.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}