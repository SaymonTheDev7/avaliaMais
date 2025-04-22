"use client"

import { X, XCircle } from "lucide-react"  // Usando XCircle para o ícone de erro
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface ErrorToastProps {
  message?: string
  duration?: number
  onClose?: () => void
}

export default function ErrorToast({
  message = "Erro ao carregar curso. Tente novamente.",
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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-18 right-4 z-50 w-full max-w-sm overflow-hidden rounded-lg shadow-lg"
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
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
            <XCircle className="h-5 w-5 text-red-600" />  {/* Ícone de erro XCircle */}
            <p className="text-gray-800 font-medium text-lg">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
