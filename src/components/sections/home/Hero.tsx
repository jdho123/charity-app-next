
import Image from 'next/image'
import WhatWeDo from './hero/WhatWeDo'

interface HeroProps {
  backgroundImage: string
}

export default function Hero({ backgroundImage }: HeroProps) {
  return (
    <section className="relative h-[1024px] overflow-hidden bg-sky-300">
      {/* Background Image with Wavy Border */}
      <div className="relative h-full w-full">
        <Image 
          src={backgroundImage} 
          alt="Hero Background" 
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
      
      {/* Main Heading - centered in the sky blue wave area */}
      <div className="absolute top-0 left-0 w-full pt-20 text-center z-10">
        <h1 className="text-5xl md:text-6xl font-gloria text-white">
          By Giving We Receive Much More
        </h1>
      </div>
      
      {/* "What We Do" Box */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     max-w-4xl w-full mx-4 z-10 rounded-[50px] backdrop-blur-md 
                     bg-white/30 border border-white/30 p-8 shadow-md">
        <WhatWeDo />
      </div>
    </section>
  )
}