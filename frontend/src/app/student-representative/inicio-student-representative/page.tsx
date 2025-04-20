"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter, Bell, MessageSquare, Users, User } from "lucide-react"
import Link from "next/link"
import { NotificationPopup } from "@/components/notification-popup"
import Header from "@/components/header"
import { SearchBar } from "@/components/search-bar"

export default function HomePage() {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />

            {/* Main Content */}
            <main className="p-4 md:p-6 flex-1 ml-2 md:ml-6 lg:ml-10 mr-2 md:mr-6 lg:mr-10 mt-8">
                <div className="flex items-center mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#003366] border-b-2 border-[#003366] pb-1">
                        Bem-vindo, André!
                    </h1>
                </div>

                <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

                {/* Motivational Message */}
                <div className="text-center mb-14 mt-14">
                    <h2 className="text-5xl font-bold text-[#003366]">
                        O seu <span className="text-[#FF5722]">esforço</span> determina seu desempenho!
                    </h2>
                </div>

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
                    <Link href="#" className="block">
                        <div className="bg-[#003366] text-white rounded-lg p-8 flex flex-col items-center justify-center text-center h-50 mt-20">
                            <MessageSquare className="h-12 w-12 mb-2" />
                            <span className="text-xl font-medium">Chat</span>
                        </div>
                    </Link>

                    <Link href="#" className="block">
                        <div className="bg-[#003366] text-white rounded-lg p-8 flex flex-col items-center justify-center text-center h-70">
                            <Users className="h-12 w-12 mb-2" />
                            <span className="text-xl font-medium">Minhas Turmas</span>
                        </div>
                    </Link>

                    <Link href="#" className="block">
                        <div className="bg-[#003366] text-white rounded-lg p-8 flex flex-col items-center justify-center text-center h-50 mt-20">
                            <User className="h-12 w-12 mb-2" />
                            <span className="text-xl font-medium">Perfil</span>
                        </div>
                    </Link>
                </div>
            </main>

            {/* Notification Popup */}
            <NotificationPopup isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
        </div>
    )
}
