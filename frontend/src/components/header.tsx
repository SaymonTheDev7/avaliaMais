"use client"

import { useState } from "react"
import { Menu, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import Image from "next/image"
import SidebarNavigation from "@/components/sidebar-navigation"

export default function Header({ onNotificationClick }: { onNotificationClick?: () => void }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div>
      <header className="flex items-center justify-between p-4 bg-[#003366] text-white relative z-10">
        {/* Logo movida mais para a esquerda */}
        <div className="flex items-center pl-4">
          <Image src="/Logo.png" alt="Logo Avalia+" width={150} height={50} />
        </div>

        {/* Elementos da direita: notificação, avatar e menu hambúrguer */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/10 p-2 rounded-md"
            onClick={onNotificationClick}
          >
            <Bell style={{ width: "32px", height: "32px", color: "white", strokeWidth: 2 }} />
          </Button>

          <Avatar className="h-10 w-10 border-2 border-white flex items-center justify-center overflow-hidden">
            <AvatarImage src="/juciene.png" alt="Técnica Pedagógica" />
            <AvatarFallback>TP</AvatarFallback>
          </Avatar>

          {/* Menu hambúrguer movido para o final */}
          <Button variant="ghost" size="icon" className="hover:bg-white/10 p-2 rounded-md" onClick={toggleSidebar}>
            <Menu style={{ width: "32px", height: "32px", color: "white", strokeWidth: 2 }} />
          </Button>
        </div>
      </header>

      {isSidebarOpen && <SidebarNavigation onClose={closeSidebar} />}
    </div>
  )
}
