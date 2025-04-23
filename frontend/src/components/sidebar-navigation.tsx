"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Home, Users, FileText, MessageCircle, Settings, Archive, LogOut, Plus, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface NavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}

const NavItem = ({ icon, label, active = false, onClick }: NavItemProps) => {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Button
        variant="ghost"
        className={`w-full justify-start gap-4 font-medium px-6 py-5 transition-all rounded-xl
                   hover:bg-white/10 hover:text-white relative ${
                     active ? "bg-white/20 text-white" : "text-sidebar-foreground"
                   }`}
        onClick={onClick}
      >
        <div className="flex items-center w-full">
          <div className="flex items-center justify-center w-12 h-12">
            <div className="transition-all">{icon}</div>
          </div>
          <span className="ml-3 text-lg font-medium">{label}</span>
          {active && (
            <div className="absolute right-4">
              <ChevronRight className="w-6 h-6 text-white" />
            </div>
          )}
        </div>
      </Button>
    </motion.div>
  )
}

interface SidebarProps {
  onClose: () => void
}

export default function SidebarNavigation({ onClose }: SidebarProps) {
  const [isClosing, setIsClosing] = useState(false)
  const [activeItem, setActiveItem] = useState("Início")

  const handleClose = () => {
    setIsClosing(true)
  }

  const handleItemClick = (label: string) => {
    setActiveItem(label)
  }

  return (
    <>
      {/* Fundo escuro ao abrir o menu */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={handleClose}
      ></motion.div>

      {/* Sidebar */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isClosing ? "100%" : "0" }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 right-0 h-full w-80 bg-sidebar z-50 shadow-xl flex flex-col"
        style={{ borderLeft: "1px solid var(--sidebar-border)" }}
        onAnimationComplete={() => {
          if (isClosing) onClose()
        }}
      >
        {/* Cabeçalho com logo */}
        <div
          className="flex items-center justify-between p-6"
          style={{ borderBottom: "1px solid var(--sidebar-border)" }}
        >
          <div className="flex flex-col items-center">
            <div className="relative h-12 w-32 mb-1">
              <Image src="/avalia-logo.png" alt="Avalia+" fill className="object-contain" />
            </div>
            <p className="text-xs text-sidebar-foreground/70">Painel de Controle</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/10 rounded-full text-sidebar-foreground"
            onClick={handleClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Perfil do usuário */}
        <div className="p-4 mx-4 my-6 bg-white/10 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
              <Image src="/juciene.png" alt="Técnica Pedagógica" width={48} height={48} className="object-cover" />
            </div>
            <div>
              <h3 className="font-medium text-sm text-sidebar-foreground">Técnica Pedagógica</h3>
              <p className="text-xs text-sidebar-foreground/70">tecnica@escola.edu</p>
            </div>
          </div>
        </div>

        {/* Itens do menu */}
        <div className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          <div className="mb-2 px-4 text-sm font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
            Principal
          </div>
          <NavItem
            icon={<Home className="w-7 h-7" />}
            label="Início"
            active={activeItem === "Início"}
            onClick={() => handleItemClick("Início")}
          />
          <NavItem
            icon={<Users className="w-7 h-7" />}
            label="Pré-Conselho"
            active={activeItem === "Pré-Conselho"}
            onClick={() => handleItemClick("Pré-Conselho")}
          />
          <NavItem
            icon={
              <div className="relative">
                <FileText className="w-7 h-7" />
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full w-4 h-4 flex items-center justify-center">
                  <Plus className="w-3 h-3 text-sidebar" />
                </div>
              </div>
            }
            label="Conselho Geral"
            active={activeItem === "Conselho Geral"}
            onClick={() => handleItemClick("Conselho Geral")}
          />
          <NavItem
            icon={<MessageCircle className="w-7 h-7" />}
            label="Chat"
            active={activeItem === "Chat"}
            onClick={() => handleItemClick("Chat")}
          />

          <div className="mt-6 mb-2 px-4 text-sm font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
            Configurações
          </div>
          <NavItem
            icon={<Settings className="w-7 h-7" />}
            label="Ajustes"
            active={activeItem === "Ajustes"}
            onClick={() => handleItemClick("Ajustes")}
          />
        </div>

        {/* Rodapé */}
        <div className="mt-auto p-4" style={{ borderTop: "1px solid var(--sidebar-border)" }}>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-white hover:text-white hover:bg-white/10 rounded-xl py-5"
            onClick={handleClose}
          >
            <LogOut className="w-7 h-7" />
            <span className="font-medium text-lg">Sair</span>
          </Button>
        </div>
      </motion.div>
    </>
  )
}
