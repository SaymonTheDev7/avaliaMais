"use client"

import { Plus } from "lucide-react"

type AdicionarButtonProps = {
  onClick?: () => void
}

export default function AdicionarButton({ onClick }: AdicionarButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-[#003366] text-white px-4 py-2 rounded-md hover:bg-[#004488] transition-colors"
    >
      <Plus size={18} />
      <span>Adicionar</span>
    </button>
  )
}
