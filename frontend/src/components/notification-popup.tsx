"use client"
import { X } from "lucide-react"

interface Notification {
  id: number
  title: string
  message: string
  actionLabel: string
  actionUrl: string
}

interface NotificationPopupProps {
  isOpen: boolean
  onClose: () => void
  notifications: Notification[]
  onMarkAsRead: (id: number) => void  // Adicionando a função para marcar como lida
  onDelete: (id: number) => void      // Adicionando a função para excluir
}

export function NotificationPopup({ isOpen, onClose, notifications, onMarkAsRead, onDelete }: NotificationPopupProps) {
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
          {notifications.length === 0 ? (
            <div className="text-center text-gray-200">Nenhuma notificação</div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-white text-[#003366] rounded-lg p-4"
              >
                <h3 className="text-xl font-bold mb-2">{notification.title}</h3>
                <p className="mb-4">{notification.message}</p>
                <a
                  href={notification.actionUrl}
                  className="bg-[#003366] text-white px-4 py-2 rounded-md font-medium"
                >
                  {notification.actionLabel}
                </a>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => onMarkAsRead(notification.id)}
                    className="text-sm text-gray-300"
                  >
                    Marcar como lida
                  </button>
                  <button
                    onClick={() => onDelete(notification.id)}
                    className="text-sm text-red-500"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
