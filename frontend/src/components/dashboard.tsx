"use client";

import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import { X } from "lucide-react";

interface DashboardProps {
  professorData: { name: string; value: number }[];
  alunosData: { name: string; value: number }[];
  pedagogicaData: { name: string; value: number }[];
  conselhosData: { name: string }[];
}

const COLORS = ['#02335E', '#D4D4D4'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const fill = percent > 0.5 ? 'white' : '#02335E';

  return (
    <text x={x} y={y} fill={fill} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize="16" fontWeight="bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface PopupProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-[#02335E]">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="mb-6">
          {content}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#02335E] text-white rounded hover:bg-opacity-90"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export function Dashboard({ professorData, alunosData, pedagogicaData, conselhosData }: DashboardProps) {
  const [selectedConselho, setSelectedConselho] = useState(conselhosData[0].name);
  const [showProfessorPopup, setShowProfessorPopup] = useState(false);
  const [showAlunosPopup, setShowAlunosPopup] = useState(false);
  const [showPedagogicaPopup, setShowPedagogicaPopup] = useState(false);

  const handleConselhoChange = (event: any) => {
    setSelectedConselho(event.target.value);
  };

  const handlePieClick = (data: any, index: number, chartType: 'professor' | 'alunos' | 'pedagogica') => {
    // Apenas mostrar popup quando clicar na parte cinza (índice 1)
    if (index === 1) {
      if (chartType === 'professor') {
        setShowProfessorPopup(true);
      } else if (chartType === 'alunos') {
        setShowAlunosPopup(true);
      } else if (chartType === 'pedagogica') {
        setShowPedagogicaPopup(true);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900">
      <div className="p-4">
        <div className="mb-4 text-lg font-medium text-[#02335E]">
          SELECIONE O CONCELHO:
        </div>
        <select
          value={selectedConselho}
          onChange={handleConselhoChange}
          className="w-full p-2 border rounded text-lg"
          style={{ borderColor: '#02335E', color: '#02335E' }}
        >
          {conselhosData.map((conselho, index) => (
            <option key={index} value={conselho.name} style={{ color: '#02335E' }}>
              {conselho.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-grow p-4">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-md p-4">
          <div className="flex justify-around flex-wrap">
            {/* Chart 1: Professores */}
            <div className="flex flex-col items-center mb-6">
              <h2 className="text-xl font-semibold text-[#02335E] dark:text-gray-300 mb-4">Professores</h2>
              <ResponsiveContainer width={350} height={350}>
                <PieChart width={350} height={350}>
                  <Pie
                    data={professorData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    onClick={(data, index) => handlePieClick(data, index, 'professor')}
                    cursor="pointer"
                  >
                    {professorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Chart 2: Alunos */}
            <div className="flex flex-col items-center mb-6">
              <h2 className="text-xl font-semibold text-[#02335E] dark:text-gray-300 mb-4">Alunos</h2>
              <ResponsiveContainer width={350} height={350}>
                <PieChart width={350} height={350}>
                  <Pie
                    data={alunosData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    onClick={(data, index) => handlePieClick(data, index, 'alunos')}
                    cursor="pointer"
                  >
                    {alunosData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Chart 3: Pedagogico */}
            <div className="flex flex-col items-center mb-6">
              <h2 className="text-xl font-semibold text-[#02335E] dark:text-gray-300 mb-4">Pedagógico</h2>
              <ResponsiveContainer width={350} height={350}>
                <PieChart width={350} height={350}>
                  <Pie
                    data={pedagogicaData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    onClick={(data, index) => handlePieClick(data, index, 'pedagogica')}
                    cursor="pointer"
                  >
                    {pedagogicaData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Legend */}
          <div className="flex justify-center mt-4 text-lg flex-wrap">
            <div className="flex items-center mr-4 mb-2">
              <div className="w-4 h-4 bg-[#02335E] mr-2"></div>
              <span style={{ color: '#02335E' }}>Visualizaram o feedback</span>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-[#D4D4D4] mr-2"></div>
              <span style={{ color: '#02335E' }}>Não visualizaram o feedback</span>
            </div>
          </div>
        </div>
      </div>

      {/* Popups */}
      {showProfessorPopup && (
        <Popup
          title="Professores que não visualizaram o feedback"
          content={
            <div>
              <p className="mb-4">
                {professorData[1].value}% dos professores ainda não visualizaram o feedback para o concelho {selectedConselho}.
              </p>
              <div className="bg-gray-100 p-3 rounded">
                <h4 className="font-semibold mb-2">Lista de professores:</h4>
                <ul className="list-disc pl-5">
                  <li>João Silva</li>
                  <li>Maria Oliveira</li>
                  <li>Pedro Santos</li>
                  <li>Ana Pereira</li>
                  <li>Carlos Ferreira</li>
                </ul>
              </div>
            </div>
          }
          onClose={() => setShowProfessorPopup(false)}
        />
      )}

      {showAlunosPopup && (
        <Popup
          title="Alunos que não visualizaram o feedback"
          content={
            <div>
              <p className="mb-4">
                {alunosData[1].value}% dos alunos ainda não visualizaram o feedback para o concelho {selectedConselho}.
              </p>
              <div className="bg-gray-100 p-3 rounded">
                <h4 className="font-semibold mb-2">Distribuição por turmas:</h4>
                <ul className="list-disc pl-5">
                  <li>Turma A: 12 alunos</li>
                  <li>Turma B: 8 alunos</li>
                  <li>Turma C: 15 alunos</li>
                  <li>Turma D: 10 alunos</li>
                </ul>
              </div>
            </div>
          }
          onClose={() => setShowAlunosPopup(false)}
        />
      )}

      {showPedagogicaPopup && (
        <Popup
          title="Equipe pedagógica que não visualizou o feedback"
          content={
            <div>
              <p className="mb-4">
                {pedagogicaData[1].value}% da equipe pedagógica ainda não visualizou o feedback para o concelho {selectedConselho}.
              </p>
              <div className="bg-gray-100 p-3 rounded">
                <h4 className="font-semibold mb-2">Membros da equipe:</h4>
                <ul className="list-disc pl-5">
                  <li>Coordenador de Ensino</li>
                  <li>Psicólogo Escolar</li>
                  <li>Orientador Educacional</li>
                </ul>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                É importante que toda a equipe pedagógica visualize os feedbacks para garantir um acompanhamento adequado dos alunos.
              </p>
            </div>
          }
          onClose={() => setShowPedagogicaPopup(false)}
        />
      )}
    </div>
  );
}