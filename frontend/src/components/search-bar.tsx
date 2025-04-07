import React from 'react';
import { Search, Filter } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <div className="relative w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-4 sm:h-5 w-4 sm:w-5 text-[#003366]" />
      </div>
      <input
        type="text"
        placeholder="Pesquise algo"
        className="w-full pl-10 pr-10 py-3 bg-gray-200 rounded-md focus:outline-none text-sm sm:text-base"
        value={searchTerm}
        onChange={onSearchChange}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <Filter className="h-4 sm:h-5 w-4 sm:w-5 text-[#003366] cursor-pointer" />
      </div>
    </div>
  );
}