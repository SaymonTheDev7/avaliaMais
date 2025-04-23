"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar, CheckCircle, TrendingUp, Lightbulb, Users, Code, Database, Cloud, PenLine } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Header from "@/components/header"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type FeedbackData = {
  [key: string]: {
    pontosPositivos: string
    pontosMelhoria: string
    sugestoes: string
  }
}

export default function PreConselho() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [activeTab, setActiveTab] = useState("coordenacao")
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const [feedbackData, setFeedbackData] = useState<FeedbackData>({
    coordenacao: { pontosPositivos: '', pontosMelhoria: '', sugestoes: '' },
    java: { pontosPositivos: '', pontosMelhoria: '', sugestoes: '' },
    web: { pontosPositivos: '', pontosMelhoria: '', sugestoes: '' },
    data: { pontosPositivos: '', pontosMelhoria: '', sugestoes: '' },
    cloud: { pontosPositivos: '', pontosMelhoria: '', sugestoes: '' }
  })

  useEffect(() => {
    setMounted(true)
    const savedData = localStorage.getItem('preConselhoData')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setFeedbackData(parsedData.feedbackData || {
          coordenacao: { pontosPositivos: '', pontosMelhoria: '', sugestoes: '' },
          java: { pontosPositivos: '', pontosMelhoria: '', sugestoes: '' },
          web: { pontosPositivos: '', pontosMelhoria: '', sugestoes: '' },
          data: { pontosPositivos: '', pontosMelhoria: '', sugestoes: '' },
          cloud: { pontosPositivos: '', pontosMelhoria: '', sugestoes: '' }
        })
        if (parsedData.date) {
          setDate(new Date(parsedData.date))
        }
      } catch (error) {
        console.error('Erro ao carregar dados salvos:', error)
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('preConselhoData', JSON.stringify({
        feedbackData,
        date: date?.toISOString()
      }))
    }
  }, [feedbackData, date, mounted])

  const handlePrevious = () => {
    router.push("/student-representative/pre-conselho-student-representative")
  }

  const handleNext = () => {
    const allFieldsFilled = Object.values(feedbackData).every(section => 
      Object.values(section).every(field => field.trim() !== ''));
    
    if (!allFieldsFilled) {
      toast.error("Todos os campos devem ser preenchidos antes de continuar")
      return
    }
    
    if (!date) {
      toast.error("Por favor, selecione uma data")
      return
    }
    
    router.push("/student-representative/pre-conselho-assinatura")
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-[#003366] tracking-tight mb-2">Revisão do Pré-Conselho</h1>
          <p className="text-slate-500 text-lg">Revise os feedbacks antes de enviar</p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex items-center">
            <div className="flex flex-col items-center mr-8">
              <div className="h-10 w-10 rounded-full bg-[#003366] flex items-center justify-center text-white mb-2">
                <CheckCircle className="h-5 w-5" />
              </div>
              <span className="text-sm text-[#003366] font-medium">Preenchimento</span>
            </div>
            
            <div className="h-1 w-16 bg-[#003366] mx-2"></div>
            
            <div className="flex flex-col items-center mx-8">
              <div className="h-10 w-10 rounded-full bg-[#003366]/20 flex items-center justify-center text-[#003366] mb-2 border-2 border-[#003366]">
                <PenLine className="h-5 w-5" />
              </div>
              <span className="text-sm text-[#003366] font-medium">Revisão</span>
            </div>
            
            <div className="h-1 w-16 bg-slate-300 mx-2"></div>
            
            <div className="flex flex-col items-center ml-8">
              <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2 border-2 border-slate-300">
                <CheckCircle className="h-5 w-5" />
              </div>
              <span className="text-sm text-slate-500 font-medium">Assinatura</span>
            </div>
          </div>
        </motion.div>

        {/* Date Picker */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mb-10"
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300 h-auto"
              >
                <Calendar className="calendar h-5 w-5 text-[#003366]" />
                <span className="text-base font-medium text-slate-600">
                  {date ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "Selecionar data do conselho"}
                </span>
              </Button>
            </PopoverTrigger>
            
          </Popover>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap md:flex-nowrap mb-8 gap-3 overflow-x-auto pb-2"
        >
          <TabButton
            active={activeTab === "coordenacao"}
            color="bg-yellow-400"
            onClick={() => setActiveTab("coordenacao")}
            label="Coordenação pedagógica"
            icon={<Users className="h-4 w-4" />}
          />
          <TabButton
            active={activeTab === "java"}
            color="bg-pink-500"
            onClick={() => setActiveTab("java")}
            label="Romário Hornburg - JAVA"
            icon={<Code className="h-4 w-4" />}
          />
          <TabButton
            active={activeTab === "web"}
            color="bg-blue-500"
            onClick={() => setActiveTab("web")}
            label="Kristian Erdmann - Web/Mobile"
            icon={<Code className="h-4 w-4" />}
          />
          <TabButton
            active={activeTab === "data"}
            color="bg-green-500"
            onClick={() => setActiveTab("data")}
            label="João Pedro - Data Science"
            icon={<Database className="h-4 w-4" />}
          />
          <TabButton
            active={activeTab === "cloud"}
            color="bg-purple-500"
            onClick={() => setActiveTab("cloud")}
            label="Iago Soares - Cloud"
            icon={<Cloud className="h-4 w-4" />}
          />
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        >
          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "coordenacao" ? (
              <FeedbackSection 
                color="yellow" 
                title="Coordenação pedagógica" 
                name="Ana Silva"
                role="Coordenadora Pedagógica"
                feedback={feedbackData.coordenacao}
              />
            ) : activeTab === "java" ? (
              <FeedbackSection 
                color="pink" 
                title="Programação JAVA" 
                name="Romário Hornburg"
                role="Professor de JAVA"
                feedback={feedbackData.java}
              />
            ) : activeTab === "web" ? (
              <FeedbackSection 
                color="blue" 
                title="Programação Web e Mobile" 
                name="Kristian Erdmann"
                role="Professor de Web e Mobile"
                feedback={feedbackData.web}
              />
            ) : activeTab === "data" ? (
              <FeedbackSection 
                color="green" 
                title="Data Science" 
                name="João Pedro da Silva Valentim"
                role="Professor de Data Science"
                feedback={feedbackData.data}
              />
            ) : (
              <FeedbackSection 
                color="purple" 
                title="Fundamentos de Cloud Computing" 
                name="Iago Soares da Silva"
                role="Professor de Cloud Computing"
                feedback={feedbackData.cloud}
              />
            )}
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-between mt-12"
        >
            <Button
            variant="outline"
            onClick={handlePrevious}
            className="bg-white border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white transition px-4 py-2 h-auto rounded-md shadow group text-base"
          >
            <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-0.5 transition-transform" />
            Voltar
          </Button>

          <Button 
            onClick={handleNext}
            className="bg-[#003366] text-white hover:bg-[#002244] transition px-4 py-2 h-auto rounded-md shadow group text-base"
          >
            Continuar para assinatura
            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </motion.div>
      </main>
    </div>
  )
}

