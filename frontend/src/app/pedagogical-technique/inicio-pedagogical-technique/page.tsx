"use client";


import React from 'react';
import Header from '@/components/header';
import { Users, Book, Bus, GraduationCap, Home, Apple } from 'lucide-react';

const DashboardCard = ({ title, icon, color }: { title: string; icon: React.ReactNode; color: string }) => {
  return (
    <div className="w-full max-w-md rounded-lg overflow-hidden shadow-md"> {/* Increased max-w */}
      <div className={`h-16 ${color}`} /> {/* Increased h */}
      <div className="px-8 py-8 bg-[#003366] text-white flex flex-col items-center justify-center"> {/* Increased px and py */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-3"> {/* Reduced mb */}
            {icon}
          </div>
          <div className="font-bold text-2xl mb-4">{title}</div> {/* Increased text size and mb */}
        </div>
      </div>
    </div>
  );
};

export default function InicioPedagogicalTechnique() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Increased padding on the sides */}
      <main className="container mx-auto py-8 px-12"> {/* Increased py and px */}
        <h1 className="text-4xl font-bold text-[#02335E] border-b-2 border-gray-300 pb-3 mb-15 mt-5">
          <span className="font-bold">INÍCIO</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> {/* Reduced gap */}
          <DashboardCard
            title="Ver professores"
            icon={<Users style={{ width: "32px", height: "32px", color: "white" }} />}
            color="bg-[#29ABE2]"
          />
          <DashboardCard
            title="Ver turmas"
            icon={<Book style={{ width: "32px", height: "32px", color: "white" }} />}
            color="bg-[#808080]"
          />
          <DashboardCard
            title="Ver alunos"
            icon={<Bus style={{ width: "32px", height: "32px", color: "white" }} />}
            color="bg-[#29ABE2]"
          />
          <DashboardCard
            title="Conselho Geral"
            icon={<GraduationCap style={{ width: "32px", height: "32px", color: "white" }} />}
            color="bg-[#F05050]"
          />
          <DashboardCard
            title="Histórico de conselhos"
            icon={<Home style={{ width: "32px", height: "32px", color: "white" }} />}
            color="bg-[#FF7F50]"
          />
          <DashboardCard
            title="Pedagógico"
            icon={<Apple style={{ width: "32px", height: "32px", color: "white" }} />}
            color="bg-[#B22222]"
          />
        </div>
      </main>
    </div>
  );
}