"use client"

import { X, XCircle } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface ErrorToastProps {
  message?: string
  duration?: number
  onClose?: () => void
}

export default function ErrorToastTeacher({
  message = "Erro ao carregar professor. Tente novamente.",
  duration = 5000,
  onClose,
}: ErrorToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onClose) onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  return (
    <motion.div
      className="w-full max-w-sm overflow-hidden rounded-lg shadow-lg"
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.4,
      }}
    >
      <div className="bg-[var(--destructive)] px-4 py-2 text-white flex items-center">
        <div className="h-8 w-24 relative mx-auto">
          <Image src="/avalia-logo.png" alt="Avalia+" fill className="object-contain" />
        </div>
        <button
          onClick={() => {
            setIsVisible(false)
            if (onClose) onClose()
          }}
          className="text-white hover:text-gray-200 absolute right-2"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="bg-white p-4 text-center flex items-center justify-center gap-2">
        <XCircle className="h-5 w-5 text-red-600" />
        <p className="text-gray-800 font-medium text-lg">{message}</p>
      </div>
    </motion.div>
  )
}
