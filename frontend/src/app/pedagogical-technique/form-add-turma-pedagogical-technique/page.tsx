"use client";

import React from 'react';
import Header from '@/components/header';
import { FormCard } from '@/components/add-form';

export default function FormularioPage() {
  const fields = [
    { label: 'Nome Completo', type: 'text', name: 'nomeCompleto' },
    { label: 'Email', type: 'email', name: 'email' },
    { label: 'Telefone', type: 'tel', name: 'telefone' },
    { label: 'Mensagem', type: 'textarea', name: 'mensagem' },
  ];

  const handleSubmit = (data: any) => {
    console.log('Formulário enviado com os dados:', data);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto py-8 px-8">
        <h1 className="text-4xl font-bold text-[#02335E] border-b-2 border-gray-300 pb-3 mb-8">
          Formulário de Contato
        </h1>
        <FormCard title="Preencha os campos abaixo" fields={fields} onSubmit={handleSubmit} />
      </main>
    </div>
  );
}