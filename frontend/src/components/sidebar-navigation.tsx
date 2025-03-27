"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Home, Users, FileText, MessageCircle, Settings, Archive, LogOut, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

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
        className="w-full justify-start gap-6 text-primary font-medium hover:bg-primary/10 hover:scale-100 transition-all px-8 py-6"
        onClick={onClick}
      >
        <div className="flex items-center">
          {icon}
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
    // Inicia a animação de fechamento
    setIsClosing(true);
  };

  return (
    <>
      {/* Fundo escuro (overlay) */}
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
        initial={{ x: '-100%' }}
        animate={{ x: isClosing ? '-100%' : '0' }} // Se estiver fechando, anima para fora da tela
        exit={{ x: '-100%' }} // Quando sair, move para fora da tela
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 h-full w-72 bg-white border-r border-border z-50 shadow-lg"
        onAnimationComplete={() => {
          if (isClosing) {
            // Após a animação de fechamento, chama o onClose real para remover o componente
            onClose();
          }
        }}
      >
        <div className="flex justify-end p-6">
          <Button variant="ghost" onClick={handleClose}>
            <X style={{ width: "32px", height: "32px", color: "#002b5c", strokeWidth: 2 }} />
          </Button>
        </div>

        <div className="flex flex-col flex-1 py-12 space-y-8">
          <NavItem
            icon={<Home style={{ width: "32px", height: "32px", color: "#002b5c", strokeWidth: 2 }} />}
            label="Início"
          />
          <NavItem
            icon={<Users style={{ width: "32px", height: "32px", color: "#002b5c", strokeWidth: 2 }} />}
            label="Pré-Conselho"
          />
          <NavItem
            icon={(
              <div className="relative">
                <FileText style={{ width: "32px", height: "32px", color: "#002b5c", strokeWidth: 2 }} />
                <Plus style={{ width: "16px", height: "16px", color: "#002b5c", position: "absolute", bottom: "0", right: "0", strokeWidth: 2 }} />
              </div>
            )}
            label="Conselho Geral"
          />
          <NavItem
            icon={<MessageCircle style={{ width: "32px", height: "32px", color: "#002b5c", strokeWidth: 2 }} />}
            label="Chat"
          />
        </div>

        {/* Rodapé */}
        <div className="mt-auto py-12 space-y-6">
          <NavItem
            icon={<Settings style={{ width: "40px", height: "40px", color: "#002b5c", strokeWidth: 2 }} />}
            label="Ajustes"
          />
          <NavItem
            icon={<Archive style={{ width: "40px", height: "40px", color: "#002b5c", strokeWidth: 2 }} />}
            label="Arquivados"
          />
          <NavItem
            icon={<LogOut style={{ width: "40px", height: "40px", color: "#002b5c", strokeWidth: 2 }} />}
            label="Sair"
          />
        </div>
      </motion.div>
    </>
  );
}