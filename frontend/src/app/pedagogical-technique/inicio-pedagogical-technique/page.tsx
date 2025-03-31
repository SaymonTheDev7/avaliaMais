"use client";

import React from 'react';
import Header from '@/components/header';
import { Users, Book, Bus, GraduationCap, Home, Apple } from 'lucide-react';
import Link from 'next/link'; // Importa o Link do Next.js

const DashboardCard = ({ title, icon, color, link }: { title: string; icon: React.ReactNode; color: string; link?: string }) => {
  return (
    <div className="w-full max-w-md rounded-lg overflow-hidden shadow-md">
      <div className={`h-16 ${color}`} />
      <div className="px-8 py-8 bg-[#003366] text-white flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center mb-3">
            {icon}
          </div>
          <div className="font-bold text-2xl mb-4">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default function InicioPedagogicalTechnique() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
<<<<<<< Updated upstream
      {/* Increased padding on the sides */}
      <main className="container mx-auto py-8 px-12"> {/* Increased py and px */}
=======
      <main className="container mx-auto py-8 px-12">
>>>>>>> Stashed changes
        <h1 className="text-4xl font-bold text-[#02335E] border-b-2 border-gray-300 pb-3 mb-15 mt-5">
          <span className="font-bold">INÍCIO</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <DashboardCard
            title="Ver professores"
            icon={<Users style={{ width: "32px", height: "32px", color: "white" }} />}
            color="bg-[#29ABE2]"
          />
          {/* Envolvendo o card com Link */}
          <Link href="/pedagogical-technique/turmas-pedagogical-technique">
            <DashboardCard
              title="Ver turmas"
              icon={<Book style={{ width: "32px", height: "32px", color: "white" }} />}
              color="bg-[#808080]"
            />
          </Link>
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
