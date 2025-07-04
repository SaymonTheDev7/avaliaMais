"use client"

import { useState } from "react"
import { Bell, MessageSquare, Users, User } from "lucide-react"
import Header from "@/components/header"
import CardItem from "@/components/card-item"

export default function HomePage() {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    return (
        <div className="flex flex-col min-h-screen bg-white relative">
            <Header onNotificationClick={() => setIsNotificationOpen(true)} />

            <main className="p-4 md:p-6 flex-1 ml-2 md:ml-6 lg:ml-10 mr-2 md:mr-6 lg:mr-10 mt-8">
                <div className="flex items-center mb-6">
                    <h1 className="text-2xl sm:text-4xl ml-5 mt-5 font-bold text-[#003366]  border-b-2 border-[#003366] pb-1">
                        Bem-vindo, Peterson!
                    </h1>
                </div>

                <div className="text-center my-14 mt-18">
                    <h2 className="text-4xl sm:text-5xl font-bold text-[#003366] leading-snug">
                        O seu <span className="text-[#FF5722]">esforço</span> determina seu desempenho!
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-16 mt-15 flex-wrap">
                    <CardItem
                        href="/teacher/chat-teacher"
                        icon={<MessageSquare className="h-12 w-12" />}
                        title="Chat"
                        className="lg:mt-8"
                    />
                    <CardItem
                        href="/teacher/turmas-teacher"
                        icon={<Users className="h-12 w-12" />}
                        title="Minhas Turmas"
                        className="lg:h-80"
                    />
                    <CardItem
                        href="/teacher/perfil-teacher"
                        icon={<User className="h-12 w-12" />}
                        title="Perfil"
                        className="lg:mt-8"
                    />
                </div>
            </main>

        </div>
    )
}