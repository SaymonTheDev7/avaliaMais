"use client"

import type { ReactNode } from "react"
import { Children, cloneElement, isValidElement } from "react"
import { AnimatePresence } from "framer-motion"

interface ToastContainerProps {
  children: ReactNode
}

export function ToastContainer({ children }: ToastContainerProps) {
  // Adicionar chaves únicas aos elementos filhos
  const childrenWithKeys = Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      // Se o elemento já tem uma chave, use-a; caso contrário, use o índice
      return cloneElement(child, {
        key: child.key || `toast-${index}`,
      })
    }
    return child
  })

  return (
    <div className="fixed right-4 top-18 z-50 flex flex-col gap-4">
      <AnimatePresence>{childrenWithKeys}</AnimatePresence>
    </div>
  )
}
