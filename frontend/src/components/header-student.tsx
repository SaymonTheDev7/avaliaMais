"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, Bell, X, Check, Trash2, AlertTriangle, Calendar, ClipboardCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import Image from "next/image"
import SidebarRepresentative from "@/components/sidebar-representative"
import Link from "next/link"

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const notificationsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setNotifications([])
  }, [])

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev)
  const closeSidebar = () => setIsSidebarOpen(false)
  const toggleNotifications = () => setIsNotificationsOpen(!isNotificationsOpen)

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const typeLabels: Record<Notification["type"], string> = {
    deadline: "Prazo",
    meeting: "Reunião",
    form: "Formulário",
    reminder: "Lembrete",
    system: "Sistema"
  }

  return (
    <div>
      <header className="flex items-center justify-between p-4 bg-[#003366] text-white relative z-10">
        <div className="flex items-center pl-4">
          <Image src="/Logo.png" alt="Logo Avalia+" width={150} height={50} />
        </div>

        <div className="flex items-center gap-4">
          <div className="relative" ref={notificationsRef}>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/10 p-2 rounded-md relative"
              onClick={toggleNotifications}
              onMouseEnter={() => setIsNotificationsOpen(true)}
            >
              <Bell style={{ width: "32px", height: "32px", color: "white", strokeWidth: 2 }} />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-[10px] text-white rounded-full flex items-center justify-center">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </Button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl z-50 border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">Notificações</h3>
                  <Link 
                    href="/student-representative/notifications"
                    style={{ color: "#003366", fontWeight: 500 }}
                    className="text-sm hover:underline"
                    onClick={() => setIsNotificationsOpen(false)}
                  >
                    Ver todas
                  </Link>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      Nenhuma notificação no momento
                    </div>
                  ) : (
                    notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`group p-4 transition border-b last:border-none ${
                          !notification.read ? 'bg-blue-50' : 'bg-white'
                        } hover:bg-gray-50`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1 pr-2">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${
                                notification.type === "deadline"
                                  ? "bg-red-100 text-red-700"
                                  : notification.type === "meeting"
                                  ? "bg-blue-100 text-blue-700"
                                  : notification.type === "form"
                                  ? "bg-green-100 text-green-700"
                                  : notification.type === "reminder"
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-gray-200 text-gray-700"
                              }`}>
                                {typeLabels[notification.type]}
                              </span>
                              <h4 className="font-semibold text-gray-800">{notification.title}</h4>
                            </div>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                          <div className="flex flex-col gap-1 items-end opacity-0 group-hover:opacity-100 transition">
                            {!notification.read && (
                              <button
                                title="Marcar como lida"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  markAsRead(notification.id)
                                }}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                <Check size={18} />
                              </button>
                            )}
                            <button
                              title="Excluir"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteNotification(notification.id)
                              }}
                              className="text-red-400 hover:text-red-600"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Link for Avatar */}
          <Link href="/student/perfil-student">
            <Avatar className="h-10 w-10 border-2 border-white cursor-pointer">
            <AvatarImage src="/andre.png" alt="Gustavo" />
            <AvatarFallback>AR</AvatarFallback>
            </Avatar>
          </Link>

          <Button variant="ghost" size="icon" className="hover:bg-white/10 p-2 rounded-md" onClick={toggleSidebar}>
            <Menu style={{ width: "32px", height: "32px", color: "white", strokeWidth: 2 }} />
          </Button>
        </div>
      </header>

      {isSidebarOpen && <SidebarRepresentative onClose={closeSidebar} />}
    </div>
  )
}

interface Notification {
  id: number
  title: string
  message: string
  time: string
  read: boolean
  type: 'deadline' | 'meeting' | 'form' | 'reminder' | 'system'
  icon?: React.ReactNode
}