import React, { useState } from 'react';
import { Menu, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import SidebarNavigation from "@/components/sidebar-navigation"; // Importa seu componente de sidebar

export default function Header() {
    // Estado para controlar se a sidebar está aberta ou fechada
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Função para alternar o estado da sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen((prevState) => !prevState);
    };

    // Função para fechar a sidebar
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div>
            {/* Container principal */}
            <header className="flex items-center justify-between p-4 bg-[#003366] text-white relative z-10">
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white"
                        onClick={toggleSidebar} // Chama a função para alternar a sidebar
                    >
                        <Menu style={{ width: "32px", height: "32px" }} />
                    </Button>
                    <div className="flex items-center">
                        <Image
                            className="ml-10"
                            src="/Logo.png"
                            alt="Logo Avalia+"
                            width={150}
                            height={50}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="text-white">
                        <Bell style={{ width: "32px", height: "32px" }} />
                    </Button>
                    <Avatar className="h-10 w-10 border-2 border-white">
                        <AvatarImage
                            src="https://tryeasel.dev/placeholder.svg?width=40&height=40"
                            alt="User profile"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </div>
            </header>

            {/* Sidebar (aparece quando isSidebarOpen é verdadeiro) */}
            <div
                className={`fixed top-0 left-0 h-full bg-white z-50 transition-all duration-500 ease-in-out transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {isSidebarOpen && <SidebarNavigation onClose={closeSidebar} />}
            </div>
        </div>
    );
}
