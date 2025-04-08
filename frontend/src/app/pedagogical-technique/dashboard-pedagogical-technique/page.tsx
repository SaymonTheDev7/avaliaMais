"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import { ChevronLeft } from "lucide-react"
import { Dashboard } from "@/components/dashboard"

// Definição de tipos
interface Pessoa {
  nome: string
  visualizou: number
}

interface Turma {
  nome: string
  alunos: Pessoa[]
}

interface TurmaInfo {
  nome: string
  visualizaram: number
  naoVisualizaram: number
  total: number
}

interface DadoGrafico {
  name: string
  value: number
}

// Lista de professores com status de visualização (1 = visualizou, 0 = não visualizou)
const professores: Pessoa[] = [
  { nome: "Roberto Almeida", visualizou: 1 },
  { nome: "Fernanda Costa", visualizou: 1 },
  { nome: "Luiz Mendes", visualizou: 1 },
  { nome: "Cristina Rodrigues", visualizou: 1 },
  { nome: "Eduardo Martins", visualizou: 1 },
  { nome: "João Silva", visualizou: 0 },
  { nome: "Maria Oliveira", visualizou: 0 },
  { nome: "Pedro Santos", visualizou: 0 },
  { nome: "Ana Pereira", visualizou: 0 },
  { nome: "Carlos Ferreira", visualizou: 0 },
  { nome: "Patrícia Lima", visualizou: 1 },
  { nome: "Ricardo Souza", visualizou: 1 },
  { nome: "Juliana Alves", visualizou: 1 },
  { nome: "Marcos Ribeiro", visualizou: 1 },
  { nome: "Camila Gomes", visualizou: 0 },
]

// Lista de turmas com alunos
const turmas: Turma[] = [
  {
    nome: "Turma A",
    alunos: [
      { nome: "Aluno A1", visualizou: 1 },
      { nome: "Aluno A2", visualizou: 1 },
      { nome: "Aluno A3", visualizou: 1 },
      { nome: "Aluno A4", visualizou: 1 },
      { nome: "Aluno A5", visualizou: 0 },
      { nome: "Aluno A6", visualizou: 0 },
      { nome: "Aluno A7", visualizou: 1 },
      { nome: "Aluno A8", visualizou: 1 },
      { nome: "Aluno A9", visualizou: 1 },
      { nome: "Aluno A10", visualizou: 0 },
    ],
  },
  {
    nome: "Turma B",
    alunos: [
      { nome: "Aluno B1", visualizou: 1 },
      { nome: "Aluno B2", visualizou: 1 },
      { nome: "Aluno B3", visualizou: 1 },
      { nome: "Aluno B4", visualizou: 0 },
      { nome: "Aluno B5", visualizou: 0 },
      { nome: "Aluno B6", visualizou: 1 },
      { nome: "Aluno B7", visualizou: 1 },
      { nome: "Aluno B8", visualizou: 0 },
    ],
  },
  {
    nome: "Turma C",
    alunos: [
      { nome: "Aluno C1", visualizou: 1 },
      { nome: "Aluno C2", visualizou: 1 },
      { nome: "Aluno C3", visualizou: 0 },
      { nome: "Aluno C4", visualizou: 0 },
      { nome: "Aluno C5", visualizou: 0 },
      { nome: "Aluno C6", visualizou: 1 },
      { nome: "Aluno C7", visualizou: 1 },
      { nome: "Aluno C8", visualizou: 1 },
      { nome: "Aluno C9", visualizou: 1 },
      { nome: "Aluno C10", visualizou: 0 },
    ],
  },
  {
    nome: "Turma D",
    alunos: [
      { nome: "Aluno D1", visualizou: 1 },
      { nome: "Aluno D2", visualizou: 1 },
      { nome: "Aluno D3", visualizou: 1 },
      { nome: "Aluno D4", visualizou: 1 },
      { nome: "Aluno D5", visualizou: 1 },
      { nome: "Aluno D6", visualizou: 0 },
      { nome: "Aluno D7", visualizou: 0 },
      { nome: "Aluno D8", visualizou: 0 },
      { nome: "Aluno D9", visualizou: 0 },
      { nome: "Aluno D10", visualizou: 1 },
    ],
  },
]

// Lista de equipe pedagógica
const equipePedagogica: Pessoa[] = [
  { nome: "Diretor Escolar", visualizou: 1 },
  { nome: "Supervisor Pedagógico", visualizou: 1 },
  { nome: "Coordenador de Disciplina", visualizou: 1 },
  { nome: "Assistente Social", visualizou: 1 },
  { nome: "Coordenador de Ensino", visualizou: 0 },
  { nome: "Psicólogo Escolar", visualizou: 0 },
  { nome: "Orientador Educacional", visualizou: 0 },
]

