"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface LoadingScreenProps {
  isLoading: boolean
  children?: React.ReactNode
}

export default function LoadingScreen({ isLoading, children }: LoadingScreenProps) {
  const [visible, setVisible] = useState(isLoading)
  const [progress, setProgress] = useState(0)
  const [clientSide, setClientSide] = useState(false)

  // Ensure we're on the client side before rendering animations
  useEffect(() => {
    setClientSide(true)
  }, [])

  useEffect(() => {
    if (!clientSide) return

    if (isLoading) {
      setVisible(true)
      setProgress(0)

      // Simulação de progresso mais rápida
      const interval = setInterval(() => {
        setProgress((prev) => {
          // Incremento maior para carregamento mais rápido
          const next = prev + Math.random() * 15 + 5
          return next > 100 ? 100 : next
        })
      }, 200) // Intervalo menor para atualização mais frequente

      const timeout = setTimeout(() => {
        clearInterval(interval)
        setProgress(100)
        setTimeout(() => setVisible(false), 500)
      }, 5000) // Tempo total reduzido para 5 segundos

      return () => {
        clearTimeout(timeout)
        clearInterval(interval)
      }
    } else {
      setProgress(100)
      setTimeout(() => setVisible(false), 500)
    }
  }, [isLoading, clientSide])

  // If we're not on the client side yet, return a simple loading indicator
  // This prevents hydration errors by not rendering any random values on the server
  if (!clientSide) {
    return isLoading ? (
      <div 
        className="fixed inset-0 flex items-center justify-center z-50"
        style={{ backgroundColor: "var(--foreground)" }}
      >
        <div className="text-white text-xl">Carregando...</div>
      </div>
    ) : (
      <>{children}</>
    )
  }

  // If loading is complete and animation has finished, render children
  if (!visible && !isLoading) {
    return <>{children}</>
  }

  // Client-side animation rendering
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ opacity: { duration: 0.5 } }}
      className={`fixed inset-0 flex flex-col items-center justify-center z-50 ${
        visible ? "pointer-events-auto" : "pointer-events-none"
      }`}
      style={{ backgroundColor: "var(--foreground)" }}
    >
      <div className="relative flex flex-col items-center justify-center space-y-12 p-8">
        {/* Partículas de fundo - Only rendered on client side */}
        <div className="absolute inset-0 overflow-hidden">
          {clientSide && [...Array(15)].map((_, i) => {
            // Generate random values only on the client side
            const randomX = Math.random() * 600 - 300
            const randomY = Math.random() * 600 - 300
            const randomScale = Math.random() * 0.5 + 0.5
            const randomOpacity = Math.random() * 0.5
            const randomDuration = Math.random() * 5 + 5
            const randomLeftPos = `${50 + Math.random() * 40 - 20}%`
            const randomTopPos = `${50 + Math.random() * 40 - 20}%`
            const randomYAnim = Math.random() * -200 - 100

            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-blue-600/30"
                initial={{
                  x: randomX,
                  y: randomY,
                  scale: randomScale,
                  opacity: randomOpacity,
                }}
                animate={{
                  y: [null, randomYAnim],
                  opacity: [null, 0],
                }}
                transition={{
                  duration: randomDuration,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                style={{
                  left: randomLeftPos,
                  top: randomTopPos,
                }}
              />
            )
          })}
        </div>

        {/* Logo com efeito de brilho */}
        <motion.div
          className="relative"
          initial={{ scale: 0.9, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Efeito de brilho */}
          <motion.div
            className="absolute -inset-6 rounded-full opacity-70 blur-xl"
            animate={{
              boxShadow: [
                "0 0 25px 10px rgba(37,99,235,0.3)",
                "0 0 35px 15px rgba(37,99,235,0.4)",
                "0 0 25px 10px rgba(37,99,235,0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          <Image
            src="/logo.png"
            alt="Avalia Logo"
            width={220}
            height={90}
            priority
            className="relative drop-shadow-2xl"
          />
        </motion.div>

        <div className="flex flex-col items-center space-y-8">
          {/* Barra de progresso com efeito de brilho */}
          <div className="relative w-72 h-1.5 bg-gray-800/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-blue-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
            />

            {/* Efeito de brilho na barra */}
            <motion.div
              className="absolute top-0 h-full w-20 bg-white/20 blur-sm"
              initial={{ left: "-20%" }}
              animate={{ left: "100%" }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                repeatDelay: 0.5,
              }}
            />
          </div>

          {/* Texto de carregamento com animação */}
          <motion.div
            className="flex items-center space-x-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-gray-200 font-medium tracking-wide">Carregando</span>
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-blue-600"
                  animate={{
                    y: [0, -5, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
