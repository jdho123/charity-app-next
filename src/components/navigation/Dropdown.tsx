import { useState, useRef, useEffect } from 'react'

interface DropdownProps {
  align?: 'left' | 'right'
  width?: '48' | string
  contentClasses?: string
  trigger: React.ReactNode
  children: React.ReactNode
}

export default function Dropdown({
  align = 'right',
  width = '48',
  contentClasses = 'py-1 bg-white',
  trigger,
  children
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const widthClass = {
    '48': 'w-48',
  }[width]

  const alignmentClasses = {
    left: 'origin-top-left left-0',
    right: 'origin-top-right right-0',
  }[align]

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setOpen(!open)}>
        {trigger}
      </div>

      {/* Full Screen Dropdown Overlay */}
      {open && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setOpen(false)}
        />
      )}

      {/* Dropdown Content */}
      <div
        className={`
          absolute z-50 mt-2 rounded-md shadow-lg 
          ${widthClass} 
          ${alignmentClasses}
          transform transition-all duration-200
          ${open 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95 pointer-events-none'
          }
        `}
      >
        <div className={`rounded-md ring-1 ring-black ring-opacity-5 ${contentClasses}`}>
          {children}
        </div>
      </div>
    </div>
  )
}