import { Calendar, Info } from "lucide-react"
import Link from "next/link"

interface ConselhoListProps {
  conselhos: {
    id: number
    date: string
  }[]
}

export function ConselhoList({ conselhos }: ConselhoListProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="grid grid-cols-12 bg-gray-100 py-4 font-semibold text-[#003366]">
        <div className="col-span-1"></div>
        <div className="col-span-5 px-4">Conselho</div>
        <div className="col-span-6 px-4">Data</div>
      </div>

      {conselhos.map((conselho, index) => (
        <Link href={`/conselho/${conselho.id}`} key={conselho.id}>
          <div
            className={`grid grid-cols-12 py-4 items-center ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
          >
            <div className="col-span-1 flex justify-center">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#003366] text-white">
                <Info className="h-5 w-5" />
              </div>
            </div>
            <div className="col-span-5 px-4 font-medium">Conselho</div>
            <div className="col-span-6 px-4 flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-[#003366]" />
              <span>{conselho.date}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
