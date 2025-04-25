"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Header from "@/components/header-student-representative"
import { useEffect } from "react"

export default function ConfirmacaoPage() {
  const router = useRouter()

  useEffect(() => {
    // Atualiza o status do conselho ativo no localStorage
    const activeConselhoId = localStorage.getItem('activeConselhoId')
    if (activeConselhoId) {
      const conselhos = JSON.parse(localStorage.getItem('conselhos') || '[]')
      const updatedConselhos = conselhos.map((c: any) => 
        c.id === parseInt(activeConselhoId) ? { ...c, status: "completed" } : c
      )
      localStorage.setItem('conselhos', JSON.stringify(updatedConselhos))
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-16 max-w-4xl flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-10 rounded-2xl shadow-xl border border-slate-200"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-green-100 text-green-600">
              <CheckCircle className="h-10 w-10" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#003366] mb-4">Formulário enviado com sucesso!</h1>
          <p className="text-slate-600 mb-6">
            Agradecemos sua participação. Seu feedback foi recebido e será analisado pela coordenação do curso.
          </p>

          <Button 
            onClick={() => router.push("/student-representative/historico-conselhos-student-representative")} 
            className="bg-[#003366] text-white"
          >
            Voltar para o Histórico
          </Button>
        </motion.div>
      </main>
    </div>
  )
}