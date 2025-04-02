"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import { Search, Filter, User, X, ChevronLeft } from "lucide-react";

const classColors = [
  "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF", "#33FFF5", "#F5FF33", "#FF8C33", "#8C33FF", "#33FFA1",
  "#FF3333", "#33FF8C", "#3333FF", "#FF33F5", "#F533FF", "#33FFD1", "#D1FF33", "#FF5E33", "#5E33FF", "#33FFD9",
  "#FFBD33", "#BD33FF", "#33FFBD", "#FF336B", "#6B33FF", "#33FF6B", "#FF338C", "#8C33FF", "#33FF33", "#FF33D9",
  "#D933FF", "#33FF5E", "#5EFF33", "#FF6B33", "#6BFF33", "#FF338C", "#8CFF33", "#FF33BD", "#BDFF33", "#FF33FF",
  "#33FFFF", "#FFFFFF", "#CCCCCC", "#999999", "#666666", "#333333", "#000000", "#F0F8FF", "#FAEBD7", "#00FFFF",
  "#7FFFD4", "#F0FFFF", "#F5F5DC", "#FFE4C4", "#0000FF", "#8A2BE2", "#A52A2A", "#DEB887", "#5F9EA0", "#7FFF00",
  "#D2691E", "#FF7F50", "#6495ED", "#DC143C", "#00FFFF", "#00008B", "#008B8B", "#B8860B", "#A9A9A9", "#006400",
  "#BDB76B", "#8B008B", "#556B2F", "#FF8C00", "#9932CC", "#8B0000", "#E9967A", "#8FBC8F", "#483D8B", "#2F4F4F",
  "#00CED1", "#9400D3", "#FF1493", "#00BFFF", "#696969", "#1E90FF", "#B22222", "#FFFAF0", "#228B22", "#FF00FF",
  "#DCDCDC", "#F8F8FF", "#FFD700", "#DAA520", "#808080", "#008000", "#ADFF2F", "#F0FFF0", "#FF69B4", "#CD5C5C",
  "#4B0082", "#FFFFF0", "#F0E68C", "#E6E6FA", "#FFF0F5", "#7CFC00", "#FFFACD", "#ADD8E6", "#F08080", "#E0FFFF",
  "#FAFAD2", "#90EE90", "#D3D3D3", "#FFB6C1", "#FFA07A", "#20B2AA", "#87CEFA", "#778899", "#B0C4DE", "#FFFFE0",
  "#00FF00", "#32CD32", "#FAF0E6", "#FF00FF", "#800000", "#66CDAA", "#0000CD", "#BA55D3", "#9370DB", "#3CB371",
  "#7B68EE", "#00FA9A", "#48D1CC", "#C71585", "#191970", "#FFE4E1", "#FFE4B5", "#FFDEAD", "#000080", "#FDF5E6",
  "#808000", "#6B8E23", "#FFA500", "#FF4500", "#DA70D6", "#EEE8AA", "#98FB98", "#AFEEEE", "#DB7093", "#FFEFD5",
  "#FFDAB9", "#CD853F", "#FFC0CB", "#DDA0DD", "#B0E0E6", "#800080", "#663399", "#FF0000", "#BC8F8F", "#4169E1",
  "#8B4513", "#FA8072", "#FAA460", "#2E8B57", "#FFF5EE", "#A0522D", "#C0C0C0", "#87CEEB", "#6A5ACD", "#708090",
  "#FFFAFA", "#00FF7F", "#4682B4", "#D2B48C", "#008080", "#D8BFD8", "#FF6347", "#40E0D0", "#EE82EE", "#F5DEB3",
  "#FFFFFF", "#F5F5F5", "#FFFF00", "#9ACD32", "#FF6F61", "#6B4226", "#B7C0EE", "#BDFCC9", "#8C72CB", "#C3B091",
  "#BCB88A", "#EAEAEA", "#FFFDD0", "#C0D6E4", "#FFDF00", "#F4A460", "#5F9EA0", "#7FFF00", "#D2691E", "#FF7F50",
  "#6495ED", "#DC143C", "#00FFFF", "#00008B", "#008B8B", "#B8860B", "#A9A9A9", "#006400", "#BDB76B", "#8B008B",
  "#556B2F", "#FF8C00", "#9932CC", "#8B0000", "#E9967A", "#8FBC8F", "#483D8B", "#2F4F4F", "#00CED1", "#9400D3",
  "#FF1493", "#00BFFF", "#696969", "#1E90FF", "#B22222", "#FFFAF0", "#228B22", "#FF00FF", "#DCDCDC", "#F8F8FF",
  "#FFD700", "#DAA520", "#808080", "#008000", "#ADFF2F", "#F0FFF0", "#FF69B4", "#CD5C5C", "#4B0082", "#FFFFF0",
  "#F0E68C", "#E6E6FA", "#FFF0F5", "#7CFC00", "#FFFACD", "#ADD8E6", "#F08080", "#E0FFFF", "#FAFAD2", "#90EE90",
  "#D3D3D3", "#FFB6C1", "#FFA07A", "#20B2AA", "#87CEFA", "#778899", "#B0C4DE", "#FFFFE0", "#00FF00", "#32CD32",
  "#FAF0E6", "#FF00FF", "#800000", "#66CDAA", "#0000CD", "#BA55D3", "#9370DB", "#3CB371", "#7B68EE", "#00FA9A",
  "#48D1CC", "#C71585", "#191970", "#FFE4E1", "#FFE4B5", "#FFDEAD", "#000080", "#FDF5E6", "#808000", "#6B8E23",
  "#FFA500", "#FF4500", "#DA70D6", "#EEE8AA", "#98FB98", "#AFEEEE", "#DB7093", "#FFEFD5", "#FFDAB9", "#CD853F",
];

