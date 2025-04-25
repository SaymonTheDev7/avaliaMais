import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"

export default function TurmaPage() {
  // Dados simulados dos alunos
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
    {
      id: 6,
      name: "André Felipe Witt",
      color: "#E91E63", // Rosa
    },
    {
      id: 7,
      name: "Fernanda Agnes Amorim",
      color: "#FF9800", // Laranja
    },
    {
      id: 8,
      name: "Gabriel Leite Medeiros",
      color: "#795548", // Marrom
    },
    {
      id: 9,
      name: "Saymon Oliveira de Castro",
      color: "#607D8B", // Azul acinzentado
    },
    {
      id: 10,
      name: "Emily Hefter de Souza",
      color: "#009688", // Verde-azulado
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto pt-6">
        <div className="flex flex-col px-4">
          {/* Banner com seta de voltar */}
          <div className="relative rounded-lg overflow-hidden my-4" style={{ backgroundColor: "#5a6e7e" }}>
            <Link
              href="/teacher/turmas-teacher"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white z-20"
            >
              <ChevronLeft size={28} strokeWidth={2.5} />
            </Link>
            <div className="p-8 py-12 relative z-10 pl-16">
              <h1 className="text-3xl font-bold text-white">MI-74 PSIN 2023/1</h1>
            </div>
          </div>

          <div className="bg-[#003366] text-white rounded-lg overflow-hidden mb-6">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Devolutiva da turma</h2>
              <p className="text-base md:text-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolo.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row mt-6 gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-[275px] flex flex-col gap-4">
              <div className="bg-[#f2f2f2] rounded-lg p-4 space-y-4">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-[#003366]"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <div>
                    <span className="font-bold text-[#003366]">Quantidade de alunos:</span>
                    <span className="font-bold text-[#003366] ml-1">21</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-[#003366] mt-0.5"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <div>
                    <span className="font-bold text-[#003366]">Representantes:</span>
                    <div className="font-bold text-[#003366]">Gustavo Stinghen e Letícia Moretti</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-[#003366]"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <div>
                    <span className="font-bold text-[#003366]">Turno:</span>
                    <span className="font-bold text-[#003366] ml-1">2° turno</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-[#02335e] mb-6">Lista de Alunos</h2>

              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between py-4 px-4 bg-[#f9f9f9] rounded-md">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 overflow-hidden rounded-full flex items-center justify-center"
                        style={{ backgroundColor: student.color }}
                      ></div>
                      <span className="font-medium text-[#02335e]">{student.name}</span>
                    </div>
                    <Link
                      href="/teacher/atribuir-feedback-teacher"
                      className="inline-block bg-[#036ec5] hover:bg-[#025aa3] text-white font-medium py-2 px-6 rounded-md"
                    >
                      Adicionar Feedback
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
