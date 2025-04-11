"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar, CheckCircle, TrendingUp, Lightbulb, Users, Code } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Header from "@/components/header"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PreConselho() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [activeTab, setActiveTab] = useState("coordenacao")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {/* Title and Date Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10"
        >
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-[#003366] shadow-md">
              <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Usuário" />
              <AvatarFallback className="bg-[#003366] text-white">MI</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-[#003366] tracking-tight">Pré conselho MI-74</h1>
              <p className="text-slate-500 mt-2">Formulário de avaliação e feedback</p>
            </div>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-white p-2 pl-4 rounded-full shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300 h-auto"
              >
                <Calendar className="h-5 w-5 text-[#003366]" />
                <span className="text-sm font-medium text-slate-600">
                  {date ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "Selecionar data"}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                locale={ptBR}
                className="border rounded-md"
              />
            </PopoverContent>
          </Popover>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap md:flex-nowrap mb-8 gap-3"
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
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        >
          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "coordenacao" ? (
              <FeedbackSection 
                color="yellow" 
                title="Coordenação pedagógica" 
                avatar="/placeholder.svg?height=48&width=48"
                name="Ana Silva"
                role="Coordenadora Pedagógica"
              />
            ) : (
              <FeedbackSection 
                color="pink" 
                title="Programação JAVA" 
                avatar="/placeholder.svg?height=48&width=48"
                name="Romário Hornburg"
                role="Professor de JAVA"
              />
            )}
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-between mt-8"
        >
          <Button
            variant="outline"
            className="bg-white border-[#003366] text-[#003366] hover:bg-[#003366]/5 hover:border-[#003366] transition-all px-6 py-2 h-auto rounded-full shadow-sm group"
          >
            <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Anterior
          </Button>

          <Button className="bg-[#003366] text-white hover:bg-[#002244] transition-all px-6 py-2 h-auto rounded-full shadow-md group">
            Próximo
            <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </main>
    </div>
  )
}

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
      className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 flex-1 md:flex-none justify-center md:justify-start ${
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

// Feedback Section Component
function FeedbackSection({ 
  color, 
  title, 
  avatar,
  name,
  role
}: { 
  color: "yellow" | "pink"
  title: string
  avatar: string
  name: string
  role: string
}) {
  const bgColor = color === "yellow" ? "bg-yellow-50" : "bg-pink-50"
  const borderColor = color === "yellow" ? "border-yellow-200" : "border-pink-200"
  const iconBg = color === "yellow" ? "bg-yellow-100" : "bg-pink-100"
  const iconColor = color === "yellow" ? "text-yellow-600" : "text-pink-600"
  const hoverBorderColor = color === "yellow" ? "hover:border-yellow-300" : "hover:border-pink-300"
  const focusRingColor = color === "yellow" ? "focus-within:ring-yellow-200" : "focus-within:ring-pink-200"
  const avatarBorder = color === "yellow" ? "border-yellow-400" : "border-pink-500"

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Avatar className={`h-12 w-12 border-2 ${avatarBorder} shadow-md`}>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className={color === "yellow" ? "bg-yellow-400" : "bg-pink-500"}>
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
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
          placeholder="Digite aqui os pontos positivos..."
          bgColor={bgColor}
          borderColor={borderColor}
          iconBg={iconBg}
          iconColor={iconColor}
          hoverBorderColor={hoverBorderColor}
          focusRingColor={focusRingColor}
          delay={0}
        />

        {/* Pontos de Melhoria */}
        <FeedbackCard
          icon={<TrendingUp className="h-6 w-6" />}
          title="Pontos de melhoria"
          description="Indique aspectos que precisam ser melhorados"
          placeholder="Digite aqui os pontos de melhoria..."
          bgColor={bgColor}
          borderColor={borderColor}
          iconBg={iconBg}
          iconColor={iconColor}
          hoverBorderColor={hoverBorderColor}
          focusRingColor={focusRingColor}
          delay={0.1}
        />

        {/* Sugestões de Melhoria */}
        <FeedbackCard
          icon={<Lightbulb className="h-6 w-6" />}
          title="Sugestões de melhoria"
          description="Proponha sugestões para os pontos de melhoria"
          placeholder="Digite aqui as sugestões de melhoria..."
          bgColor={bgColor}
          borderColor={borderColor}
          iconBg={iconBg}
          iconColor={iconColor}
          hoverBorderColor={hoverBorderColor}
          focusRingColor={focusRingColor}
          delay={0.2}
        />
      </div>
    </div>
  )
}

// Feedback Card Component
function FeedbackCard({
  icon,
  title,
  description,
  placeholder,
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
        className="w-full h-[120px] rounded-lg p-4 border border-slate-200 bg-white/80 focus:ring-2 focus:ring-[#003366]/20 focus:border-[#003366]/30 outline-none resize-none text-slate-700 placeholder:text-slate-400 transition-all"
      />
    </motion.div>
  )
}
