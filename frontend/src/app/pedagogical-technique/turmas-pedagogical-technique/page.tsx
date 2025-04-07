"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import { ChevronLeft } from "lucide-react";
import axios from "axios";
import { SearchBar } from "@/components/search-bar";
import { ClassItem } from "@/components/class-item";
import { ClassList } from "@/components/class-list";
import { AddButton } from "@/components/add-button";
import { ViewModeToggle } from "@/components/view-mode-toggle";
import AdicionarButton from "@/components/adicionar-button";

const classColors = [
  "#B6B881", "#D88C7E", "#A58D64", "#9F70AB", "#AF878D", "#8795BA", "#9F93D0", "#8A6FBA", "#B5B681", "#BE7DDB",
  "#907D78", "#B7A4D4", "#8FA76C", "#94C36B", "#C46694", "#7866AD", "#DCDA90", "#C1D3B4", "#9A9ED2", "#AFD8AB",
  "#C8CDC4", "#CFBDDB", "#657BCF", "#99BDAF", "#CC78CF", "#D393A6", "#D675B6", "#A680CA", "#897DAB", "#767D88",
  "#78CA8E", "#B985AA", "#6B80AD", "#A39790", "#856688", "#A8D46C", "#C4BA73", "#9BC7DB", "#DABDD6", "#748F97",
  "#C8ABAC", "#CBAEC3", "#9D98BC", "#D0D08B", "#87CF75", "#6BBA7A", "#A7B890", "#A36CAE", "#65A1AC", "#BA9076",
  "#CC839B", "#D2BFB2", "#7F8AA0", "#DCA4C4", "#81A3C6", "#99C471", "#80988A", "#C1AE6B", "#65767E", "#9176C8",
  "#8AA7A7", "#64CB9E", "#666BAC", "#C4808A", "#DCB18F", "#9D79BD", "#9B7287", "#7FB970", "#A6987A", "#A097C9",
  // ... rest of the colors
];

const getRandomColor = () => {
  return classColors[Math.floor(Math.random() * classColors.length)];
};

type ClassItemType = {
  id: number;
  name: string;
  students: number;
  time: string;
  color: string;
};

type ExtendedItem = Partial<ClassItemType> & {
  isAddButton: boolean;
  id: number;
};

export default function VerTurmasPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [classList, setClassList] = useState<ClassItemType[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const fetchClasses = async () => {
    try {
      const res = await axios.get("http://localhost:9090/class/find/all?page=0");

      const updatedClasses = res.data.content.map((item: any) => {
        const key = `classColor-${item.uuid}`;
        let color = localStorage.getItem(key);

        if (!color) {
          color = getRandomColor();
          localStorage.setItem(key, color);
        }

        return {
          id: item.uuid,
          name: item.nameClass,
          students: item.quantityStudents,
          time: item.time,
          color,
        };
      });

      setClassList(updatedClasses);
      console.log("Turmas carregadas:", updatedClasses);
    } catch (err) {
      console.error("Erro ao buscar turmas:", err);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRemoveClass = (id: number) => {
    // Implement class removal logic here
    setClassList(classList.filter((item) => item.id !== id));
    // You might want to add API call to delete the class from the backend
  };

  const handleAddClass = () => {
    // Implement class addition logic here
    // This is just a placeholder, you'll need to adapt it to your needs
    const newId = Date.now();
    const newColor = getRandomColor();
    const newClass: ClassItemType = {
      id: newId,
      name: "Nova Turma",
      students: 0,
      time: "08:00 - 10:00",
      color: newColor,
    };
    setClassList([...classList, newClass]);
    // You might want to add API call to add the class to the backend
  };

  const filteredClasses = classList.filter(item =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <div className="flex gap-2">
            {viewMode === "list" && (
              <AdicionarButton />
            )}
            <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-4 mt-8">
            <div onClick={handleAddClass}>
              <AddButton text="Adicionar turma" />
            </div>

            {filteredClasses.map((classItem) => (
              <ClassItem
                key={classItem.id}
                id={classItem.id}
                name={classItem.name}
                students={classItem.students}
                time={classItem.time}
                color={classItem.color}
              />
            ))}
          </div>
        ) : (
          <div className="px-4 mt-8">
            <ClassList
              classes={filteredClasses}
              onRemoveClass={handleRemoveClass}
            />
          </div>
        )}
      </div>
    </div>
  );
}