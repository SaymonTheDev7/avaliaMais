"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Upload, X, CheckCircle, PenLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header-student-representative"
import SignaturePad from "@/components/signature-pad"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Image from "next/image"

export default function PreConselhoAssinatura() {
  const [file, setFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [signatureImage, setSignatureImage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("draw")
  const [isSigned, setIsSigned] = useState(false)
  const [isAlreadyCompleted, setIsAlreadyCompleted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    // Verificar se o pré-conselho já foi completado
    const activeConselhoId = localStorage.getItem('activeConselhoId')
    if (activeConselhoId) {
      const conselhos = JSON.parse(localStorage.getItem('preConselhos') || '[]')
      const conselhoAtual = conselhos.find((c: any) => c.id === parseInt(activeConselhoId))
      
      if (conselhoAtual?.status === "completed") {
        setIsAlreadyCompleted(true)
        toast.warning("Este pré-conselho já foi respondido e não pode ser editado novamente")
      }
    } else {
      // Se não houver activeConselhoId, redireciona para o histórico
      router.push("/student-representative/historico-conselhos-student-representative")
    }
  }, [router])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isAlreadyCompleted) return
    
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      
      // Verificar tamanho do arquivo (máximo 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("O arquivo deve ter no máximo 5MB")
        return
      }
      
      setFile(selectedFile)

      // Criar preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setFilePreview(event.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleRemoveFile = () => {
    if (isAlreadyCompleted) return
    setFile(null)
    setFilePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleRemoveSignature = () => {
    if (isAlreadyCompleted) return
    setSignatureImage(null)
  }

  const handleSaveSignature = (signatureDataUrl: string) => {
    if (isAlreadyCompleted) return
    setSignatureImage(signatureDataUrl)
  }

  const handlePrevious = () => {
    router.push("/student-representative/pre-conselho-revisar-student-representative")
  }

  const handleSubmit = () => {
    if (isAlreadyCompleted) {
      toast.error("Este pré-conselho já foi respondido")
      return
    }

    if (!isSigned) {
      toast.error("Você deve concordar com o termo de responsabilidade")
      return
    }

    if (!signatureImage && !filePreview) {
      toast.error("Por favor, adicione sua assinatura")
      return
    }

    // Salvar dados completos do formulário no localStorage
    const preConselhoData = JSON.parse(localStorage.getItem('preConselhoData') || '{}')
    const dadosCompletos = {
      ...preConselhoData,
      assinatura: signatureImage || filePreview,
      dataAssinatura: new Date().toISOString()
    }

    localStorage.setItem('preConselhoCompleto', JSON.stringify(dadosCompletos))

    // Atualizar o status do pré-conselho no histórico
    const activeConselhoId = localStorage.getItem('activeConselhoId')
    if (activeConselhoId) {
      const conselhos = JSON.parse(localStorage.getItem('preConselhos') || '[]')
      const updatedConselhos = conselhos.map((c: any) => 
        c.id === parseInt(activeConselhoId) ? { 
          ...c, 
          status: "completed",
          descricao: `Pré-conselho concluído em ${new Date().toLocaleDateString('pt-BR')}`
        } : c
      )
      localStorage.setItem('preConselhos', JSON.stringify(updatedConselhos))
    }

    toast.success("Pré-conselho assinado e enviado com sucesso!")
    router.push("/student-representative/pre-conselho-confirmacao-student-representative")
  }

  const hasValidSignature = (activeTab === "draw" && signatureImage) || (activeTab === "upload" && filePreview)

  if (isAlreadyCompleted) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#003366] mb-4">Pré-conselho já respondido</h1>
            <p className="text-slate-600 mb-6">Este pré-conselho já foi respondido e não pode ser editado novamente.</p>
            <Button 
              onClick={() => router.push("/student-representative/historico-conselhos-student-representative")}
              className="bg-[#003366] text-white"
            >
              Voltar para o histórico
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-[#003366] tracking-tight mb-2">Assinar Pré-Conselho</h1>
          <p className="text-slate-500 text-lg">Revise e assine o documento do MI-74</p>
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
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2 border-2 border-green-300">
                <CheckCircle className="h-5 w-5" />
              </div>
              <span className="text-sm text-green-600 font-medium">Preenchimento</span>
            </div>

            <div className="h-1 w-16 bg-green-300 mx-2"></div>

            <div className="flex flex-col items-center mx-8">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2 border-2 border-green-300">
                <CheckCircle className="h-5 w-5" />
              </div>
              <span className="text-sm text-green-600 font-medium">Revisão</span>
            </div>

            <div className="h-1 w-16 bg-green-300 mx-2"></div>

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

        {/* Signature Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8"
        >
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#003366] mb-2">Assinatura</h2>
              <p className="text-slate-500">Desenhe ou faça upload da sua assinatura</p>
            </div>

            <Tabs defaultValue="draw" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
                <TabsTrigger value="draw" className="data-[state=active]:bg-[#003366] data-[state=active]:text-white">
                  Desenhar assinatura
                </TabsTrigger>
                <TabsTrigger value="upload" className="data-[state=active]:bg-[#003366] data-[state=active]:text-white">
                  Fazer upload
                </TabsTrigger>
              </TabsList>

              <TabsContent value="draw" className="mt-0">
                {signatureImage ? (
                  <div className="relative w-full rounded-lg overflow-hidden group max-w-xl mx-auto">
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2"
                        onClick={handleRemoveSignature}
                      >
                        <X className="h-4 w-4" />
                        Remover assinatura
                      </Button>
                    </div>
                    <Image
                      src={signatureImage}
                      alt="Signature preview"
                      width={600}
                      height={200}
                      className="w-full h-auto object-contain rounded-lg border border-slate-200"
                    />
                  </div>
                ) : (
                  <SignaturePad onSave={handleSaveSignature} />
                )}
              </TabsContent>

              <TabsContent value="upload" className="mt-0">
                <div
                  className={`p-6 rounded-xl border-2 ${filePreview ? "border-green-100 bg-green-50" : "border-dashed border-slate-200 bg-slate-50"} transition-all duration-300`}
                >
                  {filePreview ? (
                    <div className="relative w-full rounded-lg overflow-hidden group max-w-xl mx-auto">
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
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>

        {/* Confirmation Section */}
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
                    Eu, representante de turma, confirmo a autenticidade das informações fornecidas neste formulário e
                    concordo com seu envio para a coordenação do curso. Estou ciente de que informações falsas podem
                    acarretar em medidas disciplinares.
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
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-between"
        >
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="bg-white border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white transition px-6 py-3 h-auto rounded-lg shadow group text-base"
          >
            <ChevronLeft className="h-5 w-5 mr-1 group-hover:-translate-x-0.5 transition-transform" />
            Voltar para revisão
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={!hasValidSignature || !isSigned}
            className="bg-[#003366] text-white hover:bg-[#002244] transition px-6 py-3 h-auto rounded-lg shadow group text-base disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Confirmar e Enviar
          </Button>
        </motion.div>
      </main>
    </div>
  )
}