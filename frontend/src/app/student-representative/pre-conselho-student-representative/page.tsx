"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Calendar, Upload, X, CheckCircle, TrendingUp, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Header from "@/components/header"
import { motion } from "framer-motion"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PreConselho() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [mounted, setMounted] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      // Create preview URL
      const reader = new FileReader()
      reader.onload = (event) => {
        setFilePreview(event.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setFilePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

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
              <p className="text-slate-500 mt-2">Revise as informações antes de enviar</p>
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

        {/* All Sections */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-8"
        >
          {/* Coordenação pedagógica */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-8">
              <FeedbackSection 
                color="yellow" 
                title="Coordenação pedagógica" 
                avatar="/placeholder.svg?height=48&width=48"
                name="Ana Silva"
                role="Coordenadora Pedagógica"
              />
            </div>
          </div>

          {/* Romário Hornburg - Programação JAVA */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-8">
              <FeedbackSection 
                color="pink" 
                title="Programação JAVA" 
                avatar="/placeholder.svg?height=48&width=48"
                name="Romário Hornburg"
                role="Professor de JAVA"
              />
            </div>
          </div>

          {/* Kristian Erdmann - Programação Web e Mobile */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-8">
              <FeedbackSection 
                color="blue" 
                title="Programação Web e Mobile" 
                avatar="/placeholder.svg?height=48&width=48"
                name="Kristian Erdmann"
                role="Professor de Web e Mobile"
              />
            </div>
          </div>

          {/* João Pedro da Silva Valentim - Data Science */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-8">
              <FeedbackSection 
                color="green" 
                title="Data Science" 
                avatar="/placeholder.svg?height=48&width=48"
                name="João Pedro da Silva Valentim"
                role="Professor de Data Science"
              />
            </div>
          </div>

          {/* Iago Soares da Silva - Fundamentos de Cloud Computing */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-8">
              <FeedbackSection 
                color="purple" 
                title="Fundamentos de Cloud Computing" 
                avatar="/placeholder.svg?height=48&width=48"
                name="Iago Soares da Silva"
                role="Professor de Cloud Computing"
              />
            </div>
          </div>
        </motion.div>

        {/* Attachment Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        >
          <div className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <Avatar className="h-12 w-12 border-2 border-slate-300 shadow-md">
                <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Anexo" />
                <AvatarFallback className="bg-slate-400 text-white">AN</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-[#003366]">Anexo</h2>
                <p className="text-slate-500">Folha de assinaturas</p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-md focus-within:ring-2 focus-within:ring-slate-200 focus-within:shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-2 rounded-full bg-slate-100 text-slate-600 shadow-sm">
                  <Upload className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#003366]">Folha de assinaturas</h3>
                  <p className="text-slate-500 text-sm">A folha deve ser clara e legível, deve conter a folha inteira, sem borrões e com boa iluminação</p>
                </div>
              </div>

              {filePreview ? (
                <div className="relative w-full rounded-lg overflow-hidden">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8 rounded-full absolute top-2 right-2 z-10 shadow-md"
                    onClick={handleRemoveFile}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Image
                    src={filePreview || "/placeholder.svg"}
                    alt="Uploaded file preview"
                    width={800}
                    height={400}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div
                  className="border-2 border-dashed border-slate-300 rounded-lg h-[120px] flex flex-col items-center justify-center cursor-pointer hover:border-[#003366] transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-8 w-8 text-slate-400 mb-2" />
                  <p className="text-slate-600 font-medium">Clique para selecionar um arquivo</p>
                  <p className="text-slate-400 text-sm">ou arraste e solte aqui</p>
                </div>
              )}
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            </div>
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
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

// Feedback Section Component
function FeedbackSection({ 
  color, 
  title, 
  avatar,
  name,
  role
}: { 
  color: "yellow" | "pink" | "blue" | "green" | "purple"
  title: string
  avatar: string
  name: string
  role: string
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
        <Avatar className={`h-12 w-12 border-2 ${colorClasses.avatarBorder} shadow-md`}>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className={color === "yellow" ? "bg-yellow-400" : 
                           color === "pink" ? "bg-pink-500" : 
                           color === "blue" ? "bg-blue-500" : 
                           color === "green" ? "bg-green-500" : "bg-purple-500"}>
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
          placeholder="Digite aqui os pontos de melhoria..."
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
          placeholder="Digite aqui as sugestões de melhoria..."
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
