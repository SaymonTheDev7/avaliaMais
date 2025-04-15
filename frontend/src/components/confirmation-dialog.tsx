"use client"

import { XCircle } from "lucide-react"

type ConfirmationDialogProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmButtonText: string
  cancelButtonText: string
  confirmButtonColor?: string
  cancelButtonColor?: string
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonText,
  cancelButtonText,
  confirmButtonColor = "#F13F00", // Red by default for destructive actions
  cancelButtonColor = "#003366", // Blue by default
}: ConfirmationDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[200]">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative z-10 mx-4">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
          <XCircle className="h-5 w-5" />
        </button>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors text-white`}
            style={{ backgroundColor: cancelButtonColor }}
          >
            {cancelButtonText}
          </button>
          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className={`px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors text-white`}
            style={{ backgroundColor: confirmButtonColor }}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  )
}
