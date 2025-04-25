"use client"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header-student-representative"
import { useState } from "react"

const professores = [
  { id: 1, nome: "Romário", disciplina: "JAVA" },
  { id: 2, nome: "Kristian", disciplina: "Web e Mobile" },
  { id: 3, nome: "Vinícius", disciplina: "Arquitetura" },
  { id: 4, nome: "Iago", disciplina: "Cloud Computing" },
  { id: 5, nome: "Valentim", disciplina: "Data Science" },
]

export default function ConselhoClassePage() {
  const [professorSelecionado, setProfessorSelecionado] = useState<number | null>(null)
  const [mostrarGeral, setMostrarGeral] = useState(true)

  const feedbacksProfessores = {
    1: {
      pontosPositivos: [
        "Excelente lógica de programação",
        "Domínio avançado de POO",
        "Boa aplicação de design patterns"
      ],
      melhorias: [
        "Precisa melhorar documentação de código",
        "Falta de atenção em boas práticas de clean code"
      ],
      observacoes: "Aluno com grande potencial para desenvolvimento backend, mas precisa se atentar mais à qualidade do código."
    },
    2: {
      pontosPositivos: [
        "Ótimo desenvolvimento de interfaces",
        "Bom entendimento de React e React Native",
        "Criatividade em soluções frontend"
      ],
      melhorias: [
        "Necessita melhorar performance de aplicações",
        "Melhorar conhecimento em testes automatizados"
      ],
      observacoes: "Destaca-se no desenvolvimento visual, mas precisa reforçar conhecimentos em otimização."
    },
    3: {
      pontosPositivos: [
        "Visão sistêmica avançada",
        "Boa capacidade de modelagem",
        "Ótimo entendimento de padrões arquiteturais"
      ],
      melhorias: [
        "Precisa melhorar documentação de arquitetura",
        "Falta de aprofundamento em arquiteturas serverless"
      ],
      observacoes: "Mostra grande habilidade para soluções complexas, deve se aprofundar mais em arquiteturas modernas."
    },
    4: {
      pontosPositivos: [
        "Bom entendimento de serviços AWS",
        "Habilidade em configuração de ambientes",
        "Conhecimento em infraestrutura como código"
      ],
      melhorias: [
        "Precisa melhorar em segurança na nuvem",
        "Falta de experiência com multi-cloud"
      ],
      observacoes: "Tem ótimo potencial para DevOps e Cloud Engineer, mas precisa estudar mais aspectos de segurança."
    },
    5: {
      pontosPositivos: [
        "Ótima análise de dados",
        "Bom conhecimento em Python e Pandas",
        "Habilidade em visualização de dados"
      ],
      melhorias: [
        "Precisa melhorar em estatística avançada",
        "Falta de experiência com big data"
      ],
      observacoes: "Tem talento para análise de dados, deve se dedicar mais à fundamentação estatística."
    }
  }

  const feedbackGeral = {
    pontosPositivos: [
      "Turma com ótimo desempenho técnico",
      "Boa colaboração em projetos integrados",
      "Habilidade em resolver problemas complexos"
    ],
    areasMelhoria: [
      "Necessidade de mais documentação de código",
      "Alguns alunos com dificuldade em versionamento",
      "Conteúdo de arquitetura distribuída requer reforço"
    ],
    recomendacoes: [
      "Implementar pair programming",
      "Workshops sobre Git avançado",
      "Estudos de caso em arquiteturas escaláveis"
    ]
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <div className="p-4 flex-1 mx-4 md:mx-10 mt-6 max-w-4xl w-full self-center">
        {/* Cabeçalho */}
        <div className="flex items-center mb-8">
          <Link 
            href="/student-representative/turmas-student-representative" 
            className="text-[#003366] hover:bg-gray-100 p-1 rounded-full transition-colors"
          >
            <ChevronLeft size={32} strokeWidth={2.5} />
          </Link>
          <div className="ml-2">
            <h1 className="text-2xl md:text-3xl font-bold text-[#003366] uppercase">
              CONSELHO DE CLASSE | MI-74 PSIN 2023/1
            </h1>
          </div>
        </div>

        {/* Seletor de Feedback */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <h2 className="text-lg font-semibold text-[#003366] mb-3">Selecione o feedback:</h2>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setMostrarGeral(true); setProfessorSelecionado(null) }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${mostrarGeral ? 'bg-[#003366] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Visão Geral
            </button>
            
            {professores.map(professor => (
              <button
                key={professor.id}
                onClick={() => { setMostrarGeral(false); setProfessorSelecionado(professor.id) }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${professorSelecionado === professor.id ? 'bg-[#003366] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {professor.nome} ({professor.disciplina})
              </button>
            ))}
          </div>
        </div>

        {/* Feedback Geral */}
        {mostrarGeral && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
            <div className="bg-[#003366] px-6 py-4">
              <h2 className="text-xl font-bold text-white">DEVOLUTIVA GERAL DA TURMA</h2>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-bold text-[#003366] mb-3 text-lg">Pontos Positivos</h3>
                <ul className="space-y-2">
                  {feedbackGeral.pontosPositivos.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="font-bold text-[#003366] mb-3 text-lg">Áreas de Melhoria</h3>
                <ul className="space-y-2">
                  {feedbackGeral.areasMelhoria.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-yellow-500 mr-2">!</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-[#003366] mb-3 text-lg">Recomendações</h3>
                <ul className="space-y-2">
                  {feedbackGeral.recomendacoes.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-2">→</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Feedback do Professor */}
        {professorSelecionado && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-[#003366] px-6 py-4 flex items-center">
              <h2 className="text-xl font-bold text-white">
                FEEDBACK - {professores.find(p => p.id === professorSelecionado)?.nome.toUpperCase()} ({professores.find(p => p.id === professorSelecionado)?.disciplina})
              </h2>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-bold text-[#003366] mb-3 text-lg">Pontos Positivos</h3>
                <ul className="space-y-2">
                  {feedbacksProfessores[professorSelecionado as keyof typeof feedbacksProfessores].pontosPositivos.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="font-bold text-[#003366] mb-3 text-lg">Sugestões de Melhoria</h3>
                <ul className="space-y-2">
                  {feedbacksProfessores[professorSelecionado as keyof typeof feedbacksProfessores].melhorias.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-yellow-500 mr-2">!</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-[#003366] mb-3 text-lg">Observações</h3>
                <p className="text-gray-700 pl-4 border-l-2 border-[#003366]">
                  {feedbacksProfessores[professorSelecionado as keyof typeof feedbacksProfessores].observacoes}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}