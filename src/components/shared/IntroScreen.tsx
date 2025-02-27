'use client'
import { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FullHeightLayout from '@/components/layout/FullHeightLayout'

interface IntroScreenProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink: string;
  imageSrc: string;
  imageAlt: string;
  backgroundColor?: string;
  imageWidth?: number;
  imageHeight?: number;
  rightSideContent?: boolean;
}

export default function IntroScreen({
  title,
  description,
  buttonText = 'Complete the Survey',
  buttonLink,
  imageSrc,
  imageAlt,
  backgroundColor = 'white',
  imageWidth = 500,
  imageHeight = 600,
  rightSideContent = true
}: IntroScreenProps) {
  return (
    <FullHeightLayout>
      <div 
        className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-x-hidden"
        style={{ background: backgroundColor }}
      >
        <div className={`w-full max-w-6xl flex flex-col ${rightSideContent ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 md:gap-12 py-16 md:py-0`}>
          {/* Image section - larger and overflowing to the left */}
          <div className={`w-full md:w-1/2 ${rightSideContent ? 'md:-ml-24' : 'md:-mr-24 order-first md:order-none'} relative z-0`}>
            <div className="relative mx-auto" style={{ 
              width: '100%', 
              maxWidth: `${imageWidth * 1.4}px`,
              height: `min(${imageHeight}px, 70vh)`,
              minHeight: '300px'
            }}>
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
          
          {/* Content section */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left relative z-10 px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-gloria mb-4 md:mb-6 text-white">{title}</h1>
            <p className="text-base sm:text-lg md:text-xl max-w-xl mb-8 md:mb-12 text-white">
              {description}
            </p>
            <Link href={buttonLink}>
              <button className="bg-white border-2 border-black rounded-full px-8 py-3 md:px-12 md:py-4 text-lg md:text-xl font-gloria
                          hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                {buttonText}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </FullHeightLayout>
  );
}