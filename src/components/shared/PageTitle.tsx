interface PageTitleProps {
    color?: 'default' | 'blue' | 'orange' | 'green'
    children: React.ReactNode
    className?: string;
  }
  
  export default function PageTitle({ 
    color = 'default',
    children,
    className
  }: PageTitleProps) {
    const colors = {
      default: 'text-black',
      blue: 'text-[#0E26A5]',
      orange: 'text-[#DB6B24]',
      green: 'text-[#3E6F1B]'
    }
  
    return (
      <h1 className={`text-6xl font-gloria leading-tight ${colors[color]} ${className}`}>
        {children}
      </h1>
    )
  }