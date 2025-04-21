"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import { ChevronLeft } from "lucide-react";
import { SearchBar } from '@/components/search-bar';
import { ViewModeToggle } from '@/components/view-mode-toggle';
import { AlunoItem } from '@/components/aluno-item';
import { AlunoList } from '@/components/aluno-list';
import { AddButton } from '@/components/add-button';
import AdicionarButton from "@/components/adicionar-button";

const alunoColors = [
    "#B6B881", "#D88C7E", "#A58D64", "#9F70AB", "#AF878D", "#8795BA", "#9F93D0", "#8A6FBA",
    "#B5B681", "#BE7DDB", "#907D78", "#B7A4D4", "#8FA76C", "#94C36B", "#C46694", "#7866AD",
    "#DCDA90", "#C1D3B4", "#9A9ED2", "#AFD8AB", "#C8CDC4", "#CFBDDB", "#657BCF", "#99BDAF",
    "#CC78CF", "#D393A6", "#D675B6", "#A680CA", "#897DAB", "#767D88", "#78CA8E", "#B985AA",
    "#6B80AD", "#A39790", "#856688", "#A8D46C", "#C4BA73", "#9BC7DB", "#DABDD6", "#748F97",
    "#C8ABAC", "#CBAEC3", "#9D98BC", "#D0D08B", "#87CF75", "#6BBA7A", "#A7B890", "#A36CAE",
    "#65A1AC", "#BA9076", "#CC839B", "#D2BFB2", "#7F8AA0", "#DCA4C4", "#81A3C6", "#99C471",
    "#80988A", "#C1AE6B", "#65767E", "#9176C8", "#8AA7A7", "#64CB9E", "#666BAC", "#C4808A",
    "#DCB18F", "#9D79BD", "#9B7287", "#7FB970", "#A6987A", "#A097C9",
];

const getRandomColor = () => {
    return alunoColors[Math.floor(Math.random() * alunoColors.length)];
};

interface Aluno {
    id: number;
    name: string;
    turma: string;
    turno: string;
    photoUrl: string | null;
    color: string;
}

export default function VerAlunosPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [alunoList, setAlunoList] = useState<Aluno[]>([]);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    useEffect(() => {
        const storedAlunos = localStorage.getItem('alunos');
        if (storedAlunos) {
            setAlunoList(JSON.parse(storedAlunos));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('alunos', JSON.stringify(alunoList));
    }, [alunoList]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleRemoveAluno = (id: number) => {
        setAlunoList(alunoList.filter((item) => item.id !== id));
    };

    const handleAddAluno = () => {
        const newId = Date.now();
        const newColor = getRandomColor();
        const newAluno: Aluno = {
            id: newId,
            name: "Novo Aluno",
            turma: "MI74",
            turno: "2º Turno",
            photoUrl: "https://tryeasel.dev/placeholder.svg?width=60&height=60",
            color: newColor,
        };
        setAlunoList([...alunoList, newAluno]);
    };

    const filteredAlunos = alunoList.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                        VER ALUNOS
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
                        <div onClick={handleAddAluno}>
                            <AddButton text="Adicionar aluno" />
                        </div>

                        {filteredAlunos.map((aluno) => (
                            <AlunoItem
                                key={aluno.id}
                                id={aluno.id}
                                name={aluno.name}
                                turma={aluno.turma}
                                turno={aluno.turno}
                                photoUrl={aluno.photoUrl}
                                color={aluno.color}
                                onRemoveAluno={handleRemoveAluno}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="px-4 mt-8">
                        <AlunoList
                            alunos={filteredAlunos}
                            onRemoveAluno={handleRemoveAluno}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
