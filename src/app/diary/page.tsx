'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import useClientOnly from '@/hooks/useClientOnly'
import FullHeightLayout from '@/components/layout/FullHeightLayout'

export default function DiaryPage() {
  const router = useRouter()
  // Use our custom hook with a custom breakpoint of 1000px
  const { isMobile } = useClientOnly(1000)

  const handleDiaryClick = () => {
    if (!isMobile) {
      // Navigate to first diary page
      router.push('/diary/sister_love')
    }
  }

  return (
    <FullHeightLayout>
      <div className="flex flex-col items-center justify-center h-screen w-full bg-[#D8B29A] relative overflow-hidden">
        {isMobile ? (
          <div className="text-center p-6 bg-white/80 rounded-lg shadow-lg max-w-md">
            <h2 className="text-2xl font-bold mb-4">Desktop Only Feature</h2>
            <p className="mb-4">The diary experience is optimized for desktop devices.</p>
            <p>Please visit this page on a larger screen to explore the diary.</p>
          </div>
        ) : (
          <div className="w-full h-screen relative cursor-pointer" onClick={handleDiaryClick}>
            <div className="relative w-full h-full">
              <Image 
                src="/images/diaryClosed.png" 
                alt="Closed Diary" 
                fill
                style={{ objectFit: 'contain' }}
                className="p-4"
                priority
              />
              <div className="absolute inset-0 flex flex-col p-8">
                {/* Celtic knot is part of the background image */}
                <div className="flex-1 mt-64 ml-16 md:mt-80 flex justify-center">
                  <h1 className="text-5xl md:text-6xl font-bold text-[#f5deb3] font-handwriting">the Diary</h1>
                </div>
                <div className="flex-1 flex flex-col ml-16 items-center  mb-16">
                  <p className="text-xl md:text-2xl text-[#f5deb3] font-handwriting">Lighting the Path</p>
                  <p className="text-xl md:text-2xl text-[#f5deb3] font-handwriting">Where Kindness Lives</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 w-full text-center">
              <p className="text-white text-lg bg-black/50 px-4 py-1 inline-block">Click to open</p>
            </div>
          </div>
        )}
      </div>
    </FullHeightLayout>
  )
}