import React from 'react';
import FeedbackCard from '@/components/feedback-card';

const feedbacks = [
  {
    id: 1,
    date: '19/02/2023',
    content: 'Ele demonstra dedicação e responsabilidade nas tarefas. No entanto, otimizar o tempo de execução ajudaria a aumentar sua eficiência.'
  },
  {
    id: 2,
    date: '14/02/2022',
    content: 'Ele busca soluções e assume responsabilidades, demonstrando iniciativa. No entanto, poderia se expressar de forma mais clara para evitar mal-entendidos.'
  },
  {
    id: 3,
    date: '12/02/2021',
    content: 'Ele busca soluções e assume responsabilidades, demonstrando iniciativa. No entanto, poderia se expressar de forma mais clara para evitar mal-entendidos.'
  }
];

export default function FeedbackSection() {
  return (
    <div>
      <h2 className="text-4xl font-bold text-[#02335E] border-b-2 border-gray-300 pb-3 mb-8">
        FEEDBACKS ANTERIORES
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {feedbacks.map((feedback) => (
          <FeedbackCard 
            key={feedback.id}
            date={feedback.date}
            content={feedback.content}
          />
        ))}
      </div>
    </div>
  );
}
