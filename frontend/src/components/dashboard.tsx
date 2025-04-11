"use client"

import React, { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { X, ChevronLeft } from "lucide-react"

// Definição de interfaces
interface Pessoa {
  nome: string
  visualizou: number
}

interface TurmaInfo {
  nome: string
  visualizaram: number
  naoVisualizaram: number
  total: number
}

interface Aluno {
  nome: string
  visualizou: number
}

interface Turma {
  nome: string
  alunos: Aluno[]
}

interface DadoGrafico {
  name: string
  value: number
}

interface DashboardProps {
  professorData: DadoGrafico[]
  alunosData: DadoGrafico[]
  pedagogicaData: DadoGrafico[]
  conselhosData: { name: string }[]
  professoresVisualizaram?: Pessoa[]
  professoresNaoVisualizaram?: Pessoa[]
  turmasInfo?: TurmaInfo[]
  pedagogicosVisualizaram?: Pessoa[]
  pedagogicosNaoVisualizaram?: Pessoa[]
  turmas?: Turma[]
}

const COLORS = ["#02335E", "#D4D4D4"]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  // Determinar a cor do texto com base no índice em vez da porcentagem
  // Índice 0 = visualizaram (azul escuro) = texto branco
  // Índice 1 = não visualizaram (cinza claro) = texto azul escuro
  const fill = index === 0 ? "white" : "#02335E"

  return (
    <text
      x={x}
      y={y}
      fill={fill}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize="16"
      fontWeight="bold"
      stroke="none"
      strokeWidth="1"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

interface PopupProps {
  title: string
  content: React.ReactNode
  onClose: () => void
}

const Popup: React.FC<PopupProps> = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-[#02335E]">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors" aria-label="Fechar">
            <X size={24} />
          </button>
        </div>
        <div className="mb-6 max-h-[60vh] overflow-y-auto pr-1">{content}</div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#02335E] text-white rounded hover:bg-opacity-90 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

export function Dashboard({
  professorData,
  alunosData,
  pedagogicaData,
  conselhosData,
  professoresVisualizaram = [],
  professoresNaoVisualizaram = [],
  turmasInfo = [],
  pedagogicosVisualizaram = [],
  pedagogicosNaoVisualizaram = [],
  turmas = [],
}: DashboardProps) {
  const [selectedConselho, setSelectedConselho] = useState(conselhosData[0]?.name || "")
  const [showProfessorPopup, setShowProfessorPopup] = useState(false)
  const [showAlunosPopup, setShowAlunosPopup] = useState(false)
  const [showPedagogicaPopup, setShowPedagogicaPopup] = useState(false)
  const [popupType, setPopupType] = useState<"visualizaram" | "nao-visualizaram">("nao-visualizaram")

  // Estados para o detalhe da turma
  const [selectedTurma, setSelectedTurma] = useState<string | null>(null)
  const [showTurmaDetails, setShowTurmaDetails] = useState(false)

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowProfessorPopup(false)
        setShowAlunosPopup(false)
        setShowPedagogicaPopup(false)
        setShowTurmaDetails(false)
        setSelectedTurma(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleConselhoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedConselho(event.target.value)
  }

  const handlePieClick = (data: any, index: number, chartType: "professor" | "alunos" | "pedagogica") => {
    // Definir o tipo de popup com base no índice clicado
    setPopupType(index === 0 ? "visualizaram" : "nao-visualizaram")

    // Fechar qualquer popup aberto antes de abrir um novo
    setShowProfessorPopup(false)
    setShowAlunosPopup(false)
    setShowPedagogicaPopup(false)
    setShowTurmaDetails(false)
    setSelectedTurma(null)

    // Pequeno timeout para garantir que o popup anterior seja fechado antes de abrir o novo
    setTimeout(() => {
      if (chartType === "professor") {
        setShowProfessorPopup(true)
      } else if (chartType === "alunos") {
        setShowAlunosPopup(true)
      } else if (chartType === "pedagogica") {
        setShowPedagogicaPopup(true)
      }
    }, 10)
  }

  const handleTurmaClick = (turmaNome: string) => {
    setSelectedTurma(turmaNome)
    setShowTurmaDetails(true)
  }

  const handleBackToTurmas = () => {
    setShowTurmaDetails(false)
    setSelectedTurma(null)
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900">
      <div className="p-4">
        <div className="mb-4 text-lg font-medium text-[#02335E]">SELECIONE O CONCELHO:</div>
        <select
          value={selectedConselho}
          onChange={handleConselhoChange}
          className="w-full p-2 border rounded text-lg"
          style={{ borderColor: "#02335E", color: "#02335E" }}
        >
          {conselhosData.map((conselho, index) => (
            <option key={index} value={conselho.name} style={{ color: "#02335E" }}>
              {conselho.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-grow p-4">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-md p-4">
          <div className="flex justify-around flex-wrap">
            {/* Chart 1: Professores */}
            <div className="flex flex-col items-center mb-6">
              <h2 className="text-xl font-semibold text-[#02335E] dark:text-gray-300 mb-4">Professores</h2>
              <ResponsiveContainer width={350} height={350}>
                <PieChart width={350} height={350}>
                  <Pie
                    data={professorData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(props) => renderCustomizedLabel({ ...props, index: props.index })}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    onClick={(data, index) => handlePieClick(data, index, "professor")}
                    cursor="pointer"
                  >
                    {professorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Chart 2: Alunos */}
            <div className="flex flex-col items-center mb-6">
              <h2 className="text-xl font-semibold text-[#02335E] dark:text-gray-300 mb-4">Alunos</h2>
              <ResponsiveContainer width={350} height={350}>
                <PieChart width={350} height={350}>
                  <Pie
                    data={alunosData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(props) => renderCustomizedLabel({ ...props, index: props.index })}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    onClick={(data, index) => handlePieClick(data, index, "alunos")}
                    cursor="pointer"
                  >
                    {alunosData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Chart 3: Pedagogico */}
            <div className="flex flex-col items-center mb-6">
              <h2 className="text-xl font-semibold text-[#02335E] dark:text-gray-300 mb-4">Pedagógico</h2>
              <ResponsiveContainer width={350} height={350}>
                <PieChart width={350} height={350}>
                  <Pie
                    data={pedagogicaData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(props) => renderCustomizedLabel({ ...props, index: props.index })}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    onClick={(data, index) => handlePieClick(data, index, "pedagogica")}
                    cursor="pointer"
                  >
                    {pedagogicaData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Legend */}
          <div className="flex justify-center mt-4 text-lg flex-wrap">
            <div className="flex items-center mr-4 mb-2">
              <div className="w-4 h-4 bg-[#02335E] mr-2"></div>
              <span style={{ color: "#02335E" }}>Visualizaram o feedback</span>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-[#D4D4D4] mr-2"></div>
              <span style={{ color: "#02335E" }}>Não visualizaram o feedback</span>
            </div>
          </div>
        </div>
      </div>

      {/* Popups */}
      {showProfessorPopup && professorData.length > 0 && (
        <Popup
          title={
            popupType === "visualizaram"
              ? "Professores que visualizaram o feedback"
              : "Professores que não visualizaram o feedback"
          }
          content={
            <div>
              <p className="mb-4">
                {popupType === "visualizaram"
                  ? `${professorData[0].value}% dos professores já visualizaram o feedback para o concelho ${selectedConselho}.`
                  : `${professorData[1].value}% dos professores ainda não visualizaram o feedback para o concelho ${selectedConselho}.`}
              </p>
              <div className="bg-gray-100 p-4 rounded-md">
                <h4 className="font-semibold mb-2 text-[#02335E]">Lista de professores:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {popupType === "visualizaram"
                    ? professoresVisualizaram.map((professor, index) => <li key={index}>{professor.nome}</li>)
                    : professoresNaoVisualizaram.map((professor, index) => <li key={index}>{professor.nome}</li>)}
                </ul>
              </div>
              <p className="mt-4 text-sm text-gray-600 italic">
                {popupType === "visualizaram"
                  ? "Estes professores já acessaram e revisaram o feedback disponibilizado."
                  : "Estes professores ainda não acessaram o sistema para revisar o feedback."}
              </p>
            </div>
          }
          onClose={() => setShowProfessorPopup(false)}
        />
      )}

      {showAlunosPopup && alunosData.length > 0 && (
        <Popup
          title={
            showTurmaDetails && selectedTurma
              ? popupType === "visualizaram"
                ? `Alunos da ${selectedTurma} que visualizaram o feedback`
                : `Alunos da ${selectedTurma} que não visualizaram o feedback`
              : popupType === "visualizaram"
                ? "Alunos que visualizaram o feedback"
                : "Alunos que não visualizaram o feedback"
          }
          content={
            <div>
              {!showTurmaDetails ? (
                // Vista de turmas
                <>
                  <p className="mb-4">
                    {popupType === "visualizaram"
                      ? `${alunosData[0].value}% dos alunos já visualizaram o feedback para o concelho ${selectedConselho}.`
                      : `${alunosData[1].value}% dos alunos ainda não visualizaram o feedback para o concelho ${selectedConselho}.`}
                  </p>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <h4 className="font-semibold mb-2 text-[#02335E]">Distribuição por turmas:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      {turmasInfo.map((turma, index) => (
                        <li key={index}>
                          <button
                            onClick={() => handleTurmaClick(turma.nome)}
                            className="font-medium text-[#02335E] hover:underline focus:outline-none flex items-center"
                          >
                            <span>{turma.nome}:</span>{" "}
                            {popupType === "visualizaram"
                              ? `${turma.visualizaram} alunos (${Math.round((turma.visualizaram / turma.total) * 100)}%)`
                              : `${turma.naoVisualizaram} alunos (${Math.round((turma.naoVisualizaram / turma.total) * 100)}%)`}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="mt-4 text-sm text-gray-600 italic">
                    {popupType === "visualizaram"
                      ? "Estes dados representam os alunos que já acessaram o sistema para visualizar o feedback."
                      : "É importante incentivar os alunos a visualizarem o feedback para melhorar seu desempenho."}
                  </p>
                  <p className="mt-2 text-sm text-[#02335E]">Clique em uma turma para ver a lista de alunos.</p>
                </>
              ) : (
                // Vista detalhada de uma turma - mostra apenas os alunos relevantes ao contexto
                <>
                  <button
                    onClick={handleBackToTurmas}
                    className="mb-4 flex items-center text-[#02335E] hover:underline"
                  >
                    <ChevronLeft size={16} />
                    <span>Voltar para lista de turmas</span>
                  </button>

                  <div className="bg-gray-100 p-4 rounded-md">
                    <h4 className="font-semibold mb-3 text-[#02335E]">
                      {popupType === "visualizaram"
                        ? "Alunos que visualizaram o feedback:"
                        : "Alunos que não visualizaram o feedback:"}
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {turmas
                        .find((t) => t.nome === selectedTurma)
                        ?.alunos.filter((a) => (popupType === "visualizaram" ? a.visualizou === 1 : a.visualizou === 0))
                        .map((aluno, index) => (
                          <li key={index} className={popupType === "visualizaram" ? "text-green-700" : "text-red-700"}>
                            {aluno.nome} {popupType === "visualizaram" && "✓"}
                          </li>
                        ))}
                      {(turmas
                        .find((t) => t.nome === selectedTurma)
                        ?.alunos.filter((a) => (popupType === "visualizaram" ? a.visualizou === 1 : a.visualizou === 0))
                        .length || 0) === 0 && (
                        <li className="italic text-gray-500">
                          {popupType === "visualizaram"
                            ? "Nenhum aluno visualizou o feedback nesta turma"
                            : "Todos os alunos visualizaram o feedback nesta turma"}
                        </li>
                      )}
                    </ul>
                  </div>

                  <p className="mt-4 text-sm text-gray-600">
                    {popupType === "visualizaram"
                      ? `${turmas.find((t) => t.nome === selectedTurma)?.alunos.filter((a) => a.visualizou === 1).length || 0} de ${turmas.find((t) => t.nome === selectedTurma)?.alunos.length || 0} alunos visualizaram o feedback`
                      : `${turmas.find((t) => t.nome === selectedTurma)?.alunos.filter((a) => a.visualizou === 0).length || 0} de ${turmas.find((t) => t.nome === selectedTurma)?.alunos.length || 0} alunos não visualizaram o feedback`}
                  </p>
                </>
              )}
            </div>
          }
          onClose={() => {
            setShowAlunosPopup(false)
            setShowTurmaDetails(false)
            setSelectedTurma(null)
          }}
        />
      )}

      {showPedagogicaPopup && pedagogicaData.length > 0 && (
        <Popup
          title={
            popupType === "visualizaram"
              ? "Equipe pedagógica que visualizou o feedback"
              : "Equipe pedagógica que não visualizou o feedback"
          }
          content={
            <div>
              <p className="mb-4">
                {popupType === "visualizaram"
                  ? `${pedagogicaData[0].value}% da equipe pedagógica já visualizou o feedback para o concelho ${selectedConselho}.`
                  : `${pedagogicaData[1].value}% da equipe pedagógica ainda não visualizou o feedback para o concelho ${selectedConselho}.`}
              </p>
              <div className="bg-gray-100 p-4 rounded-md">
                <h4 className="font-semibold mb-2 text-[#02335E]">Membros da equipe:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {popupType === "visualizaram"
                    ? pedagogicosVisualizaram.map((membro, index) => <li key={index}>{membro.nome}</li>)
                    : pedagogicosNaoVisualizaram.map((membro, index) => <li key={index}>{membro.nome}</li>)}
                </ul>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                {popupType === "visualizaram"
                  ? "A visualização dos feedbacks pela equipe pedagógica é essencial para o acompanhamento do desenvolvimento dos alunos."
                  : "É importante que toda a equipe pedagógica visualize os feedbacks para garantir um acompanhamento adequado dos alunos."}
              </p>
            </div>
          }
          onClose={() => setShowPedagogicaPopup(false)}
        />
      )}
    </div>
  )
}