const getRandomColor = () => {
  return classColors[Math.floor(Math.random() * classColors.length)];
};

const initialClassData = [
  { id: 1, name: "WF-78 PSIN 2024/1", students: 21, time: "13:40-22:00" },
  { id: 2, name: "MQ-75 PSIN 2024/2", students: 21, time: "13:40-22:00" },
  { id: 3, name: "JB-76 PSIN 2023/2", students: 21, time: "13:40-22:00" },
  { id: 4, name: "MI-75 PSIN 2023/2", students: 21, time: "13:40-22:00" },
  { id: 5, name: "FG-75 PSIN 2023/2", students: 21, time: "13:40-22:00" },
  { id: 6, name: "TP-74 PSIN 2023/2", students: 21, time: "13:40-22:00" },
  { id: 7, name: "FA-73 PSIN 2023/2", students: 21, time: "13:40-22:00" },
];

export default function VerTurmasPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [classList, setClassList] = useState<{ id: number; name: string; students: number; time: string; color: string }[]>([]);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    setClassList(initialClassData.map((item) => ({ ...item, color: getRandomColor() })));
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRemoveClass = (id: number) => {
    setClassList(classList.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="p-4 md:p-6 flex-1 ml-2 md:ml-6 lg:ml-10 mr-2 md:mr-6 lg:mr-10 mt-8">
        <div className="flex items-center mb-6 px-4">
          <a href="#" className="text-[#003366] mr-4">
            <ChevronLeft className="chevron" size={28} strokeWidth={2.5} />
          </a>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#003366] uppercase border-b-2 border-[#003366] pb-1">
            VER TURMAS
          </h1>
        </div>

        <div className="flex items-center mb-6 gap-4 px-4 justify-between">
          <div className="relative w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 sm:h-5 w-4 sm:w-5 text-[#003366]" />
            </div>
            <input
              type="text"
              placeholder="Pesquise algo"
              className="w-full pl-10 pr-10 py-3 bg-gray-200 rounded-md focus:outline-none text-sm sm:text-base"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Filter className="h-4 sm:h-5 w-4 sm:w-5 text-[#003366] cursor-pointer" />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              className={`text-[#003366] p-2 ${viewMode === "list" ? "opacity-100" : "opacity-50"}`}
              onClick={() => setViewMode("list")}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 5H21M3 12H21M3 19H21" stroke="#003366" strokeWidth={2} strokeLinecap="round" />
              </svg>
            </button>

            <button
              className={`text-[#003366] p-2 ${viewMode === "grid" ? "opacity-100" : "opacity-50"}`}
              onClick={() => setViewMode("grid")}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="7" stroke="#003366" strokeWidth={2} />
                <rect x="14" y="3" width="7" height="7" stroke="#003366" strokeWidth={2} />
                <rect x="3" y="14" width="7" height="7" stroke="#003366" strokeWidth={2} />
                <rect x="14" y="14" width="7" height="7" stroke="#003366" strokeWidth={2} />
              </svg>
            </button>
          </div>
        </div>

        <div className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"} gap-10 px-4 mt-8`}>
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#003366] text-white cursor-pointer h-[180px]">
            <div className="rounded-full p-4 mb-2">
              <div className="text-4xl sm:text-5xl font-bold">+</div>
            </div>
            <div className="font-medium text-xl sm:text-2xl text-center">Adicionar turma</div>
          </div>

          {classList.map((item) => (
            <div key={item.id} className="relative rounded-xl overflow-hidden shadow-md bg-[#003366] text-white h-[180px]">
              <div className="h-20" style={{ backgroundColor: item.color }}></div>
              <div className="p-4 mt-2">
                <h3 className="text-xl sm:text-2xl font-bold truncate">{item.name}</h3>
                <div className="flex items-center text-base mt-3">
                  <User className="mr-1 h-4 sm:h-5 w-4 sm:w-5" />
                  <span>{item.students}</span>
                  <span className="mx-2">-</span>
                  <span>{item.time}</span>
                </div>

                <button
                  onClick={() => handleRemoveClass(item.id)}
                  className="absolute bottom-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 mb-1 mr-1"
                >
                  <X className="h-4 sm:h-5 w-4 sm:w-5 cursor-pointer" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