// Lista de conselhos
const conselhosData = [
  { name: "Concelho 13/12/2024" },
  { name: "Concelho 13/11/2024" },
  { name: "Concelho 13/10/2024" },
  { name: "Concelho 13/09/2024" },
  { name: "Concelho 13/08/2024" },
]

// Função para calcular as porcentagens de visualização
function calcularPorcentagens(lista: Pessoa[]): DadoGrafico[] {
  // Conta quantos visualizaram (valor 1)
  const visualizaram = lista.filter((item: Pessoa) => item.visualizou === 1).length

  // Total de pessoas na lista
  const total = lista.length

  // Calcula as porcentagens
  const porcentagemVisualizaram = Math.round((visualizaram / total) * 100)
  const porcentagemNaoVisualizaram = 100 - porcentagemVisualizaram

  return [
    { name: "Visualizaram o feedback", value: porcentagemVisualizaram },
    { name: "Não visualizaram o feedback", value: porcentagemNaoVisualizaram },
  ]
}

// Função para obter todos os alunos de todas as turmas
function obterTodosAlunos(turmas: Turma[]): Pessoa[] {
  return turmas.flatMap((turma: Turma) => turma.alunos)
}

// Função para contar alunos que visualizaram por turma
function contarAlunosPorTurma(turmas: Turma[]): TurmaInfo[] {
  return turmas.map((turma: Turma) => {
    const visualizaram = turma.alunos.filter((aluno: Pessoa) => aluno.visualizou === 1).length
    const naoVisualizaram = turma.alunos.length - visualizaram

    return {
      nome: turma.nome,
      visualizaram,
      naoVisualizaram,
      total: turma.alunos.length,
    }
  })
}

export default function DashboardPage() {
  // Calcular dados para os gráficos - inicializar com arrays vazios do tipo correto
  const [professorData, setProfessorData] = useState<DadoGrafico[]>([])
  const [alunosData, setAlunosData] = useState<DadoGrafico[]>([])
  const [pedagogicaData, setPedagogicaData] = useState<DadoGrafico[]>([])
  const [turmasInfo, setTurmasInfo] = useState<TurmaInfo[]>([])

  useEffect(() => {
    // Calcular porcentagens para cada grupo
    const dadosProfessores = calcularPorcentagens(professores)
    const dadosAlunos = calcularPorcentagens(obterTodosAlunos(turmas))
    const dadosPedagogicos = calcularPorcentagens(equipePedagogica)
    const infoTurmas = contarAlunosPorTurma(turmas)

    setProfessorData(dadosProfessores)
    setAlunosData(dadosAlunos)
    setPedagogicaData(dadosPedagogicos)
    setTurmasInfo(infoTurmas)
  }, [])

  // Obter listas de quem visualizou e quem não visualizou
  const professoresVisualizaram = professores.filter((p) => p.visualizou === 1)
  const professoresNaoVisualizaram = professores.filter((p) => p.visualizou === 0)

  const pedagogicosVisualizaram = equipePedagogica.filter((p) => p.visualizou === 1)
  const pedagogicosNaoVisualizaram = equipePedagogica.filter((p) => p.visualizou === 0)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <div className="p-4 pt-6 pl-0 flex-1 mr-2 md:mr-6 lg:mr-10">
            <div className="flex items-center mb-0">
              <a href="#" className="text-[#02335E] mr-4 mb-0 p-0">
                <ChevronLeft className="chevron" size={28} strokeWidth={2.5} />
              </a>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#02335E] uppercase border-b-2 border-[#02335E] pb-1">
                DASHBOARD
              </h1>
            </div>
          </div>
        </div>

        {/* Passar dados calculados e listas para o Dashboard */}
        <Dashboard
          professorData={professorData}
          alunosData={alunosData}
          pedagogicaData={pedagogicaData}
          conselhosData={conselhosData}
          professoresVisualizaram={professoresVisualizaram}
          professoresNaoVisualizaram={professoresNaoVisualizaram}
          turmasInfo={turmasInfo}
          pedagogicosVisualizaram={pedagogicosVisualizaram}
          pedagogicosNaoVisualizaram={pedagogicosNaoVisualizaram}
          turmas={turmas}
        />
      </div>
    </div>
  )
}
