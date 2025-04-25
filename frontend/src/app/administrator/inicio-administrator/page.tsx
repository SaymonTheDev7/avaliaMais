"use client";

import React from 'react';
import Link from 'next/link';
import Header from '@/components/header-administrator';
import { Users, Book, Bus, GraduationCap, Home, Apple } from 'lucide-react';

type DashboardCardProps = {
  title: string;
  icon: React.ReactNode;
  color: string;
  href: string;
};

const DashboardCard = ({ title, icon, color, href }: DashboardCardProps) => {
  return (
    <Link href={href}>
      <div className="w-full max-w-md rounded-lg overflow-hidden shadow-md cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:scale-105">
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
    </Link>
  );
};

export default function InicioPedagogicalTechnique() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto py-8 px-12">
        <h1 className="text-4xl font-bold text-[#02335E] border-b-2 border-gray-300 pb-3 mb-10 mt-5">
          <span className="font-bold">INÍCIO</span>
        </h1>

        {/* Centralizando apenas os cards */}
        <div className="flex justify-center items-center min-h-[60vh] mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
            <DashboardCard
              title="Ver professores"
              icon={<Users style={{ width: "32px", height: "32px", color: "white" }} />}
              color="bg-[#29A342]"
              href="/administrator/professores-administrator"
            />
              <DashboardCard
                title="Ver pedagógico"
                icon={<Apple style={{ width: "32px", height: "32px", color: "white" }} />}
                color="bg-[#B22222]"
                href="/administrator/pedagogico-administrator"
              />
            <DashboardCard
              title="Ver alunos"
              icon={<Bus style={{ width: "32px", height: "32px", color: "white" }} />}
              color="bg-[#29ABE2]"
              href="/administrator/alunos-administrator"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
