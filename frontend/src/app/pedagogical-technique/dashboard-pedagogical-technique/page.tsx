import React from 'react';
import Header from '@/components/header';
import { ChevronLeft } from "lucide-react";
import { Dashboard } from '@/components/dashboard';

const professorData = [
  { name: 'Visualizaram o feedback', value: 66 },
  { name: 'Não visualizaram o feedback', value: 34 },
];

const alunosData = [
  { name: 'Visualizaram o feedback', value: 54 },
  { name: 'Não visualizaram o feedback', value: 46 },
];

const pedagogicaData = [
    { name: 'Visualizaram o feedback', value: 70 },
    { name: 'Não visualizaram o feedback', value: 30 },
  ];

const conselhosData = [
  { name: 'Concelho 13/12/2024' },
  { name: 'Concelho 13/11/2024' },
  { name: 'Concelho 13/10/2024' },
  { name: 'Concelho 13/09/2024' },
  { name: 'Concelho 13/08/2024' },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <div className="p-4 pt-6 pl-0 flex-1 mr-2 md:mr-6 lg:mr-10">
            <div className="flex items-center mb-0">
              <a href="#" className="text-[#02335E] mr-4 mb-0 p-0">
                <ChevronLeft className="chevron" size={28} strokeWidth={2.5} />
              </a>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#02335E] uppercase border-b-2 border-[#02335E] pb-1">
                DASHBOARD
              </h1>
            </div>
          </div>
        </div>
        <Dashboard professorData={professorData} alunosData={alunosData} pedagogicaData={pedagogicaData} conselhosData={conselhosData} />
      </div>
    </div>
  );
}