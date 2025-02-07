import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/shared/Button'

interface HeroProps {
  backgroundImage: string
}

export default function Hero({ backgroundImage }: HeroProps) {
  return (
    <section className="relative h-[1024px] overflow-hidden bg-gradient-to-b from-[#cfe9ff] via-[rgba(207,233,255,0.5)] to-[rgba(255,217,179,0.5)]">
      <Image 
        src={backgroundImage} 
        alt="Hero Background" 
        fill
        className="object-cover"
        priority
      />
      
      <div className="relative pt-52 px-4">
        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto">
          <div className="absolute top-[235px] -left-[200px] w-[822px] h-[399px] rounded-[90px] bg-gradient-radial from-black/30 via-black/16 to-black/1" />
          
          <h1 className="relative text-8xl leading-[120px] text-white max-w-[541px] ml-10 font-gloria drop-shadow-xl">
            By Giving We Receive Much More
          </h1>
          
          {/* Info Box */}
          <div className="absolute top-66 left-[588px] w-[801px] backdrop-blur-md rounded-[50px] bg-[rgba(221,239,255,0.4)] border border-white/30 p-8 shadow-md">
            <h2 className="text-2xl text-white text-center font-gloria">What We Do</h2>
            <div className="h-px bg-white/50 my-4 max-w-xs mx-auto" />
            <p className="text-xl font-verdana max-w-[422px] mx-auto">
              We provide education to children in humanitarian crisis areas through online lessons tailored to their needs, 
              while also supporting their communities with resources like WiFi, books, and other.
            </p>
          </div>
          
          {/* CTA Button */}
          <div className="absolute top-[349px] right-[351px]">
            <Link href="/fundraisers" className="inline-block">
              <Button variant="primary" className="text-xl">
                Support the Cause
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}