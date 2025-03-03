'use client'
import Image from 'next/image'
import Link from 'next/link'
import FullHeightLayout from '@/components/layout/FullHeightLayout'

interface ThankYouPageProps {
  backgroundColor?: string;
  title?: string;
  subtitle?: string;
}

export default function ThankYouPage({
  backgroundColor = 'linear-gradient(180deg, #3D1809 0%, #6F4433 100%)',
  title = 'Thank You for Your Application!',
  subtitle = 'We Will Contact You Soon'
}: ThankYouPageProps) {
  return (
    <FullHeightLayout>
      <div 
        className="min-h-screen w-full flex flex-col items-center justify-between py-12 md:py-16 px-4"
        style={{ background: backgroundColor }}
      >
        {/* Thank you message */}
        <div className="flex-1 flex flex-col items-center justify-center text-center py-16 md:py-0">
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-gloria mb-4">{title}</h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-gloria">{subtitle}</h2>
        </div>
        
        {/* Navigation buttons */}
        <div className="w-full max-w-5xl flex flex-col md:flex-row justify-center items-center gap-8 mt-8 md:mt-12">
          {/* Main page button */}
          <div className="w-full md:w-1/2 max-w-lg bg-blue-100 rounded-3xl p-4 md:p-6 flex flex-col items-center">
            <div className="mb-4 w-full h-40 md:h-60 relative">
              <Image 
                src="/images/bigWorldFull.png" 
                alt="World" 
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <Link href="/">
              <button className="bg-white border-2 border-black rounded-full px-4 sm:px-6 py-3 text-lg sm:text-xl font-gloria w-full">
                Go Back to the Main Page
              </button>
            </Link>
          </div>
          
          {/* Newsletter button */}
          <div className="w-full md:w-1/2 max-w-lg bg-purple-200 rounded-3xl p-4 md:p-6 flex flex-col items-center">
            <div className="mb-4 w-full h-40 md:h-60 relative">
              <Image 
                src="/images/sunnyDayGroupPhoto.jpeg" 
                alt="Group Photo" 
                fill
                style={{ objectFit: 'cover', borderRadius: '1rem' }}
              />
            </div>
            <Link href="/newsletter">
              <button className="bg-white border-2 border-black rounded-full px-4 sm:px-6 py-3 text-lg sm:text-xl font-gloria w-full">
                Explore Our Latest News
              </button>
            </Link>
          </div>
        </div>
      </div>
    </FullHeightLayout>
  );
}