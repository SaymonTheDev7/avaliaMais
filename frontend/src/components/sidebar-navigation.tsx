"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Users,
  FileText,
  MessageCircle,
  Settings,
  Archive,
  LogOut,
  Plus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const NavItem = ({ icon, label, onClick }: NavItemProps) => {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Button
        variant="ghost"
        className="w-full justify-start gap-6 text-[var(--foreground)] font-medium px-8 py-6 transition-all 
                   hover:bg-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        onClick={onClick}
      >
        <div className="flex items-center w-full">
          <div className="flex items-center">
            <div className="transition-all">{icon}</div>
          </div>
          <span className="ml-6 text-xl">{label}</span>
        </div>
      </Button>
    </motion.div>
  );
};




interface SidebarProps {
  onClose: () => void;
}

export default function SidebarNavigation({ onClose }: SidebarProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
  };

  return (
    <>
      {/* Fundo escuro ao abrir o menu */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/40 z-40"
        onClick={handleClose}
      ></motion.div>

      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isClosing ? "-100%" : "0" }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 h-full w-72 bg-[var(--background)] border-r border-[var(--border)] z-50 shadow-lg"
        onAnimationComplete={() => {
          if (isClosing) onClose();
        }}
      >
        {/* Botão de fechar */}
        <div className="flex justify-end p-6">
          <Button
            variant="ghost"
            className="hover:bg-[var(--muted-foreground)] p-1 rounded-md"
            onClick={handleClose}
          >
            <X
              style={{
                width: "32px",
                height: "32px",
                color: "var(--foreground)", // Mantém a cor original
                strokeWidth: 2,
              }}
            />
          </Button>
        </div>


        {/* Itens do menu */}
        <div className="flex flex-col flex-1 py-12 space-y-8">
          <NavItem
            icon={<Home style={{ width: "32px", height: "32px", color: "var(--foreground)", strokeWidth: 2 }} />}
            label="Início"
          />
          <NavItem
            icon={<Users style={{ width: "32px", height: "32px", color: "var(--foreground)", strokeWidth: 2 }} />}
            label="Pré-Conselho"
          />
          <NavItem
            icon={
              <div className="relative">
                <FileText style={{ width: "32px", height: "32px", color: "var(--foreground)", strokeWidth: 2 }} />
                <Plus style={{ width: "16px", height: "16px", color: "var(--foreground)", position: "absolute", bottom: "0", right: "0", strokeWidth: 2 }} />
              </div>
            }
            label="Conselho Geral"
          />
          <NavItem
            icon={<MessageCircle style={{ width: "32px", height: "32px", color: "var(--foreground)", strokeWidth: 2 }} />}
            label="Chat"
          />
        </div>

        {/* Rodapé */}
        <div className="mt-auto py-12 space-y-6">
          <NavItem
            icon={<Settings style={{ width: "40px", height: "40px", color: "var(--foreground)", strokeWidth: 2 }} />}
            label="Ajustes"
          />
          <NavItem
            icon={<Archive style={{ width: "40px", height: "40px", color: "var(--foreground)", strokeWidth: 2 }} />}
            label="Arquivados"
          />
          <NavItem
            icon={<LogOut style={{ width: "40px", height: "40px", color: "var(--foreground)", strokeWidth: 2 }} />}
            label="Sair"
          />
        </div>
      </motion.div>
    </>
  );
}
