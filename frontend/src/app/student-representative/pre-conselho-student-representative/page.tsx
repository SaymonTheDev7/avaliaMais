"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Calendar, CheckCircle, TrendingUp, Lightbulb, ChevronLeft, ChevronRight, PenLine } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Header from "@/components/header-student-representative"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function PreConselho() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const [feedbackData, setFeedbackData] = useState({
    coordenacao: { pontosPositivos: '', pontosMelhoria: '', sugestoes: '' },
    java: { pontosPositivos: '', pontosMelhoria: '', sugestoes: '' },
    web: { pontosPositivos: '', pontosMelhoria: '', sugestoes: '' },
    data: { pontosPositivos: '', pontosMelhoria: '', sugestoes: '' },
    cloud: { pontosPositivos: '', pontosMelhoria: '', sugestoes: '' }
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handlePrevious = () => {
    router.push("/pedagogical-technique/inicio-pedagogical-technique")
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

    localStorage.setItem('preConselhoData', JSON.stringify({
      feedbackData,
      date: date?.toISOString()
    }))

    router.push("/student-representative/pre-conselho-revisar-student-representative")
  }

  const handleFeedbackChange = (section: string, field: string, value: string) => {
    setFeedbackData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }))

    const [date, setDate] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);
  }

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
          <h1 className="text-4xl font-bold text-[#003366] tracking-tight mb-2">Pré-Conselho MI-74</h1>
          <p className="text-slate-500 text-lg">Preencha os feedbacks para cada área</p>
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
              <div className="h-10 w-10 rounded-full bg-[#003366]/20 flex items-center justify-center text-[#003366] mb-2 border-2 border-[#003366]">
                <PenLine className="h-5 w-5" />
              </div>
              <span className="text-sm text-[#003366] font-medium">Preenchimento</span>
            </div>

            <div className="h-1 w-16 bg-slate-300 mx-2"></div>

            <div className="flex flex-col items-center mx-8">
              <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2 border-2 border-slate-300">
                <CheckCircle className="h-5 w-5" />
              </div>
              <span className="text-sm text-slate-500 font-medium">Revisão</span>
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
                className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md border border-slate-200 hover:bg-[#003366] hover:text-white hover:border-[#003366] data-[state=open]:bg-[#003366] data-[state=open]:text-white transition-all duration-300 h-auto group"
              >
                <Calendar className="calendar h-5 w-5 text-[#003366] group-hover:text-white group-data-[state=open]:text-white" />
                <span className="text-base font-medium text-slate-600 group-hover:text-white group-data-[state=open]:text-white">
                  {date ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "Selecionar data do conselho"}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 custom-calendar" align="end">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={ptBR}
                className="border border-slate-200 rounded-md"
              />
            </PopoverContent>
          </Popover>
        </motion.div>

        {/* Feedback Sections */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-8"
        >
          {/* Coordenação pedagógica */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-8">
              <FeedbackSection
                color="yellow"
                title="Coordenação pedagógica"
                name="Ana Silva"
                role="Coordenadora Pedagógica"
                feedback={feedbackData.coordenacao}
                onFeedbackChange={(field, value) => handleFeedbackChange('coordenacao', field, value)}
              />
            </div>
          </div>

          {/* Romário Hornburg - Programação JAVA */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-8">
              <FeedbackSection
                color="pink"
                title="Programação JAVA"
                name="Romário Hornburg"
                role="Professor de JAVA"
                feedback={feedbackData.java}
                onFeedbackChange={(field, value) => handleFeedbackChange('java', field, value)}
              />
            </div>
          </div>

          {/* Kristian Erdmann - Programação Web e Mobile */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-8">
              <FeedbackSection
                color="blue"
                title="Programação Web e Mobile"
                name="Kristian Erdmann"
                role="Professor de Web e Mobile"
                feedback={feedbackData.web}
                onFeedbackChange={(field, value) => handleFeedbackChange('web', field, value)}
              />
            </div>
          </div>

          {/* João Pedro da Silva Valentim - Data Science */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-8">
              <FeedbackSection
                color="green"
                title="Data Science"
                name="João Pedro da Silva Valentim"
                role="Professor de Data Science"
                feedback={feedbackData.data}
                onFeedbackChange={(field, value) => handleFeedbackChange('data', field, value)}
              />
            </div>
          </div>

          {/* Iago Soares da Silva - Fundamentos de Cloud Computing */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-8">
              <FeedbackSection
                color="purple"
                title="Fundamentos de Cloud Computing"
                name="Iago Soares da Silva"
                role="Professor de Cloud Computing"
                feedback={feedbackData.cloud}
                onFeedbackChange={(field, value) => handleFeedbackChange('cloud', field, value)}
              />
            </div>
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
            Continuar
            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </motion.div>
      </main>
    </div>
  )
}

// Os componentes FeedbackSection e FeedbackCard permanecem exatamente iguais

function FeedbackSection({
  color,
  title,
  name,
  role,
  feedback,
  onFeedbackChange
}: {
  color: "yellow" | "pink" | "blue" | "green" | "purple"
  title: string
  name: string
  role: string
  feedback: { pontosPositivos: string, pontosMelhoria: string, sugestoes: string }
  onFeedbackChange: (field: string, value: string) => void
}) {
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string, border: string, iconBg: string, iconColor: string, hoverBorder: string, focusRing: string, avatarBorder: string }> = {
      yellow: {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        iconBg: "bg-yellow-100",
        iconColor: "text-yellow-600",
        hoverBorder: "hover:border-yellow-300",
        focusRing: "focus-within:ring-yellow-200",
        avatarBorder: "border-yellow-400"
      },
      pink: {
        bg: "bg-pink-50",
        border: "border-pink-200",
        iconBg: "bg-pink-100",
        iconColor: "text-pink-600",
        hoverBorder: "hover:border-pink-300",
        focusRing: "focus-within:ring-pink-200",
        avatarBorder: "border-pink-500"
      },
      blue: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        hoverBorder: "hover:border-blue-300",
        focusRing: "focus-within:ring-blue-200",
        avatarBorder: "border-blue-500"
      },
      green: {
        bg: "bg-green-50",
        border: "border-green-200",
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
        hoverBorder: "hover:border-green-300",
        focusRing: "focus-within:ring-green-200",
        avatarBorder: "border-green-500"
      },
      purple: {
        bg: "bg-purple-50",
        border: "border-purple-200",
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        hoverBorder: "hover:border-purple-300",
        focusRing: "focus-within:ring-purple-200",
        avatarBorder: "border-purple-500"
      },
    };
    return colorMap[color] || colorMap.yellow;
  };

  const colorClasses = getColorClasses(color);

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
        <FeedbackCard
          icon={<CheckCircle className="h-6 w-6" />}
          title="Pontos positivos"
          description="Destaque os aspectos positivos observados"
          placeholder="Digite aqui os pontos positivos..."
          value={feedback.pontosPositivos}
          onChange={(value) => onFeedbackChange('pontosPositivos', value)}
          bgColor={colorClasses.bg}
          borderColor={colorClasses.border}
          iconBg={colorClasses.iconBg}
          iconColor={colorClasses.iconColor}
          hoverBorderColor={colorClasses.hoverBorder}
          focusRingColor={colorClasses.focusRing}
          delay={0}
        />

        <FeedbackCard
          icon={<TrendingUp className="h-6 w-6" />}
          title="Pontos de melhoria"
          description="Indique aspectos que precisam ser melhorados"
          placeholder="Digite aqui os pontos de melhoria..."
          value={feedback.pontosMelhoria}
          onChange={(value) => onFeedbackChange('pontosMelhoria', value)}
          bgColor={colorClasses.bg}
          borderColor={colorClasses.border}
          iconBg={colorClasses.iconBg}
          iconColor={colorClasses.iconColor}
          hoverBorderColor={colorClasses.hoverBorder}
          focusRingColor={colorClasses.focusRing}
          delay={0.1}
        />

        <FeedbackCard
          icon={<Lightbulb className="h-6 w-6" />}
          title="Sugestões de melhoria"
          description="Proponha sugestões para os pontos de melhoria"
          placeholder="Digite aqui as sugestões de melhoria..."
          value={feedback.sugestoes}
          onChange={(value) => onFeedbackChange('sugestoes', value)}
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

function FeedbackCard({
  icon,
  title,
  description,
  placeholder,
  value,
  onChange,
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
  placeholder: string
  value: string
  onChange: (value: string) => void
  bgColor: string
  borderColor: string
  iconBg: string
  iconColor: string
  hoverBorderColor: string
  focusRingColor: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`p-6 rounded-xl ${bgColor} border ${borderColor} ${hoverBorderColor} transition-all duration-300 hover:shadow-md ${focusRingColor} focus-within:ring-2 focus-within:shadow-lg`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`p-2 rounded-full ${iconBg} ${iconColor} shadow-sm`}>{icon}</div>
        <div>
          <h3 className="text-lg font-semibold text-[#003366]">{title}</h3>
          <p className="text-slate-500 text-sm">{description}</p>
        </div>
      </div>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[120px] rounded-lg p-4 border border-slate-200 bg-white/80 focus:ring-2 focus:ring-[#003366]/20 focus:border-[#003366]/30 outline-none resize-none text-slate-700 placeholder:text-slate-400 transition-all"
        required
      />
    </motion.div>
  )
}