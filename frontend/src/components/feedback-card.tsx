import React from 'react';

interface FeedbackCardProps {
  date: string;
  content: string;
}

export default function FeedbackCard({ date, content }: FeedbackCardProps) {
  return (
    <div className="bg-[#02335E] text-white p-6 rounded-lg text-lg shadow-md">
      <div className="text-right mb-2 font-medium text-xl">{date}</div>
      <p className="text-base">{content}</p>
    </div>
  );
}
