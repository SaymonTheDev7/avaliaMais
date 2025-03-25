import React from 'react';
import { Home, Users, FileText, MessageCircle, Settings, Archive, LogOut, Plus } from 'lucide-react'; // Substituí MessageSquare por MessageCircle
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react'; // Ícone para o botão de fechar

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const NavItem = ({ icon, label, onClick }: NavItemProps) => {
  return (
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
  );
};

interface SidebarProps {
  onClose: () => void; // Função para fechar a sidebar
}

export default function SidebarNavigation({ onClose }: SidebarProps) {
  return (
    <>
      {/* Overlay para escurecer o fundo */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose}></div>

      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-72 bg-white border-r border-border z-50">
        {/* Botão de fechar */}
        <div className="flex justify-end p-6">
          <Button variant="ghost" onClick={onClose}>
            <X style={{ width: "32px", height: "32px", color: "#002b5c", strokeWidth: 2 }} />
          </Button>
        </div>

        {/* Conteúdo da Sidebar */}
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
            icon={<MessageCircle style={{ width: "32px", height: "32px", color: "#002b5c", strokeWidth: 2 }} />} // Ícone de chat sem círculo extra
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
      </div>
    </>
  );
}
