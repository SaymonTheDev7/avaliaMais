"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import { ChevronLeft } from "lucide-react";
import axios from "axios";
import { SearchBar } from "@/components/search-bar";
import { useRouter } from "next/navigation";
import { ViewModeToggle } from "@/components/view-mode-toggle";
import AdicionarButton from "@/components/adicionar-button";
import { CourseItem } from "@/components/course-item";
import { CourseList } from "@/components/course-list";
import ErrorToast from "@/components/erro-buscar-curso-toast";
import CorrectToastCurso from "@/components/correct-curso-toast";  // Importando o novo toast

const classColors = [
  "#B6B881", "#D88C7E", "#A58D64", "#9F70AB", "#AF878D", "#8795BA", "#9F93D0", "#8A6FBA", "#B5B681", "#BE7DDB",
  "#557CA3", "#425DBB"
];

const getRandomColor = () => {
  return classColors[Math.floor(Math.random() * classColors.length)];
};

type CourseItemType = {
  id: string;
  name: string;
  type: string;
  workload: number;
  color: string;
};

type ExtendedItem = Partial<CourseItemType> & {
  id: string;
  isAddButton: boolean;
};

export default function VerCursosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courseList, setCourseList] = useState<CourseItemType[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showCorrectToast, setShowCorrectToast] = useState(false);
  const router = useRouter();

  const fetchCourses = async () => {
    try {
      
      const res = await axios.get("http://localhost:9090/course/find/all?page=0", {
        withCredentials: true
      });
  
      const courses = res.data.content || [];
  
      const updatedCourses: CourseItemType[] = courses.map((item: any) => {
        const key = `courseColor-${item.uuid}`;
        let color = localStorage.getItem(key);
  
        if (!color) {
          color = getRandomColor();
          localStorage.setItem(key, color);
        }
  
        return {
          id: item.uuid,
          name: item.nameCourse,
          type: item.type,
          workload: item.workloadCourse,
          color,
        };
      });
  
      setCourseList(updatedCourses);
      setShowCorrectToast(true); 
    } catch (err) {
      console.error("Erro ao buscar cursos:", err);
      setShowErrorToast(true);  
    }
  };

  

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCourses = courseList.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const combinedList: ExtendedItem[] = [
    { id: "-1", isAddButton: true },
    ...filteredCourses.map((item) => ({ ...item, isAddButton: false }))
  ];

  const handleRemoveCourse = (id: string) => {
    setCourseList(courseList.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      <div className="p-4 md:p-6 flex-1 ml-2 md:ml-6 lg:ml-10 mr-2 md:mr-6 lg:mr-10 mt-8">
        <div className="flex items-center mb-6 px-4">
          <button onClick={() => router.back()} className="text-[#003366] mr-4">
            <ChevronLeft className="chevron cursor-pointer" size={28} strokeWidth={2.5} />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#003366] uppercase border-b-2 border-[#003366] pb-1">
            VER CURSOS
          </h1>
        </div>
  
        <div className="flex items-center mb-6 gap-4 px-4 justify-between">
          <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <div className="flex gap-2">
            {viewMode === "list" && <AdicionarButton />}
            <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
          </div>
        </div>
  
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-4 mt-8">
            <div
              key="-1"
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#003366] text-white cursor-pointer h-[180px]"
            >
              <div className="rounded-full p-4 mb-2">
                <div className="text-4xl sm:text-5xl font-bold">+</div>
              </div>
              <div className="font-medium text-xl sm:text-2xl text-center">Adicionar curso</div>
            </div>
            {filteredCourses.map((item) => (
              <CourseItem
                key={item.id}
                id={item.id}
                name={item.name}
                type={item.type}
                workload={item.workload}
                color={item.color}
              />
            ))}
          </div>
        ) : (
          <div className="px-4 mt-8">
            <CourseList courses={filteredCourses} onRemoveCourse={handleRemoveCourse} />
          </div>
        )}
  
        {showErrorToast && <ErrorToast message="Erro ao buscar cursos, tente novamente!" />}
        {showCorrectToast && <CorrectToastCurso message="Cursos carregados com sucesso" />}
      </div>
    </div>
  );
};  