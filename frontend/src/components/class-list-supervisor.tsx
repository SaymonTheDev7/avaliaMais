"use client"

import { User } from "lucide-react"
import { useRouter } from "next/navigation"

// Define the class item type
type ClassItemType = {
  id: number
  name: string
  students: number
  time: string
  color: string
  course?: string
  fullTime?: string
  shift?: string
  hoursLoad?: string
}

export type ClassListSupervisorProps = {
  classes: ClassItemType[]
}

export function ClassListSupervisor({ classes }: ClassListSupervisorProps) {
  const router = useRouter()

  const handleClassClick = (classItem: ClassItemType) => {
    router.push(`/supervisor/alunos-supervisor?classId=${classItem.id}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-[#003366] tracking-wider">
              Turma
            </th>
            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-[#003366] tracking-wider">
              Alunos
            </th>
            <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-[#003366] tracking-wider">
              Horário
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {classes.map((classItem) => (
            <tr
              key={classItem.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => handleClassClick(classItem)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full mr-3" style={{ backgroundColor: classItem.color }}></div>
                  <div className="text-sm font-medium text-gray-900">{classItem.name}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-500">
                  <User className="mr-1 h-4 w-4" />
                  <span>{classItem.students}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{classItem.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
