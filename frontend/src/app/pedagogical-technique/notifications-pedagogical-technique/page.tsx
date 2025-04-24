"use client"

import React, { useState, useEffect } from 'react'
import { Bell, Check, Trash2, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import LoadingScreen from '@/components/loading-screen'

type Notification = {
  id: number
  title: string
  message: string
  time: string
  read: boolean
  type: 'important' | 'message' | 'system'
}

export default function NotificationsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([])

  // Carregar notificações de exemplo
  useEffect(() => {
    setNotifications([
      {
        id: 1,
        title: "Novo conselho agendado",
        message: "O conselho da turma 3A foi agendado para amanhã às 14h",
        time: "10 minutos atrás",
        read: false,
        type: "important"
      },
      {
        id: 2,
        title: "Mensagem recebida",
        message: "Você tem uma nova mensagem do professor João sobre o conselho de amanhã",
        time: "1 hora atrás",
        read: true,
        type: "message"
      },
      {
        id: 3,
        title: "Atualização do sistema",
        message: "Nova versão 2.1.0 do sistema disponível com correções de bugs",
        time: "2 dias atrás",
        read: true,
        type: "system"
      },
      {
        id: 4,
        title: "Lembrete de reunião",
        message: "Reunião pedagógica agendada para sexta-feira às 10h",
        time: "3 dias atrás",
        read: false,
        type: "important"
      },
      {
        id: 5,
        title: "Novo aluno matriculado",
        message: "Carlos Silva foi matriculado na turma 2B",
        time: "1 semana atrás",
        read: true,
        type: "system"
      }
    ])
  }, [])

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? {...notification, read: true} : notification
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })))
    setSelectedNotifications([])
  }

  const deleteSelected = () => {
    setNotifications(notifications.filter(
      notification => !selectedNotifications.includes(notification.id)
    ))
    setSelectedNotifications([])
  }

  const toggleSelectNotification = (id: number) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    )
  }

  const goBack = () => {
    setIsLoading(true)
    setTimeout(() => {
      router.back()
    }, 500)
  }

  return (
    <div className="min-h-screen bg-white">
      <LoadingScreen isLoading={isLoading} />
      <Header />
      
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <button 
            onClick={goBack}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="text-[#003366]" size={24} />
          </button>
          <h1 className="text-3xl font-bold text-[#003366] flex items-center">
            <Bell className="mr-3" size={28} />
            NOTIFICAÇÕES
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Barra de ações */}
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-sm text-gray-600">
                {selectedNotifications.length > 0 
                  ? `${selectedNotifications.length} selecionadas` 
                  : `${notifications.length} notificações`}
              </span>
            </div>
            
            <div className="flex space-x-2">
              {selectedNotifications.length > 0 ? (
                <>
                  <button
                    onClick={markAllAsRead}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200 flex items-center"
                  >
                    <Check className="mr-1" size={16} />
                    Marcar como lida
                  </button>
                  <button
                    onClick={deleteSelected}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200 flex items-center"
                  >
                    <Trash2 className="mr-1" size={16} />
                    Excluir
                  </button>
                </>
              ) : (
                <button
                  onClick={markAllAsRead}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200 flex items-center"
                >
                  <Check className="mr-1" size={16} />
                  Marcar todas como lidas
                </button>
              )}
            </div>
          </div>

          {/* Lista de notificações */}
          <div className="divide-y divide-gray-100">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Nenhuma notificação encontrada
              </div>
            ) : (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      checked={selectedNotifications.includes(notification.id)}
                      onChange={() => toggleSelectNotification(notification.id)}
                      className="mt-1 mr-3 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className={`font-medium ${!notification.read ? 'text-blue-800' : 'text-gray-800'}`}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-400">{notification.time}</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                      
                      <div className="mt-2 flex space-x-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            <Check className="mr-1" size={12} />
                            Marcar como lida
                          </button>
                        )}
                        <button
                          onClick={() => {
                            toggleSelectNotification(notification.id)
                            if (!notification.read) markAsRead(notification.id)
                          }}
                          className="text-xs text-gray-500 hover:text-gray-700 flex items-center"
                        >
                          {selectedNotifications.includes(notification.id) ? 'Desselecionar' : 'Selecionar'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}