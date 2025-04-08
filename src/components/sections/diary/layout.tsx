'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useClientOnly from '@/hooks/useClientOnly';
import FullHeightLayout from '../../layout/FullHeightLayout';
import '@/app/styles/DiaryPage.module.css';

interface OpenDiaryLayoutProps {
  leftPageContent: React.ReactNode;
  rightPageContent: React.ReactNode;
  prevHref: string;
  nextHref?: string;
  prevLabel?: string;
  nextLabel?: string;
  backgroundImage: string;
}

export default function OpenDiaryLayout({
  leftPageContent,
  rightPageContent,
  prevHref,
  nextHref,
  prevLabel = 'Previous Page',
  nextLabel = 'Next Page',
  backgroundImage,
}: OpenDiaryLayoutProps) {
  const router = useRouter();
  const { isMobile, isClient } = useClientOnly(1000);

  const [isAnimating, setIsAnimating] = useState(false);

  // This will be our “current frame index.”
  const [pageIndex, setPageIndex] = useState(0);
  const maxPageIndex = 18;

  /**
   * Animate turning the page, updating pageIndex from 0..18 or 18..0
   * and then navigate away.
   */
  const animateAndNavigate = (href: string, reverse: boolean = false) => {
    if (isAnimating) return;
    setIsAnimating(true);

    // If reversing, start at maxPageIndex and go down;
    // otherwise start at 0 and go up.
    if (reverse) setPageIndex(maxPageIndex);

    let index = reverse ? maxPageIndex : 0;

    // Give text some time to fade out (300 ms),
    // then animate frames every 50 ms (or 20 ms, as you had before).
    setTimeout(() => {
      const interval = setInterval(() => {
        setPageIndex(index);
        index += reverse ? -1 : 1;

        const done = reverse ? index < 0 : index > maxPageIndex;
        if (done) {
          clearInterval(interval);
          router.push(href);
        }
      }, 50); // Adjust to your taste (20ms might be too fast to see a crossfade)
    }, 300);
  };

  // Guard for mobile devices -> redirect
  useEffect(() => {
    if (isClient && isMobile) {
      router.push('/diary');
    }
  }, [isMobile, router, isClient]);

  // SSR guard
  if (!isClient) {
    return <div className="min-h-screen bg-[#D8B29A]" />;
  }

  if (isMobile) {
    return null; // We'll redirect in the effect above
  }

  return (
    <FullHeightLayout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#D8B29A] p-4">
        <div className="relative w-full max-w-5xl mx-auto">
          <div className="w-full aspect-[3/2] relative">
            {/* 
              Main diary background (static).
              When not animating, use the normal background image.
              When animating, you could swap to an "open" image if you wish.
            */}
            <Image
              src={!isAnimating ? backgroundImage : '/images/bookpages/open.png'}
              alt="Diary background"
              fill
              className="object-contain"
              priority
            />

            {/* 
              Our absolute overlay for text + frames 
            */}
            <div className="absolute flex overflow-hidden">
              {/* Left page content (fade out during animation) */}
              <div
                className="w-1/2 pt-28 pb-20 pl-12 flex flex-col"
                style={{
                  transition: 'opacity 0.3s ease',
                  // Using Number(...) trick sets opacity 1 or 0
                  opacity: Number(!isAnimating),
                }}
              >
                {leftPageContent}
              </div>

              {/* Right page content (fade out during animation) */}
              <div
                className="w-1/2 pt-28 pb-20 pr-12 flex flex-col"
                style={{
                  transition: 'opacity 0.3s ease',
                  opacity: Number(!isAnimating),
                }}
              >
                {rightPageContent}
              </div>

              {/* 
                RENDER ALL FRAMES AT ONCE so they are preloaded:
                - Each frame is absolutely positioned,
                - Only the current "pageIndex" frame is visible with opacity=1,
                  the others stay at 0.
                - The CSS transition on opacity does the crossfade.
              */}
              {Array.from({ length: maxPageIndex + 1 }, (_, i) => (
                <Image
                  key={i}
                  src={`/images/bookpages/${i}.png`}
                  alt={`Turning page ${i}`}
                  fill
                  className="pointer-events-none absolute top-[-20%] scale-x-110 scale-y-125"
                  style={{
                    transition: 'opacity 0.1s ease',
                    opacity: Number(isAnimating) && (i === pageIndex ? 1 : 0),
                  }}
                  priority
                />
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between w-full mt-4">
            <button
              onClick={() => animateAndNavigate(prevHref, true)}
              className="px-4 py-2 bg-amber-800 text-white rounded hover:bg-amber-700"
            >
              {prevLabel}
            </button>
            {nextHref && (
              <button
                onClick={() => animateAndNavigate(nextHref)}
                className="px-4 py-2 bg-amber-800 text-white rounded hover:bg-amber-700"
              >
                {nextLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </FullHeightLayout>
  );
}
