"use client"

import type React from "react"
import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, Upload, X, CheckCircle, FileText, PenLine } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function PreConselhoAssinatura() {
  const [file, setFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [isSigned, setIsSigned] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

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

  const handlePrevious = () => {
    router.push("/student-representative/pre-conselho-revisar-student-representative")
  }

  const handleSubmit = () => {
    // Aqui você pode adicionar a lógica para enviar os dados
    console.log("Arquivo enviado:", file)
    console.log("Assinatura confirmada:", isSigned)
    router.push("/student-representative/confirmacao") // Página de confirmação
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-[#003366] tracking-tight mb-2">Finalização do Pré-Conselho</h1>
          <p className="text-slate-500 text-lg">Confirme e assine para envio</p>
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
              <div className="h-10 w-10 rounded-full bg-[#003366] flex items-center justify-center text-white mb-2">
                <CheckCircle className="h-5 w-5" />
              </div>
              <span className="text-sm text-[#003366] font-medium">Revisão</span>
            </div>
            
            <div className="h-1 w-16 bg-[#003366] mx-2"></div>
            
            <div className="flex flex-col items-center ml-8">
              <div className="h-10 w-10 rounded-full bg-[#003366]/20 flex items-center justify-center text-[#003366] mb-2 border-2 border-[#003366]">
                <PenLine className="h-5 w-5" />
              </div>
              <span className="text-sm text-[#003366] font-medium">Assinatura</span>
            </div>
          </div>
        </motion.div>

        {/* Confirmation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8"
        >
          <div className="p-8">
            <div className="flex items-center gap-6">
              <div className="p-3 rounded-lg bg-green-50 text-green-600">
                <CheckCircle className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#003366] mb-1">Revisão concluída com sucesso!</h2>
                <p className="text-slate-600">Todos os feedbacks foram revisados e estão prontos para envio.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Attachment Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8"
        >
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#003366] mb-2">Anexo obrigatório</h2>
              <div className="flex items-center gap-2 text-slate-500">
                <FileText className="h-5 w-5" />
                <span>Folha de assinaturas digitalizada</span>
              </div>
            </div>

            <div className={`p-6 rounded-xl border-2 ${file ? 'border-green-100 bg-green-50' : 'border-dashed border-slate-200 bg-slate-50'} transition-all duration-300`}>
              {filePreview ? (
                <div className="relative w-full rounded-lg overflow-hidden group">
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2"
                      onClick={handleRemoveFile}
                    >
                      <X className="h-4 w-4" />
                      Remover arquivo
                    </Button>
                  </div>
                  <Image
                    src={filePreview}
                    alt="Uploaded file preview"
                    width={800}
                    height={400}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div
                  className="flex flex-col items-center justify-center py-12 px-4 cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="p-4 mb-4 rounded-full bg-[#003366]/10 text-[#003366]">
                    <Upload className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#003366] mb-1">Adicionar arquivo</h3>
                  <p className="text-slate-500 text-center max-w-md">
                    Arraste e solte o arquivo aqui ou clique para selecionar. Formatos aceitos: JPG, PNG ou PDF.
                  </p>
                  <p className="text-slate-400 text-sm mt-2">Tamanho máximo: 5MB</p>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*,.pdf" 
                className="hidden" 
              />
            </div>
          </div>
        </motion.div>

        {/* Signature Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8"
        >
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#003366] mb-2">Confirmação de autoria</h2>
              <p className="text-slate-500">Declaro que as informações fornecidas são verdadeiras</p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200">
              <label className="flex items-start gap-4 cursor-pointer">
                <div className="flex items-center h-5 mt-1">
                  <input
                    type="checkbox"
                    checked={isSigned}
                    onChange={(e) => setIsSigned(e.target.checked)}
                    className="h-5 w-5 rounded border-slate-300 text-[#003366] focus:ring-[#003366]"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#003366] mb-1">Termo de responsabilidade</h3>
                  <p className="text-slate-600">
                    Eu, representante de turma, confirmo a autenticidade das informações fornecidas neste formulário e concordo com seu envio para a coordenação do curso.
                    Estou ciente de que informações falsas podem acarretar em medidas disciplinares.
                  </p>
                </div>
              </label>
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
            onClick={handleSubmit}
            className="bg-[#003366] text-white hover:bg-[#002244] transition px-4 py-2 h-auto rounded-md shadow group text-base"
          >
            Enviar formulário
            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </motion.div>
      </main>
    </div>
  )
}