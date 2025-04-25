"use client"

import React, { useState } from 'react';
import { Search, Paperclip, Send, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import Header from '@/components/header-student';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function ChatInterface() {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'contact', text: 'Olá, venha falar comigo hoje.', time: 'Hoje, 9:32', read: true },
        { id: 2, sender: 'user', text: 'Bom dia Juci, não vou conseguir ir hoje pois peguei atestado e amanhã tenho duas provas de spring e arquitetura de software, obrigado.', time: 'Hoje, 9:32', read: true },
        { id: 3, sender: 'contact', text: 'Ok, venha quando conseguir pois andei vendo que suas notas abaixaram.', time: 'Hoje, 9:32', read: true },
        { id: 4, sender: 'user', text: 'Beleza, quando eu puder passo aí pra nós podermos conversar', time: 'Hoje, 9:32', read: true },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const contacts = [
        { id: 1, name: 'JUCIENE MARIA DE OLIVEIRA MOTA', active: true },
        { id: 2, name: 'VALESKA DA LUZ', active: false },
    ];

    return (
        <div className="flex flex-col h-screen bg-[var(--color-background)]">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-72 border-r border-[var(--color-border)] bg-[var(--color-card)] overflow-y-auto">
                    <div className="p-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-[var(--color-muted-foreground)]" />
                            <Input
                                placeholder="Search"
                                className="pl-9 bg-[var(--color-muted)]"
                            />
                        </div>
                    </div>
                    <div className="divide-y divide-[var(--color-border)]">
                        {contacts.map(contact => (
                            <div
                                key={contact.id}
                                className={`flex items-center p-3 hover:bg-[var(--color-muted)] cursor-pointer ${contact.active ? 'bg-[var(--color-muted)]' : ''}`}
                            >
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={`https://tryeasel.dev/placeholder.svg?width=40&height=40`} alt={contact.name} />
                                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="ml-3 font-medium text-sm">{contact.name}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-[var(--color-border)] flex items-center">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="https://tryeasel.dev/placeholder.svg?width=40&height=40" alt="André Felipe Witt" />
                            <AvatarFallback>AF</AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                            <div className="font-bold">JUCIENE MARIA DE OLIVEIRA MOTA</div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {messages.map(message => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`p-3 rounded-lg ${message.sender === 'user'
                                    ? 'bg-[#002855] text-white rounded-tr-none'
                                    : 'bg-[var(--color-muted)] rounded-tl-none'
                                    }`}
                                    style={{
                                        maxWidth: '70%',
                                        wordBreak: 'break-word'
                                    }}
                                >
                                    <div>{message.text}</div>

                                    <div className={`flex items-center mt-1 text-xs ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <span
                                            className={`font-medium ${message.sender === 'user' ? 'text-white' : 'text-[#002855]'}`}
                                        >
                                            {message.time}
                                        </span>
                                        {message.sender === 'user' && message.read && (
                                            <Check className="h-4 w-4 ml-1 text-white" />
                                        )}
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-[var(--color-border)] flex items-center">
                        <Button variant="ghost" size="icon">
                            <Paperclip className="h-5 w-5" />
                        </Button>
                        <Input
                            placeholder="Type a message..."
                            className="mx-2"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <Button
                            size="icon"
                            className="bg-[#002855] hover:bg-[#003b7a]"
                        >
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
