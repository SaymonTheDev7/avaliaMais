"use client";

import React, { useState } from 'react';
import Header from '@/components/header';
import SidebarNavigation from '@/components/sidebar-navigation';
import { Search, Filter, User, X } from 'lucide-react';

const classData = [
  { id: 1, name: 'WF-78 PSIN 2024/1', students: 21, time: '13:40-22:00', image: 'https://tryeasel.dev/placeholder.svg?width=200&height=100' },
  { id: 2, name: 'MQ-75 PSIN 2024/2', students: 21, time: '13:40-22:00', image: 'https://tryeasel.dev/placeholder.svg?width=200&height=100' },
  { id: 3, name: 'JB-76 PSIN 2023/2', students: 21, time: '13:40-22:00', image: 'https://tryeasel.dev/placeholder.svg?width=200&height=100' },
  { id: 4, name: 'MI-75 PSIN 2023/2', students: 21, time: '13:40-22:00', image: 'https://tryeasel.dev/placeholder.svg?width=200&height=100' },
  { id: 5, name: 'FG-75 PSIN 2023/2', students: 21, time: '13:40-22:00', image: 'https://tryeasel.dev/placeholder.svg?width=200&height=100' },
  { id: 6, name: 'TP-74 PSIN 2023/2', students: 21, time: '13:40-22:00', image: 'https://tryeasel.dev/placeholder.svg?width=200&height=100' },
  { id: 7, name: 'FA-73 PSIN 2023/2', students: 21, time: '13:40-22:00', image: 'https://tryeasel.dev/placeholder.svg?width=200&height=100' },
];

export default function VerTurmasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [classList, setClassList] = useState(classData);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRemoveClass = (id: number) => {
    setClassList(classList.filter(item => item.id !== id));
  };

  return (
    <div className="flex h-screen bg-background">
      
      <div className="flex-1 overflow-x-hidden">
        <Header />
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-foreground">VER TURMAS</h1>
          </div>

          {/* Search Bar */}
          <div className="relative flex items-center mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Pesquise algo"
              className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Filter className="h-5 w-5 text-muted-foreground cursor-pointer" />
            </div>
          </div>

          {/* Class Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Add Class Card */}
            <div className="flex flex-col items-center justify-center p-4 rounded-md border-2 border-dashed border-muted-foreground bg-card hover:bg-secondary cursor-pointer">
              <div className="text-4xl text-muted-foreground">+</div>
              <div className="text-muted-foreground">Adicionar turma</div>
            </div>

            {classList.map((item) => (
              <div key={item.id} className="relative rounded-md shadow-md overflow-hidden bg-card">
                <img src={item.image} alt={item.name} className="w-full h-24 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-2">
                    <User className="mr-1 h-4 w-4" />
                    {item.students}
                  </div>
                  <div className="text-sm text-muted-foreground">{item.time}</div>
                </div>
                <button
                  onClick={() => handleRemoveClass(item.id)}
                  className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/80"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}