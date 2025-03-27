import React from 'react';
import { X, User } from 'lucide-react';

interface ClassCardProps {
  className: string;
  studentCount: number;
  time: string;
  onRemove: () => void;
}

export default function ClassCard({ className, studentCount, time, onRemove }: ClassCardProps) {
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-md">
      {/* Top blue section with image */}
      <div className="h-24 bg-[#003366]">
        <img
          src="https://tryeasel.dev/placeholder.svg?width=400&height=96"
          alt="Class Header"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom section with class details */}
      <div className="bg-[#02335E] text-white p-4">
        <h3 className="text-2xl font-bold mb-2">{className}</h3>
        <div className="flex items-center mb-2">
          <User className="mr-2" size={20} />
          <span>{studentCount}</span>
          <span className="mx-2">-</span>
          <span>{time}</span>
        </div>
        <button onClick={onRemove} className="text-red-500 hover:text-red-700">
          <X size={24} />
        </button>
      </div>
    </div>
  );
}