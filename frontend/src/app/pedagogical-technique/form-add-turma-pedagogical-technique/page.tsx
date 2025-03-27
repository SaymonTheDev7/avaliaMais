"use client";

import React, { useState } from 'react';
import Header from '@/components/header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Edit, Info, ExternalLink } from 'lucide-react';

export default function TurmaPage() {
  const [formData, setFormData] = useState({
    curso: 'JGS - AI PSIN 2023/2 INT1',
    cargaHoraria: '2800 horas',
    nomeTurma: 'M174',
    turno: 'Vespertino',
    horario: '13:40 à 22:00',
    quantidadeAlunos: '0'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulário enviado com os dados:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto py-8 px-4 md:px-8">
        <div className="flex items-center mb-6">
          <a href="#" className="text-[#003366] mr-4">
            <ChevronLeft size={40} />
          </a>
          <h1 className="text-3xl md:text-4xl font-bold text-[#003366]">
            TURMA AI PSIN 2023/2
          </h1>
        </div>

        <div className="bg-[#003366] rounded-lg p-6 md:p-10 text-white">
          <div className="flex justify-end mb-4">
            <Button variant="ghost" className="text-white mr-2" size="icon">
              <Edit size={24} />
            </Button>
            <Button variant="ghost" className="text-white" size="icon">
              <Info size={24} />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <Label htmlFor="curso" className="text-white text-lg mb-2 block">
                Curso
              </Label>
              <Input
                id="curso"
                name="curso"
                value={formData.curso}
                onChange={handleInputChange}
                className="bg-white text-black rounded-md"
              />
            </div>

            <div>
              <Label htmlFor="cargaHoraria" className="text-white text-lg mb-2 block">
                Carga horária
              </Label>
              <Input
                id="cargaHoraria"
                name="cargaHoraria"
                value={formData.cargaHoraria}
                onChange={handleInputChange}
                className="bg-white text-black rounded-md"
              />
            </div>

            <div>
              <Label htmlFor="nomeTurma" className="text-white text-lg mb-2 block">
                Nome da turma
              </Label>
              <Input
                id="nomeTurma"
                name="nomeTurma"
                value={formData.nomeTurma}
                onChange={handleInputChange}
                className="bg-white text-black rounded-md"
              />
            </div>

            <div>
              <Label htmlFor="alunos" className="text-white text-lg mb-2 flex items-center">
                Alunos
                <Button variant="ghost" className="text-white ml-2 p-0" size="sm">
                  <ExternalLink size={20} />
                </Button>
              </Label>
              <div className="bg-gray-100 text-gray-700 p-4 rounded-md h-[60px] flex items-center justify-center">
                Os alunos aparecerão aqui :)
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="turno" className="text-white text-lg mb-2 block">
                  Turno/Horário
                </Label>
                <div className="relative">
                  <Input
                    id="turno"
                    name="turno"
                    value={formData.turno}
                    onChange={handleInputChange}
                    className="bg-white text-black rounded-md pr-10"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronLeft className="rotate-270 transform -rotate-90" size={16} />
                  </div>
                </div>
              </div>
              <div className="flex-1 mt-0 md:mt-8">
                <Input
                  id="horario"
                  name="horario"
                  value={formData.horario}
                  onChange={handleInputChange}
                  className="bg-white text-black rounded-md"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="quantidadeAlunos" className="text-white text-lg mb-2 block">
                Quantidade de alunos
              </Label>
              <Input
                id="quantidadeAlunos"
                name="quantidadeAlunos"
                value={formData.quantidadeAlunos}
                onChange={handleInputChange}
                className="bg-white text-black rounded-md w-20"
              />
            </div>

            <div className="md:col-span-2 flex justify-end gap-4 mt-6">
              <Button 
                type="button" 
                className="bg-[#FF5722] hover:bg-[#E64A19] text-white px-8 py-2 rounded-md"
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="bg-[#4CAF50] hover:bg-[#388E3C] text-white px-8 py-2 rounded-md"
              >
                Confirmar
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}