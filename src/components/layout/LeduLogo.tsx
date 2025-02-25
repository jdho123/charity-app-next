import Link from 'next/link'
import Image from 'next/image'

interface LeduLogoProps {
  href?: string;
}

export default function LeduLogo({ href = "/" }: LeduLogoProps) {
  return (
    <div className="relative w-[193px] h-[189px] text-[40px]">
      <Link href={href}>
        <div className="relative w-full h-full">
          <Image 
            src="/images/worldMini2.png"
            alt="LEDU Logo"
            fill
            className="object-cover"
          />
          <div className="absolute top-[33px] left-[45px] rounded-full bg-gradient-radial from-white via-white/60 to-white/30 w-[107px] h-[105px]" />
          <div className="absolute top-[46px] left-[52px] font-gloria">LEDÚ</div>
        </div>
      </Link>
    </div>
  )
}