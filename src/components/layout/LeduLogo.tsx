'use client'
import Link from 'next/link'
import Image from 'next/image'
import useClientOnly from '@/hooks/useClientOnly'

interface LeduLogoProps {
  href?: string;
}

export default function LeduLogo({ href = "/" }: LeduLogoProps) {
  // Use our custom hook instead of useState + useEffect
  const { isMobile } = useClientOnly(768)
  
  // Responsive dimensions
  const containerClass = isMobile 
    ? "relative w-[120px] h-[117px] text-[28px]"
    : "relative w-[193px] h-[189px] text-[40px]";
    
  const circleClass = isMobile
    ? "absolute top-[20px] left-[27px] rounded-full bg-gradient-radial from-white via-white/60 to-white/30 w-[68px] h-[68px]"
    : "absolute top-[33px] left-[45px] rounded-full bg-gradient-radial from-white via-white/60 to-white/30 w-[107px] h-[105px]";
    
  const textClass = isMobile
    ? "absolute top-[30px] left-[33px] font-gloria"
    : "absolute top-[46px] left-[52px] font-gloria";

  return (
    <div className={containerClass}>
      <Link href={href}>
        <div className="relative w-full h-full">
          <Image 
            src="/images/worldMini2.png"
            alt="LEDU Logo"
            fill
            priority
            className="object-cover"
          />
          <div className={circleClass} />
          <div className={textClass}>LEDÚ</div>
        </div>
      </Link>
    </div>
  )
}