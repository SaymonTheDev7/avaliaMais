import React from 'react';
import { GraduationCap } from 'lucide-react';

interface HomeCardProps {
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export default function HomeCard({ title, icon, onClick }: HomeCardProps) {
  return (
    <div 
      className="rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={onClick}
    >
      <div className="bg-[#C73732] h-12"></div>
      <div className="bg-[#003366] text-white p-6 flex flex-col items-center justify-center relative" style={{ height: '200px' }}>
        <div className="absolute top-6 right-6 bg-white rounded-full p-">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-center">{title}</h3>
      </div>
    </div>
  );
}