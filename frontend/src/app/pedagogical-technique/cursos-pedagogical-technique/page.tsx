"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import { ChevronLeft } from "lucide-react";
import axios from "axios";
import { SearchBar } from "@/components/search-bar";
import { AddButton } from "@/components/add-button";
import { ViewModeToggle } from "@/components/view-mode-toggle";
import AdicionarButton from "@/components/adicionar-button";
import { CourseItem } from "@/components/course-item";
import { CourseList } from "@/components/course-list";

const classColors = [
  "#B6B881", "#D88C7E", "#A58D64", "#9F70AB", "#AF878D", "#8795BA", "#9F93D0", "#8A6FBA", "#B5B681", "#BE7DDB",
  "#907D78", "#B7A4D4", "#8FA76C", "#94C36B", "#C46694", "#7866AD", "#DCDA90", "#C1D3B4", "#9A9ED2", "#AFD8AB",
  "#C8CDC4", "#CFBDDB", "#657BCF", "#99BDAF", "#CC78CF", "#D393A6", "#D675B6", "#A680CA", "#897DAB", "#767D88",
  "#78CA8E", "#B985AA", "#6B80AD", "#A39790", "#856688", "#A8D46C", "#C4BA73", "#9BC7DB", "#DABDD6", "#748F97",
  "#C8ABAC", "#CBAEC3", "#9D98BC", "#D0D08B", "#87CF75", "#6BBA7A", "#A7B890", "#A36CAE", "#65A1AC", "#BA9076",
  "#CC839B", "#D2BFB2", "#7F8AA0", "#DCA4C4", "#81A3C6", "#99C471", "#80988A", "#C1AE6B", "#65767E", "#9176C8",
  "#8AA7A7", "#64CB9E", "#666BAC", "#C4808A", "#DCB18F", "#9D79BD", "#9B7287", "#7FB970", "#A6987A", "#A097C9",
  "#A69D96", "#918DD7", "#C286A4", "#C46AAB", "#AFA464", "#CBD2C6", "#8E87B0", "#94A3A4", "#CC90AE", "#B58981",
  "#64C98A", "#88C6B7", "#BECFC2", "#657D86", "#D68687", "#CD8991", "#95A394", "#C4B9D7", "#CEA07F", "#CBD3C3",
  "#64C2AF", "#DBC5D7", "#B28789", "#90B0C5", "#799A84", "#B793D8", "#CEB196", "#8592CF", "#B084D7", "#A271BF",
  "#80D095", "#9B87D1", "#7F6C75", "#8F8DAA", "#B4DBD2", "#CFDBBA", "#D1D086", "#D7AB98", "#659664", "#D7CA68",
  "#B36A80", "#926DD3", "#79787A", "#856990", "#D7ACAA", "#B6946D", "#B38174", "#B78769", "#CB74A0", "#AA8465",
  "#89BAB3", "#768DA5", "#BAAAAF", "#A4BDB3", "#76DBCA", "#D29ACD", "#AEDAB0", "#7685A6", "#8BC1BC", "#69CC98",
  "#83D76C", "#B1686F", "#989B92", "#AFC36F", "#AA987A", "#67A6C2", "#B781A8", "#A59DA6", "#97B668", "#B16CD9",
  "#CBA8CF", "#898DC7", "#CD8A6E", "#BBAAAB", "#99C69D", "#D4C4DC", "#AE69C2", "#889A9D", "#A195AA", "#8BAF92",
  "#64ABD5", "#7FB76A", "#C5D6C4", "#C880D9", "#CF94D8", "#AFCA65", "#D5BF9D", "#7BCFAE", "#B189C0", "#8BC082",
  "#AB75B8", "#6877AA", "#C996A3", "#847EB8", "#8EAF8A", "#BD8A76", "#D494C0", "#D29A8E", "#9974B5", "#B47FBD",
  "#BE7AC6", "#8CA7B0", "#B2A3BC", "#A2AF97", "#AEC39C", "#B369C4", "#7EB4BC", "#AAD983", "#80656C", "#B1C0A7",
  "#C66ED6", "#96C97B", "#A773A8", "#999870", "#71D2B0", "#82D896", "#B4C4C6", "#A2CF7B", "#989E85", "#93DAAC",
  "#D4CD7B", "#6DA9C4", "#CCB3B2", "#76DBB1", "#A8CAD1", "#9CBF82", "#D69DA6", "#9F77AF", "#BDAABB", "#7B846F",
  "#3C74D4", "#5C63BA", "#756AB2", "#4365CA", "#3874BA", "#5B56B3", "#5868D1", "#538BA5", "#385EAF", "#5E8EC2",
  "#4563A4", "#4C89CE", "#6368D1", "#5161C9", "#7671A5", "#5F7FB7", "#3A89D1", "#5963C6", "#557CA3", "#425DBB"
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

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:9090/course/find/all?page=0");

      const updatedCourses: CourseItemType[] = res.data.content.map((item: any) => {
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
      console.log("Cursos carregados:", updatedCourses);
    } catch (err) {
      console.error("Erro ao buscar cursos:", err);
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
          <a href="#" className="text-[#003366] mr-4">
            <ChevronLeft className="chevron" size={28} strokeWidth={2.5} />
          </a>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#003366] uppercase border-b-2 border-[#003366] pb-1">
            VER CURSOS
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
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-4 mt-8`}
          >
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
            <CourseList
              courses={filteredCourses}
              onRemoveCourse={handleRemoveCourse}
            />
          </div>
        )}
      </div>
    </div>
  );
}