import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

export default function Button({ 
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  children,
  ...props 
}: ButtonProps) {
  const baseStyles = 'rounded-[39.5px] font-gloria transition-colors duration-200 inline-flex items-center justify-center'
  
  const variants = {
    primary: 'bg-[#b21414] text-white border border-black hover:bg-[#961212]',
    secondary: 'bg-[rgba(155,202,222,0.53)] border border-black hover:bg-[rgba(155,202,222,0.65)]',
    outline: 'bg-transparent border border-black hover:bg-gray-50'
  }

  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: 'px-6 py-3',
    lg: 'text-xl px-8 py-4'
  }

  return (
    <button 
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