// Os componentes TabButton, FeedbackSection e FeedbackCard permanecem exatamente iguais

// Tab Button Component
function TabButton({
  active,
  color,
  onClick,
  label,
  icon,
}: {
  active: boolean
  color: string
  onClick: () => void
  label: string
  icon: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 flex-1 md:flex-none justify-center md:justify-start min-w-max ${
        active
          ? "bg-[#003366] text-white shadow-lg"
          : "bg-white text-slate-600 hover:bg-slate-100 shadow-sm border border-slate-200 hover:shadow-md"
      }`}
    >
      <div className={`h-3 w-3 rounded-full ${color} ${active ? "animate-pulse" : ""}`}></div>
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
    </button>
  )
}

// Feedback Section Component (modificado para apenas visualização)
function FeedbackSection({ 
  color, 
  title, 
  name,
  role,
  feedback
}: { 
  color: "yellow" | "pink" | "blue" | "green" | "purple"
  title: string
  name: string
  role: string
  feedback: { pontosPositivos: string, pontosMelhoria: string, sugestoes: string }
}) {
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string, border: string, iconBg: string, iconColor: string, hoverBorder: string, focusRing: string }> = {
      yellow: { 
        bg: "bg-yellow-50", 
        border: "border-yellow-200", 
        iconBg: "bg-yellow-100", 
        iconColor: "text-yellow-600",
        hoverBorder: "hover:border-yellow-300",
        focusRing: "focus-within:ring-yellow-200"
      },
      pink: { 
        bg: "bg-pink-50", 
        border: "border-pink-200", 
        iconBg: "bg-pink-100", 
        iconColor: "text-pink-600",
        hoverBorder: "hover:border-pink-300",
        focusRing: "focus-within:ring-pink-200"
      },
      blue: { 
        bg: "bg-blue-50", 
        border: "border-blue-200", 
        iconBg: "bg-blue-100", 
        iconColor: "text-blue-600",
        hoverBorder: "hover:border-blue-300",
        focusRing: "focus-within:ring-blue-200"
      },
      green: { 
        bg: "bg-green-50", 
        border: "border-green-200", 
        iconBg: "bg-green-100", 
        iconColor: "text-green-600",
        hoverBorder: "hover:border-green-300",
        focusRing: "focus-within:ring-green-200"
      },
      purple: { 
        bg: "bg-purple-50", 
        border: "border-purple-200", 
        iconBg: "bg-purple-100", 
        iconColor: "text-purple-600",
        hoverBorder: "hover:border-purple-300",
        focusRing: "focus-within:ring-purple-200"
      },
    };
    return colorMap[color] || colorMap.yellow;
  };

  const colorClasses = getColorClasses(color);

  // Função para formatar texto com quebras de linha
  const formatTextWithLineBreaks = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        <br />
      </span>
    ))
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${color === "yellow" ? "bg-yellow-400" : 
                           color === "pink" ? "bg-pink-500" : 
                           color === "blue" ? "bg-blue-500" : 
                           color === "green" ? "bg-green-500" : "bg-purple-500"} text-white font-bold`}>
          {name.charAt(0)}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#003366]">{title}</h2>
          <p className="text-slate-500">{name} • {role}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Pontos Positivos */}
        <FeedbackCard
          icon={<CheckCircle className="h-6 w-6" />}
          title="Pontos positivos"
          description="Destaque os aspectos positivos observados"
          content={feedback.pontosPositivos}
          bgColor={colorClasses.bg}
          borderColor={colorClasses.border}
          iconBg={colorClasses.iconBg}
          iconColor={colorClasses.iconColor}
          hoverBorderColor={colorClasses.hoverBorder}
          focusRingColor={colorClasses.focusRing}
          delay={0}
        />

        {/* Pontos de Melhoria */}
        <FeedbackCard
          icon={<TrendingUp className="h-6 w-6" />}
          title="Pontos de melhoria"
          description="Indique aspectos que precisam ser melhorados"
          content={feedback.pontosMelhoria}
          bgColor={colorClasses.bg}
          borderColor={colorClasses.border}
          iconBg={colorClasses.iconBg}
          iconColor={colorClasses.iconColor}
          hoverBorderColor={colorClasses.hoverBorder}
          focusRingColor={colorClasses.focusRing}
          delay={0.1}
        />

        {/* Sugestões de Melhoria */}
        <FeedbackCard
          icon={<Lightbulb className="h-6 w-6" />}
          title="Sugestões de melhoria"
          description="Proponha sugestões para os pontos de melhoria"
          content={feedback.sugestoes}
          bgColor={colorClasses.bg}
          borderColor={colorClasses.border}
          iconBg={colorClasses.iconBg}
          iconColor={colorClasses.iconColor}
          hoverBorderColor={colorClasses.hoverBorder}
          focusRingColor={colorClasses.focusRing}
          delay={0.2}
        />
      </div>
    </div>
  )
}

