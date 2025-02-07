import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <nav className="relative w-full py-3 flex items-center">
      <div className="relative w-[193px] h-[189px] text-[40px]">
        <Link href="/">
          <div className="relative w-full h-full">
            <Image 
              src="/images/worldMini2.png"
              alt="LEDU Logo"
              fill
              className="object-cover"
            />
            <div className="absolute top-[33px] left-[45px] rounded-full bg-gradient-radial from-white via-white/60 to-white/30 w-[107px] h-[105px]" />
            <div className="absolute top-[46px] left-[52px] font-gloria">LEDU</div>
          </div>
        </Link>
      </div>

      <div className="flex gap-8 ml-8">
        <Link className="text-2xl text-black no-underline font-gloria hover:underline" href="/about">About Us</Link>
        <Link className="text-2xl text-black no-underline font-gloria hover:underline" href="/fundraisers">Fundraisers</Link>
        <Link className="text-2xl text-black no-underline font-gloria hover:underline" href="/diary">the Diary</Link>
        <Link className="text-2xl text-black no-underline font-gloria hover:underline" href="/news">Our News</Link>
        <Link className="text-2xl text-black no-underline font-gloria hover:underline" href="/contact">Contact Us</Link>
      </div>
    </nav>
  )
}