"use client";

import React, { useState } from 'react';
import Header from '@/components/header';
import { Search, Filter, User, X, ChevronLeft } from 'lucide-react';

// Create placeholder images that represent different class themes
const classImages = [
  'https://tryeasel.dev/placeholder.svg?width=400&height=96&text=&bg=%234285F4&fg=%23FFD700',  // Blue with yellow
  'https://tryeasel.dev/placeholder.svg?width=400&height=96&text=&bg=%23FF5722&fg=%23FFFFFF',  // Orange with white
  'https://tryeasel.dev/placeholder.svg?width=400&height=96&text=&bg=%232196F3&fg=%23FFFFFF',  // Blue with books
  'https://tryeasel.dev/placeholder.svg?width=400&height=96&text=&bg=%23009688&fg=%23FFFFFF',  // Teal with books
  'https://tryeasel.dev/placeholder.svg?width=400&height=96&text=&bg=%233F51B5&fg=%23FFFFFF',  // Blue with pencil
  'https://tryeasel.dev/placeholder.svg?width=400&height=96&text=&bg=%2300BCD4&fg=%23FFFFFF',  // Teal with white
  'https://tryeasel.dev/placeholder.svg?width=400&height=96&text=&bg=%23607D8B&fg=%23FFFFFF',  // Gray with books
];

const classData = [
  { id: 1, name: 'WF-78 PSIN 2024/1', students: 21, time: '13:40-22:00', image: classImages[0] },
  { id: 2, name: 'MQ-75 PSIN 2024/2', students: 21, time: '13:40-22:00', image: classImages[1] },
  { id: 3, name: 'JB-76 PSIN 2023/2', students: 21, time: '13:40-22:00', image: classImages[2] },
  { id: 4, name: 'MI-75 PSIN 2023/2', students: 21, time: '13:40-22:00', image: classImages[3] },
  { id: 5, name: 'FG-75 PSIN 2023/2', students: 21, time: '13:40-22:00', image: classImages[4] },
  { id: 6, name: 'TP-74 PSIN 2023/2', students: 21, time: '13:40-22:00', image: classImages[5] },
  { id: 7, name: 'FA-73 PSIN 2023/2', students: 21, time: '13:40-22:00', image: classImages[6] },
];

export default function VerTurmasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [classList, setClassList] = useState(classData);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRemoveClass = (id: number) => {
    setClassList(classList.filter(item => item.id !== id));
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      
      <div className="p-4 md:p-6 flex-1">
        {/* Back button and title */}
        <div className="flex items-center mb-6">
          <a href="#" className="text-[#003366] mr-4">
            <ChevronLeft size={32} strokeWidth={2.5} />
          </a>
          <h1 className="text-2xl font-bold text-[#003366] uppercase border-b-2 border-[#003366] pb-1">
            VER TURMAS
          </h1>
        </div>
        
        {/* Search Bar */}
        <div className="flex items-center mb-6 gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-[#003366]" />
            </div>
            <input 
              type="text" 
              placeholder="Pesquise algo" 
              className="w-full pl-10 pr-10 py-2 bg-gray-200 rounded-md focus:outline-none"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Filter className="h-5 w-5 text-[#003366] cursor-pointer" />
            </div>
          </div>
          
          {/* View toggle buttons */}
          <div className="flex gap-2">
            <button 
              className={`text-[#003366] ${viewMode === 'list' ? 'opacity-100' : 'opacity-50'}`}
              onClick={() => setViewMode('list')}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 5H21M3 12H21M3 19H21" stroke="#003366" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <button 
              className={`text-[#003366] ${viewMode === 'grid' ? 'opacity-100' : 'opacity-50'}`}
              onClick={() => setViewMode('grid')}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="7" stroke="#003366" strokeWidth="2"/>
                <rect x="14" y="3" width="7" height="7" stroke="#003366" strokeWidth="2"/>
                <rect x="3" y="14" width="7" height="7" stroke="#003366" strokeWidth="2"/>
                <rect x="14" y="14" width="7" height="7" stroke="#003366" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Class Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Add Class Card */}
          <div className="flex flex-col items-center justify-center p-4 rounded-md border-2 border-dashed border-gray-300 bg-white hover:bg-gray-50 cursor-pointer h-[200px]">
            <div className="bg-white rounded-full p-4 mb-2">
              <div className="text-[#003366] text-4xl font-bold">+</div>
            </div>
            <div className="text-[#003366] font-medium">Adicionar turma</div>
          </div>
          
          {classList.map((item) => (
            <div key={item.id} className="relative rounded-md overflow-hidden shadow-md">
              {/* Class image header */}
              <div className="h-24 bg-[#003366] relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Class info */}
              <div className="bg-[#003366] p-4 text-white">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <div className="flex items-center text-sm mt-2">
                  <User className="mr-1 h-4 w-4" />
                  <span>{item.students}</span>
                  <span className="mx-2">-</span>
                  <span>{item.time}</span>
                </div>
                
                {/* Remove button */}
                <button 
                  onClick={() => handleRemoveClass(item.id)} 
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}