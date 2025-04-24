"use client"

import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Header from "@/components/header-student-representative"
import { useRouter } from "next/navigation"

export default function ConfirmacaoPage() {
  const router = useRouter()

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

          <Button onClick={() => router.push("/student-representative/inicio-student-representative")} className="bg-[#003366] text-white">
            Voltar para a Página Inicial
          </Button>
        </motion.div>
      </main>
    </div>
  )
}
