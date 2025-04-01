"use client";

import React, { useState } from 'react';
import Header from '@/components/header';
import { Search, Filter, User, X, ChevronLeft } from 'lucide-react';

const classImages = [
  'https://tryeasel.dev/placeholder.svg?width=400&height=96&text=&bg=%234285F4&fg=%23FFD700',
  'https://tryeasel.dev/placeholder.svg?width=400&height=96&text=&bg=%23FF5722&fg=%23FFFFFF',
  'https://tryeasel.dev/placeholder.svg?width=400&height=96&text=&bg=%232196F3&fg=%23FFFFFF',
  'https://tryeasel.dev/placeholder.svg?width=400&height=96&text=&bg=%23009688&fg=%23FFFFFF',
  'https://tryeasel.dev/placeholder.svg?width=400&height=96&text=&bg=%233F51B5&fg=%23FFFFFF',
  'https://tryeasel.dev/placeholder.svg?width=400&height=96&text=&bg=%2300BCD4&fg=%23FFFFFF',
  'https://tryeasel.dev/placeholder.svg?width=400&height=96&text=&bg=%23607D8B&fg=%23FFFFFF',
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
  const [viewMode, setViewMode] = useState('grid');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRemoveClass = (id: number) => {
    setClassList(classList.filter(item => item.id !== id));
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />

      <div className="p-4 md:p-6 flex-1 ml-2 md:ml-6 lg:ml-10 mr-2 md:mr-6 lg:mr-10 mt-8">
        {/* Back button and title */}
        <div className="flex items-center mb-6 px-4">
          <a href="#" className="text-[#003366] mr-4">
            <ChevronLeft size={28} strokeWidth={2.5} />
          </a>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#003366] uppercase border-b-2 border-[#003366] pb-1">
            VER TURMAS
          </h1>
        </div>

        {/* Search Bar & Toggle Buttons */}
        <div className="flex items-center mb-6 gap-4 px-4 justify-between">
          <div className="relative w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 sm:h-5 w-4 sm:w-5 text-[#003366]" />
            </div>
            <input
              type="text"
              placeholder="Pesquise algo"
              className="w-full pl-10 pr-10 py-3 bg-gray-200 rounded-md focus:outline-none text-sm sm:text-base"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Filter className="h-4 sm:h-5 w-4 sm:w-5 text-[#003366] cursor-pointer" />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              className={`text-[#003366] p-2 ${viewMode === 'list' ? 'opacity-100' : 'opacity-50'}`}
              onClick={() => setViewMode('list')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 5H21M3 12H21M3 19H21" stroke="#003366" strokeWidth={2} strokeLinecap="round" />
              </svg>
            </button>
            <button
              className={`text-[#003366] p-2 ${viewMode === 'grid' ? 'opacity-100' : 'opacity-50'}`}
              onClick={() => setViewMode('grid')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="7" stroke="#003366" strokeWidth={2} />
                <rect x="14" y="3" width="7" height="7" stroke="#003366" strokeWidth={2} />
                <rect x="3" y="14" width="7" height="7" stroke="#003366" strokeWidth={2} />
                <rect x="14" y="14" width="7" height="7" stroke="#003366" strokeWidth={2} />
              </svg>
            </button>
          </div>
        </div>

        {/* Class Cards */}
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'} gap-10 px-4 mt-8`}>
          {/* Add Class Card */}
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#003366] text-white cursor-pointer h-[180px]">
            <div className="rounded-full p-4 mb-2">
              <div className="text-4xl sm:text-5xl font-bold">+</div>
            </div>
            <div className="font-medium text-xl sm:text-2xl text-center">Adicionar turma</div>
          </div>

          {classList.map((item) => (
            <div key={item.id} className="relative rounded-xl overflow-hidden shadow-md bg-[#003366] text-white h-[180px]">
              {/* Class image header */}
              <div className="h-15 relative overflow-hidden bg-gray-400">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Class info */}
              <div className="p-4 mt-2">
                <h3 className="text-xl sm:text-2xl font-bold truncate">{item.name}</h3>
                <div className="flex items-center text-base mt-3">
                  <User className="mr-1 h-4 sm:h-5 w-4 sm:w-5" />
                  <span>{item.students}</span>
                  <span className="mx-2">-</span>
                  <span>{item.time}</span>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => handleRemoveClass(item.id)}
                  className="absolute bottom-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 mb-1 mr-1"
                >
                  <X className="h-4 sm:h-5 w-4 sm:w-5 cursor-pointer" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
