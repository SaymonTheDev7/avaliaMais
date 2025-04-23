"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Eraser, Save, Undo } from "lucide-react"

interface SignaturePadProps {
  onSave: (signatureDataUrl: string) => void
  width?: number
  height?: number
}

export default function SignaturePad({ onSave, width = 600, height = 200 }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [hasSignature, setHasSignature] = useState(false)
  const [history, setHistory] = useState<string[]>([])

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    // Set canvas properties
    context.lineWidth = 2
    context.lineCap = "round"
    context.lineJoin = "round"
    context.strokeStyle = "#000000"

    // Clear canvas with white background
    context.fillStyle = "#ffffff"
    context.fillRect(0, 0, canvas.width, canvas.height)

    setCtx(context)

    // Save initial state
    const initialState = canvas.toDataURL()
    setHistory([initialState])
  }, [])

  // Handle drawing
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!ctx) return

    setIsDrawing(true)

    // Get coordinates
    const { offsetX, offsetY } = getCoordinates(e)

    ctx.beginPath()
    ctx.moveTo(offsetX, offsetY)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx) return

    // Get coordinates
    const { offsetX, offsetY } = getCoordinates(e)

    ctx.lineTo(offsetX, offsetY)
    ctx.stroke()
    setHasSignature(true)
  }

  const stopDrawing = () => {
    if (!isDrawing || !ctx || !canvasRef.current) return

    setIsDrawing(false)
    ctx.closePath()

    // Save state to history
    const currentState = canvasRef.current.toDataURL()
    setHistory((prev) => [...prev, currentState])
  }

  // Get coordinates for both mouse and touch events
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { offsetX: 0, offsetY: 0 }

    if ("touches" in e) {
      // Touch event
      const rect = canvas.getBoundingClientRect()
      const touch = e.touches[0]
      return {
        offsetX: touch.clientX - rect.left,
        offsetY: touch.clientY - rect.top,
      }
    } else {
      // Mouse event
      return {
        offsetX: e.nativeEvent.offsetX,
        offsetY: e.nativeEvent.offsetY,
      }
    }
  }

  // Clear canvas
  const clearCanvas = () => {
    if (!ctx || !canvasRef.current) return

    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    setHasSignature(false)

    // Save cleared state to history
    const clearedState = canvasRef.current.toDataURL()
    setHistory((prev) => [...prev, clearedState])
  }

  // Undo last action
  const undoLastAction = () => {
    if (history.length <= 1 || !ctx || !canvasRef.current) return

    // Remove current state
    const newHistory = [...history]
    newHistory.pop()
    setHistory(newHistory)

    // Load previous state
    const previousState = newHistory[newHistory.length - 1]
    const img = new Image()
    img.src = previousState
    img.crossOrigin = "anonymous"
    img.onload = () => {
      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height)
      ctx.drawImage(img, 0, 0)
      setHasSignature(newHistory.length > 1)
    }
  }

  // Save signature
  const saveSignature = () => {
    if (!canvasRef.current) return

    const signatureDataUrl = canvasRef.current.toDataURL("image/png")
    onSave(signatureDataUrl)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="border-2 border-slate-200 rounded-lg overflow-hidden bg-white mb-4">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="touch-none cursor-crosshair"
        />
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={undoLastAction}
          disabled={history.length <= 1}
          className="flex items-center gap-1"
        >
          <Undo className="h-4 w-4" />
          Desfazer
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={clearCanvas}
          disabled={!hasSignature}
          className="flex items-center gap-1"
        >
          <Eraser className="h-4 w-4" />
          Limpar
        </Button>

        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={saveSignature}
          disabled={!hasSignature}
          className="flex items-center gap-1 bg-[#003366] hover:bg-[#002244]"
        >
          <Save className="h-4 w-4" />
          Salvar assinatura
        </Button>
      </div>
    </div>
  )
}
