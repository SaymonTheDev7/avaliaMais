import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"


export default function StudentList() {
  // Dados simulados dos alunos
  
  <div className="flex items-center mb-6 px-4">
  <Link href="/student/turmas-student" className="text-[#003366] mr-4 mt-100">
    <ChevronLeft className="chevron" size={28} strokeWidth={2.5} />
  </Link>
  <h1 className="text-2xl sm:text-3xl font-bold text-[#003366] uppercase border-b-2 border-[#003366] pb-1">
    MI-74 PSIN 2023/1
  </h1>
</div> 

  const students = [
    {
      id: 1,
      name: "André Felipe Witt",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Fernanda Agnes Amorim",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Gabriel Leite Medeiros",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Saymon Oliveira de Castro",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Emily Hefter de Souza",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
        id: 1,
        name: "André Felipe Witt",
        image: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 2,
        name: "Fernanda Agnes Amorim",
        image: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 3,
        name: "Gabriel Leite Medeiros",
        image: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 4,
        name: "Saymon Oliveira de Castro",
        image: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 5,
        name: "Emily Hefter de Souza",
        image: "/placeholder.svg?height=40&width=40",
      },
  ]

  return (
    <div className="flex flex-col px-4">
      {/* Banner */}
      <div className="relative rounded-lg overflow-hidden my-4" style={{ backgroundColor: "#5a6e7e" }}>
        <div className="absolute right-0 top-0 h-full">

        </div>
        <div className="p-8 py-12 relative z-10">
          <h1 className="text-3xl font-bold text-white">MI-74 PSIN 2023/1</h1>
        </div>
      </div>

      <div className="flex mt-6 gap-6">
        {/* Sidebar */}
        <div className="w-[275px] flex flex-col gap-4">
          <div className="bg-[#f2f2f2] rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
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
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span className="font-bold text-[#003366]">Seus Feedbacks</span>
            </div>
            <button className="w-full py-2 px-4 bg-[#003366] text-white font-medium rounded-md hover:bg-[#002244]">
              Visualizar
            </button>
          </div>

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
            {students.map((student, index) => (
              <div key={student.id} className="flex items-center justify-between py-4 px-4 bg-[#f9f9f9] rounded-md">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                    <Image
                      src={student.image || "/placeholder.svg"}
                      alt={student.name}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="font-medium text-[#02335e]">{student.name}</span>
                </div>
                <a
                  href="#"
                  className="inline-block bg-[#036ec5] hover:bg-[#025aa3] text-white font-medium py-2 px-6 rounded-md"
                >
                  Adicionar Feedback
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
