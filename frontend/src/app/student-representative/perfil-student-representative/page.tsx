"use client";

import React from 'react';
import Header from '@/components/header-student-representative';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { MessageSquareHeart, Mail, Users, Clock, Star } from 'lucide-react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      {/* Cabeçalho com botão de voltar e título */}
      <div className="container mx-auto px-4 pt-8 max-w-4xl">
        <div className="flex items-center mb-6 px-4">
          <Link 
            href="/student-representative/inicio-student-representative" 
            className="text-[#003366] mr-4"
          >
            <ChevronLeft className="chevron" size={28} strokeWidth={2.5} />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#003366] uppercase border-b-2 border-[#003366] pb-1">
            PERFIL
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Profile Card */}
        <div className="relative mt-8">
          <div className="absolute -top-12 left-6 w-28 h-28 rounded-full border-4 border-white shadow-xl overflow-hidden z-10">
            <Image
              src="/gustavo.png"
              alt="Gustavo Stinghen"
              width={112}
              height={112}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          
          <Card className="pt-16 pb-8 px-6 rounded-3xl bg-white border border-gray-100 shadow-sm">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Gustavo Stinghen</h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium w-fit">
                   Representante de Turma
                  </span>
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span>gustavo@email.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span>2º Turno</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span>Turma MI74</span>
                  </div>
                </div>
              </div>
              
              <Link 
                href="/student-representative/chat-student-representative"
                className="h-12 px-6 flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl font-medium shadow-md hover:shadow-lg transition-all hover:from-blue-700 hover:to-blue-600"
                style={{ color: 'white' }}
              >
                Enviar Mensagem
              </Link>
            </div>
          </Card>
        </div>
        
        {/* Feedback Section */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-pink-100 rounded-lg">
              <MessageSquareHeart className="w-6 h-6 text-pink-600" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Feedbacks sobre a atuação
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Card className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    M
                  </div>
                </div>
                <div>
                  <p className="text-gray-700">
                    "O Gustavo sempre apoia nossas aulas de Front-End com orientações precisas e estratégias práticas para melhorar o engajamento dos alunos."
                  </p>
                  <p className="mt-3 text-sm text-gray-500 font-medium">
                    Prof. de Web
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                    J
                  </div>
                </div>
                <div>
                  <p className="text-gray-700">
                    "A atuação do Gustavo tem sido essencial nas disciplinas de Java. Ele consegue alinhar bem teoria e prática com o suporte pedagógico necessário."
                  </p>
                  <p className="mt-3 text-sm text-gray-500 font-medium">
                    Prof. de Java
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold">
                    D
                  </div>
                </div>
                <div>
                  <p className="text-gray-700">
                    "Com Gustavo, conseguimos estruturar melhor os projetos de banco de dados, promovendo maior integração entre teoria e prática."
                  </p>
                  <p className="mt-3 text-sm text-gray-500 font-medium">
                    Prof. de Banco de Dados
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                    R
                  </div>
                </div>
                <div>
                  <p className="text-gray-700">
                    "Gustavo sempre colabora ativamente nas discussões sobre redes, trazendo soluções viáveis para desafios enfrentados em sala."
                  </p>
                  <p className="mt-3 text-sm text-gray-500 font-medium">
                    Prof. de Redes
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