// Feedback Card Component (modificado para apenas visualização)
function FeedbackCard({
  icon,
  title,
  description,
  content,
  bgColor,
  borderColor,
  iconBg,
  iconColor,
  hoverBorderColor,
  focusRingColor,
  delay,
}: {
  icon: React.ReactNode
  title: string
  description: string
  content: string
  bgColor: string
  borderColor: string
  iconBg: string
  iconColor: string
  hoverBorderColor: string
  focusRingColor: string
  delay: number
}) {
  // Função para formatar texto com quebras de linha
  const formatTextWithLineBreaks = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        <br />
      </span>
    ))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`p-6 rounded-xl ${bgColor} border ${borderColor} ${hoverBorderColor} transition-all duration-300 hover:shadow-md ${focusRingColor}`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`p-2 rounded-full ${iconBg} ${iconColor} shadow-sm`}>{icon}</div>
        <div>
          <h3 className="text-lg font-semibold text-[#003366]">{title}</h3>
          <p className="text-slate-500 text-sm">{description}</p>
        </div>
      </div>
      <div className="w-full min-h-[120px] rounded-lg p-4 border border-slate-200 bg-white/80 text-slate-700 whitespace-pre-line">
        {content ? formatTextWithLineBreaks(content) : "Nenhum conteúdo fornecido"}
      </div>
    </motion.div>
  )
}