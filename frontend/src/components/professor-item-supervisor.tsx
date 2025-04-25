"use client"

import { Clock } from "lucide-react"
import { useState } from "react"
import { ProfessorFeedbackPopup } from "./professor-feedback-popup"

interface ProfessorItemSupervisorProps {
  id: number
  name: string
  email?: string
  department?: string
  hours: number
  photoUrl: string | null
  color: string
  classes?: string[]
  shift?: string
  professionalArea?: string
}

export function ProfessorItemSupervisor({
  id,
  name,
  department,
  hours,
  photoUrl,
  color,
  shift,
  professionalArea,
  email,
  classes,
}: ProfessorItemSupervisorProps) {
  const [showFeedback, setShowFeedback] = useState(false)

  const initials = name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .substring(0, 2)

  return (
    <>
      <div
        key={id}
        className="relative rounded-xl overflow-hidden shadow-md bg-[#003366] text-white h-[180px] cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setShowFeedback(true)}
      >
        <div className="h-18" style={{ backgroundColor: color }}></div>
        <div className="absolute top-10 left-4 transform -translate-y-1/2">
          {photoUrl ? (
            <img
              src={photoUrl || "/placeholder.svg"}
              alt={name}
              className="w-16 h-16 rounded-full border-4 border-white object-cover mt-10"
            />
          ) : (
            <div
              className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center text-2xl font-bold"
              style={{ backgroundColor: "#D65F5F" }}
            >
              {initials}
            </div>
          )}
        </div>
        <div className="p-4 mt-2">
          <h3 className="text-xl sm:text-2xl font-bold truncate">{name}</h3>
          <div className="flex items-center text-base mt-3">
            <span>{professionalArea || department}</span>
            <span className="mx-2">-</span>
            <Clock className="mr-1 h-4 sm:h-5 w-4 sm:w-5" />
            <span>{hours} horas</span>
          </div>
          {shift && (
            <div className="text-sm mt-1">
              <span className="bg-white/20 px-2 py-0.5 rounded-full">{shift}</span>
            </div>
          )}
        </div>
      </div>

      {/* Popup de Feedback */}
      {showFeedback && (
        <ProfessorFeedbackPopup
          professor={{
            id,
            name,
            department,
            hours,
            photoUrl,
            color,
            email,
            shift,
            professionalArea,
          }}
          onClose={() => setShowFeedback(false)}
        />
      )}
    </>
  )
}
