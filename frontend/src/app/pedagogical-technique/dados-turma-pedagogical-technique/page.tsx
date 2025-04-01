"use client";

import React from 'react';
import Header from '@/components/header';
import ClassForm from '@/components/class-form';
import { ChevronLeft } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-muted">
      <Header />
      <div className="flex items-center mb-6 px-4 mt-14 ml-15">
          <a href="#" className="text-[#003366] mr-4">
            <ChevronLeft size={28} strokeWidth={2.5} />
          </a>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#003366] uppercase border-b-2 border-[#003366] pb-1">
          TURMA AI PSIN 2023/2
          </h1>
        </div>
      <main className="flex justify-center items-center p-4">
        <ClassForm />
      </main>
    </div>
  );
}