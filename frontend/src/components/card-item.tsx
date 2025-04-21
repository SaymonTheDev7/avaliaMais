import { ReactNode } from "react"
import Link from "next/link"

interface CardItemProps {
    href: string
    icon: React.ReactNode
    title: string
    isMiddle?: boolean
    className?: string
}

export default function CardItem({ href, icon, title, isMiddle = false, className = "" }: CardItemProps) {
    const heightClass = isMiddle ? "h-80" : "h-72"; // Meio maior
    return (
        <Link href={href} className="block">
            <div className={`bg-[#003366] text-white rounded-2xl p-10 flex flex-col items-center justify-center text-center w-[22rem] ${heightClass} shadow-lg hover:scale-105 transition-transform duration-300 ${className}`}>
                {icon}
                <span className="text-2xl font-semibold mt-4">{title}</span>
            </div>
        </Link>
    )
}  
