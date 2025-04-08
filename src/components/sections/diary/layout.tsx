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

  const [mobileViewStep, setMobileViewStep] = useState(0); // only used on mobile

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

    // // On mobile: first click slides to right page
    // if (isMobile && mobileViewStep === 0) {
    //   setMobileViewStep(1);
    //   return;
    // }

    // // On mobile: second click triggers animation and navigation
    // if (isMobile && mobileViewStep === 1) {
    //   setMobileViewStep(2); // freeze interaction
    // }

    setIsAnimating(true);
    if (reverse) setPageIndex(maxPageIndex);
    let index = reverse ? maxPageIndex : 0;

    setTimeout(() => {
      const interval = setInterval(() => {
        setPageIndex(index);
        index += reverse ? -1 : 1;

        if (reverse ? index < 0 : index > maxPageIndex) {
          clearInterval(interval);
          router.push(href);
        }
      }, 50);
    }, 300);
  };

  // Guard for mobile devices -> redirect
  // useEffect(() => {
  //   if (isClient && isMobile) {
  //     router.push('/diary');
  //   }
  // }, [isMobile, router, isClient]);

  // SSR guard
  if (!isClient) {
    return <div className="min-h-screen bg-[#D8B29A]" />;
  }

  // if (isMobile) {
  //   return null; // We'll redirect in the effect above
  // }

  return (
    <FullHeightLayout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#D8B29A] p-4">
        <div className="relative w-full max-w-5xl mx-auto">
          {/* Mobile crops only 1 page at a time */}
          <div
            className={`relative ${
              isMobile ? 'w-screen overflow-hidden h-[80vh]' : 'w-full aspect-[3/2]'
            }`}
          >
            {/* 👇 Sliding container holds EVERYTHING that should move (bg + text + frames) */}
            <div
              className={`absolute top-0 left-0 h-full flex transition-transform duration-500 ease-in-out ${
                isMobile && mobileViewStep === 1 ? '-translate-x-[100vw]' : 'translate-x-0'
              } ${isMobile ? 'w-[200vw]' : 'w-full'}`}
            >
              {/* ✅ Background image covers full 200vw area */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={!isAnimating ? backgroundImage : '/images/bookpages/open.png'}
                  alt="Diary background"
                  fill
                  className={isMobile ? 'object-cover' : 'object-contain'}
                  priority
                />
              </div>

              {/* ✅ Text + overlay content (aligned with background) */}
              <div className={`relative z-10 flex ${isMobile ? 'w-[200vw]' : 'w-full'}`}>
                {/* LEFT PAGE */}
                <div
                  className={`${isMobile ? 'w-screen' : 'w-1/2'} ${
                    isMobile ? 'pt-16 pb-16 px-6' : 'pt-28 pb-20 pl-12'
                  } flex flex-col justify-start`}
                  style={{
                    transition: 'opacity 0.3s ease',
                    opacity: Number(!isAnimating),
                  }}
                >
                  {leftPageContent}
                </div>

                {/* RIGHT PAGE */}
                <div
                  className={`${isMobile ? 'w-screen' : 'w-1/2'} ${
                    isMobile ? 'pt-16 pb-16 px-6' : 'pt-28 pb-20 pr-12'
                  } flex flex-col justify-start`}
                  style={{
                    transition: 'opacity 0.3s ease',
                    opacity: Number(!isAnimating),
                  }}
                >
                  {rightPageContent}
                </div>
              </div>

              {/* ✅ Animated page-turn frames (overlayed at highest z-index) */}
              {Array.from({ length: maxPageIndex + 1 }, (_, i) => (
                <Image
                  key={i}
                  src={`/images/bookpages/${i}.png`}
                  alt={`Turning page ${i}`}
                  fill
                  className="pointer-events-none absolute top-[-20%] scale-x-110 scale-y-125 object-contain z-20"
                  style={{
                    transition: 'opacity 0.1s ease',
                    opacity: Number(isAnimating) && (i === pageIndex ? 1 : 0),
                  }}
                  priority
                />
              ))}
            </div>
          </div>

          {/* NAVIGATION BUTTONS */}
          <div className="flex justify-between w-full mt-4">
            <button
              onClick={() => {
                if (isAnimating) return;
                if (isMobile) {
                  if (mobileViewStep === 1) {
                    // From right page → back to left
                    setMobileViewStep(0);
                    return;
                  } else {
                    // On left page → animate reverse
                    animateAndNavigate(prevHref, true);
                    return;
                  }
                }
                animateAndNavigate(prevHref, true);
              }}
              className="px-4 py-2 bg-amber-800 text-white rounded hover:bg-amber-700"
            >
              {prevLabel}
            </button>

            {nextHref && (
              <button
                onClick={() => {
                  if (isAnimating) return;
                  if (isMobile) {
                    if (mobileViewStep === 0) {
                      // From left page → go to right
                      setMobileViewStep(1);
                      return;
                    }
                    // From right page → animate forward
                  }
                  animateAndNavigate(nextHref);
                }}
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
