"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import LoadingScreen from '@/components/loading-screen';
import { Users, Book, Bus, GraduationCap, Home, Apple } from 'lucide-react';

type DashboardCardProps = {
  title: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
};

const DashboardCard = ({ title, icon, color, onClick }: DashboardCardProps) => {
  return (
    <div
      onClick={onClick}
      className="w-full max-w-md rounded-lg overflow-hidden shadow-md cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:scale-105"
    >
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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = (href: string) => {
    setIsLoading(true);
    setTimeout(() => {
      router.push(href);
    }, 1000); // tempo para exibir o loading (ajustável)
  };

  return (
    <div className="min-h-screen bg-white">
      <LoadingScreen isLoading={isLoading} />
      <Header />
      <main className="container mx-auto py-8 px-12">
        <h1 className="text-4xl font-bold text-[#02335E] border-b-2 border-gray-300 pb-3 mb-15 mt-5">
          <span className="font-bold">INÍCIO</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <DashboardCard
            title="Ver professores"
            icon={<Users style={{ width: "32px", height: "32px", color: "white" }} />}
            color="bg-[#29ABE2]"
            onClick={() => handleNavigation("/pedagogical-technique/professores-pedagogical-technique")}
          />
          <DashboardCard
            title="Ver turmas"
            icon={<Book style={{ width: "32px", height: "32px", color: "white" }} />}
            color="bg-[#808080]"
            onClick={() => handleNavigation("/pedagogical-technique/turmas-pedagogical-technique")}
          />
          <DashboardCard
            title="Ver alunos"
            icon={<Bus style={{ width: "32px", height: "32px", color: "white" }} />}
            color="bg-[#29ABE2]"
            onClick={() => handleNavigation("/pedagogical-technique/alunos-pedagogical-technique")}
          />
          <DashboardCard
            title="Ver cursos"
            icon={<GraduationCap style={{ width: "32px", height: "32px", color: "white" }} />}
            color="bg-[#F05050]"
            onClick={() => handleNavigation("/pedagogical-technique/cursos-pedagogical-technique")}
          />
          <DashboardCard
            title="Histórico de conselhos"
            icon={<Home style={{ width: "32px", height: "32px", color: "white" }} />}
            color="bg-[#FF7F50]"
            onClick={() => handleNavigation("/pedagogical-technique/conselhos-pedagogical-technique")}
          />
          <DashboardCard
            title="Pedagógico"
            icon={<Apple style={{ width: "32px", height: "32px", color: "white" }} />}
            color="bg-[#B22222]"
            onClick={() => handleNavigation("/pedagogical-technique/pedagogico")}
          />
        </div>
      </main>
    </div>
  );
}
