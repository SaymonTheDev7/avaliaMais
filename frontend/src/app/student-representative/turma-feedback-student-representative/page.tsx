"use client"
import Header from "@/components/header"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function ConselhoClassePage() {
    return (
        <div className="flex flex-col h-screen bg-white">
            <Header />
            <div className="p-4 md:p-6 flex-1 relative ml-2 md:ml-6 lg:ml-10 mr-2 md:mr-6 lg:mr-10 mt-8">

                {/* Seta responsiva */}
                <Link
                    href="#"
                    className="absolute top-[90px] md:top-[115px] left-1 md:left-2 transform -translate-y-1/2"
                >
                    <ChevronLeft
                        className="h-8 w-8 md:h-12 md:w-12 text-[#003366]"
                        strokeWidth={2.5}
                    />
                </Link>

                {/* Banner section */}
                <div className="flex items-start px-4 md:px-6 lg:px-10">
                    <div className="bg-[#5A6E7F] text-white rounded-lg overflow-hidden flex-1">
                        <div className="relative h-[180px] flex items-center">
                            <h1 className="text-2xl md:text-4xl font-bold px-4 md:px-10">
                                Conselho de Classe 12/06/2025
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Content section */}
                <div className="space-y-10 px-4 md:px-6 lg:px-10 mt-8">
                    {/* Devolutiva Individual Card */}
                    <div className="bg-[#003366] text-white rounded-lg overflow-hidden">
                        <div className="p-6 md:p-8">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">Devolutiva Individual</h2>
                            <p className="text-base md:text-xl">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolo.
                            </p>
                        </div>
                    </div>

                    {/* Devolutiva da Turma Card */}
                    <div className="bg-[#003366] text-white rounded-lg overflow-hidden">
                        <div className="p-6 md:p-8">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">Devolutiva da Turma</h2>
                            <p className="text-base md:text-xl">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolo.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
