"use client"

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
  confirmButtonColor = "#319F43",
  cancelButtonColor = "#003366",
}: ConfirmationDialogProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-[70] p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden border border-gray-200">
        <div className="bg-[#003366] text-white p-4 relative">
          <h2 className="text-xl font-bold text-center">{title}</h2>
          <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">
          <p className="text-gray-700 mb-4">{message}</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors font-medium"
              style={{ backgroundColor: cancelButtonColor, color: "white" }}
            >
              {cancelButtonText}
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors font-medium"
              style={{ backgroundColor: confirmButtonColor, color: "white" }}
            >
              {confirmButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
