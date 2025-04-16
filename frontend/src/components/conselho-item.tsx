import { Info, Users } from "lucide-react"
import Link from "next/link"

interface ConselhoItemProps {
  id: number
  date: string
}

export function ConselhoItem({ id, date }: ConselhoItemProps) {
  // Gerar um número aleatório de participantes entre 5 e 25
  const participantes = Math.floor(Math.random() * 20) + 5

  return (
    <Link href={`/conselho/${id}`}>
      <div className="rounded-lg overflow-hidden shadow-md cursor-pointer h-[160px] transition-transform hover:scale-105">
        <div className="h-2/5 bg-[#0078D4]"></div>
        <div className="h-3/5 bg-[#003366] p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <p className="font-medium">Conselho</p>
              <p className="text-lg font-bold">{date}</p>
            </div>
            <div>
              <Info className="h-6 w-6 text-white" />
            </div>
          </div>

          <div className="flex items-center text-white mt-2">
            <Users className="h-5 w-5 mr-2" />
            <span className="text-sm">{participantes} participantes</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
