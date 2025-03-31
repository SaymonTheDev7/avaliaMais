"use client";

import React from 'react';
import Header from '@/components/header';
import ClassForm from '@/components/class-form';
import { ChevronLeft } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-muted">
      <Header />
      <div className="flex flex-col items-start space-y-2 p-4 text-[#02335E] ml-4">
        <button onClick={() => {}} className="text-2xl">
          <ChevronLeft size={32} strokeWidth={2.5} />
        </button>
        <div className="flex items-center">
          <span className="text-3xl font-bold mr-4">TURMA AI PSIN 2023/2</span>
        </div>
        <div className="border-b-4 border-[#02335E] w-full max-w-[400px]"></div>
      </div>
      <main className="flex justify-center items-center p-4">
        <ClassForm />
      </main>
    </div>
  );
}