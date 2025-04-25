"use client"

import { useState } from "react"
import { ConselhoCard } from "./conselho-card-student"

interface ConselhoGridProps {
  conselhos: {
    id: number
    date: string
    status: "active" | "completed"
    participantes: number
  }[]
}

export function ConselhoGrid({ conselhos }: ConselhoGridProps) {
  const [activeId, setActiveId] = useState<number | null>(conselhos[0]?.id || null)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {conselhos.map(conselho => (
        <ConselhoCard
          key={conselho.id}
          id={conselho.id}
          date={conselho.date}
          status={conselho.status}
          participantes={conselho.participantes}
          isActive={activeId === conselho.id}
        />
      ))}
    </div>
  )
}