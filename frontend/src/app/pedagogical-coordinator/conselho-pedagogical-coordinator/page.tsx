"use client";

import React, { useState } from 'react';
import { StudentFormLayout } from '@/components/conselho-cards';
import Header from '@/components/header';

const initialStudents = [
  {
    name: 'Fernanda Agnes Amorim',
    image: 'https://tryeasel.dev/placeholder.svg?width=40&height=40',
  },
  {
    name: 'Gabriel Leite Medeiros',
    image: 'https://tryeasel.dev/placeholder.svg?width=40&height=40',
  },
  {
    name: 'Saymon Oliveira de Castro',
    image: 'https://tryeasel.dev/placeholder.svg?width=40&height=40',
  },
  {
    name: 'Giulia Fugel',
    image: 'https://tryeasel.dev/placeholder.svg?width=40&height=40',
  },
  {
    name: 'Emily Hefter de Souza',
    image: 'https://tryeasel.dev/placeholder.svg?width=40&height=40',
  },
  {
    name: 'Kauan Eggert',
    image: 'https://tryeasel.dev/placeholder.svg?width=40&height=40',
  },
  {
    name: 'Joana Voigt',
    image: 'https://tryeasel.dev/placeholder.svg?width=40&height=40',
  },
  {
    name: 'Gustavo Sthingen',
    image: 'https://tryeasel.dev/placeholder.svg?width=40&height=40',
  },
  
];

const initialTeachers = [
  {
    name: 'Romario',
    image: 'https://tryeasel.dev/placeholder.svg?width=40&height=40',
  },
  {
    name: 'Kristian',
    image: 'https://tryeasel.dev/placeholder.svg?width=40&height=40',
  },
  {
    name: 'Vinicius',
    image: 'https://tryeasel.dev/placeholder.svg?width=40&height=40',
  },
  {
    name: 'Valentim',
    image: 'https://tryeasel.dev/placeholder.svg?width=40&height=40',
  },
  {
    name: 'Iago',
    image: 'https://tryeasel.dev/placeholder.svg?width=40&height=40',
  },
  {
    name: 'Bruno',
    image: 'https://tryeasel.dev/placeholder.svg?width=40&height=40',
  },
];

const initialMainStudent = {
  name: 'André Felipe Witt',
  image: 'https://tryeasel.dev/placeholder.svg?width=60&height=60',
};

const initialPedagogique = [
  {
    name: 'Juciene M. de O. Mota',
    image: 'https://tryeasel.dev/placeholder.svg?width=40&height=40',
  },
  {
    name: 'Michele',
    image: 'https://tryeasel.dev/placeholder.svg?width=40&height=40',
  },
];


export default function Page() {
  const [mainStudent, setMainStudent] = useState(initialMainStudent);
  const [students, setStudents] = useState(initialStudents);

  const positivePointsPlaceholder = "Texto para Pontos Positivos";
  const improvementPointsPlaceholder = "Texto para Pontos de Melhoria";
  const suggestionsPlaceholder = "Texto para Sugestões de Melhoria";

  return (
    <div className="min-h-screen bg-muted">
      <Header />
      <div className="container mx-auto py-15">
        <StudentFormLayout
          students={students}
          mainStudent={mainStudent}
          positivePointsPlaceholder={positivePointsPlaceholder}
          improvementPointsPlaceholder={improvementPointsPlaceholder}
          suggestionsPlaceholder={suggestionsPlaceholder}
          setMainStudent={setMainStudent}
          teachers={initialTeachers}
          pedagogiques={initialPedagogique}
        />
      </div>
    </div>
  );
}