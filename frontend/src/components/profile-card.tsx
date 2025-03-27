import React from 'react';
import { Pencil } from 'lucide-react';

interface ProfileCardProps {
  name: string;
  turma: string;
  horario: string;
  contato: string;
  imageUrl: string;
}

export default function ProfileCard({ name, turma, horario, contato, imageUrl }: ProfileCardProps) {
  return (
    <div className="flex flex-col md:flex-row items-start gap-8 mb-16 text-2xl">
      <div className="relative">
        <div className="w-[250px] h-[250px] rounded-full overflow-hidden">
          <img 
            src={imageUrl} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-3 right-3 bg-white rounded-full p-3 shadow-md cursor-pointer">
          <Pencil size={24} className="text-[#02335E]" />
        </div>
      </div>
      
      <div className="mt-10 text-[#02335E] space-y-3">
        <div>
          <span className="font-bold text-2xl">Nome</span>
          <span className="text-2xl"> - {name}</span>
        </div>
        <div>
          <span className="font-bold text-2xl">Turma</span>
          <span className="text-2xl"> - {turma}</span>
        </div>
        <div>
          <span className="font-bold text-2xl">Horário</span>
          <span className="text-2xl"> - {horario}</span>
        </div>
        <div>
          <span className="font-bold text-2xl">Contato</span>
          <span className="text-2xl"> - {contato}</span>
        </div>
      </div>
    </div>
  );
}
