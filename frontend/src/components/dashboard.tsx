"use client";

import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

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

export function Dashboard({ professorData, alunosData, pedagogicaData, conselhosData }: DashboardProps) {
  const [selectedConselho, setSelectedConselho] = useState(conselhosData[0].name);

  const handleConselhoChange = (event: any) => {
    setSelectedConselho(event.target.value);
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
          <div className="flex justify-around">
            {/* Chart 1: Professores */}
            <div className="flex flex-col items-center">
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
                  >
                    {professorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Chart 2: Alunos */}
            <div className="flex flex-col items-center">
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
                  >
                    {alunosData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Chart 3: Pedagogico */}
            <div className="flex flex-col items-center">
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
          <div className="flex justify-center mt-4 text-lg">
            <div className="flex items-center mr-4">
              <div className="w-4 h-4 bg-[#02335E] mr-2"></div>
              <span style={{ color: '#02335E' }}>Visualizaram o feedback</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-[#D4D4D4] mr-2"></div>
              <span style={{ color: '#02335E' }}>Não visualizaram o feedback</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}