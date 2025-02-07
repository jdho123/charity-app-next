import { useEffect } from 'react'

interface ModalProps {
  show: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({ show, onClose, children }: ModalProps) {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [show])

  if (!show) return null

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />

      {/* Modal Content */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className="relative max-w-6xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className="absolute -top-12 right-0 text-white hover:text-gray-300 focus:outline-none"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg 
              className="h-8 w-8" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>

          {/* Content */}
          <div className="relative">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}