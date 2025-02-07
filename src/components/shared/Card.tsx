interface CardProps {
    variant?: 'primary' | 'secondary' | 'blue'
    children: React.ReactNode
    header?: React.ReactNode
    footer?: React.ReactNode
    className?: string
  }
  
  export default function Card({ 
    variant = 'primary',
    children,
    header,
    footer,
    className
  }: CardProps) {
    const variants = {
      primary: 'bg-white',
      secondary: 'bg-[rgba(221,239,255,0.4)] backdrop-blur-md border border-white/30',
      blue: 'bg-[#E7F8FF]'
    }
  
    return (
      <div className={`rounded-[50px] overflow-hidden shadow-sm ${variants[variant]} ${className}`}>
        {header && (
          <div className="px-6 py-4 border-b border-gray-200">
            {header}
          </div>
        )}
        
        <div className="p-6">
          {children}
        </div>
        
        {footer && (
          <div className="px-6 py-4 border-t border-gray-200">
            {footer}
          </div>
        )}
      </div>
    )
  }