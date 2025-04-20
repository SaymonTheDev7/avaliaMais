"use client"
import { X } from "lucide-react"

interface NotificationPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationPopup({ isOpen, onClose }: NotificationPopupProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4">
      <div className="absolute inset-0 bg-black/20" onClick={onClose}></div>
      <div className="relative w-full max-w-md rounded-lg bg-[#003366] text-white shadow-lg overflow-hidden mt-16 mr-4 z-10">
        <div className="flex items-center justify-between p-4 border-b border-blue-800">
          <h2 className="text-2xl font-bold">Notificações</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Notification 1 */}
          <div className="bg-white text-[#003366] rounded-lg p-4">
            <h3 className="text-xl font-bold mb-2">Preencha o pré-concelho!</h3>
            <p className="mb-4">
              Olá representante! A equipe pedagógica solicita que você, juntamente com os colegas de turma realizem o
              pré-concelho até o dia 12/04/2025. Em caso de dúvida, entrar em contato.
            </p>
            <button className="bg-[#003366] text-white px-4 py-2 rounded-md font-medium">Preencher</button>
          </div>

          {/* Notification 2 */}
          <div className="bg-white text-[#003366] rounded-lg p-4">
            <h3 className="text-xl font-bold mb-2">Feedback Disponível!</h3>
            <p className="mb-4">
              Você já pode consultar seu feedback semestral na turma MI-74 PSIN 2023/1. Em caso de dúvida, entrar em
              contato.
            </p>
            <button className="bg-[#003366] text-white px-4 py-2 rounded-md font-medium">Preencher</button>
          </div>
        </div>
      </div>
    </div>
  )
}
