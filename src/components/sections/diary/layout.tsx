'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useClientOnly from '@/hooks/useClientOnly';
import FullHeightLayout from '../../layout/FullHeightLayout';
import '@/app/styles/DiaryPage.module.css';
import DiarySisterLove from './diarySisterLove';

interface OpenDiaryLayoutProps {
  pageImage: React.ReactNode;
  prevHref: string;
  nextHref?: string;
  prevLabel?: string;
  prevLabel2_mobile?: string;
  nextLabel?: string;
  nextLabel2_mobile?: string;
  backgroundImage: string;
}

export default function OpenDiaryLayout({
  pageImage,
  prevHref,
  nextHref,
  prevLabel = 'Previous Page',
  prevLabel2_mobile = 'Previous Page',
  nextLabel = 'Next Page',
  nextLabel2_mobile = 'Next Page',
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
      <div className="flex flex-col items-center justify-center max-h-screen bg-[#D8B29A] p-4 overflow-x-visible">
        <div className={`relative ${isMobile ? 'w-screen overflow-hidden' : 'w-full max-w-5xl'}`}>
          {/* Maintain book's aspect ratio on all devices */}
          <div
            className={`mx-auto relative ${isMobile ? 'w-screen' : 'aspect-[3/2]'}`}
            style={{
              height: 'calc(100vh - 100px)', // leave space for buttons
            }}
          >
            {/* 🔁 Sliding container with background + content */}
            <div
              className={`absolute top-0 left-0 h-full flex transition-transform duration-500 ease-in-out ${
                isMobile && mobileViewStep === 1 ? '-translate-x-[100vw]' : 'translate-x-0'
              } ${isMobile ? 'w-[200vw]' : 'w-full'}`}
            >
              {/* 📚 Book background (stretch full size) */}
              <div
                className="absolute inset-0 z-0 w-full h-full"
                onClick={() => {
                  if (isAnimating) return;
                  if (isMobile) {
                    if (mobileViewStep === 0) {
                      setMobileViewStep(1); // show right page
                      return;
                    }
                  }
                  if (nextHref) animateAndNavigate(nextHref);
                }}
              >
                {!isAnimating ? (
                  pageImage
                ) : (
                  <Image
                    src="/images/bookpages/open.png"
                    alt="Diary background"
                    fill
                    className={isMobile ? 'object-cover' : 'object-contain'}
                    priority
                  />
                )}
              </div>

              {/* 🔄 Page turn frames (higher up, more visible) */}
              {Array.from({ length: maxPageIndex + 1 }, (_, i) => (
                <Image
                  key={i}
                  src={`/images/bookpages/${i}.png`}
                  alt={`Turning page ${i}`}
                  fill
                  className="pointer-events-none absolute scale-x-110 scale-y-125 object-contain z-20"
                  style={{
                    top: isMobile ? '-15%' : '-7%', // increase vertical offset on mobile
                    transition: 'opacity 0.1s ease',
                    opacity: Number(isAnimating) && (i === pageIndex ? 1 : 0),
                  }}
                  priority
                />
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between w-full mt-4 px-4">
            <button
              onClick={() => {
                if (isAnimating) return;
                if (isMobile) {
                  if (mobileViewStep === 1) {
                    setMobileViewStep(0); // go back to left page
                    return;
                  } else {
                    animateAndNavigate(prevHref, true);
                    return;
                  }
                }
                animateAndNavigate(prevHref, true);
              }}
              className="px-4 py-2 mb-8 bg-amber-800 text-white rounded hover:bg-amber-700"
            >
              {mobileViewStep === 0 ? prevLabel : prevLabel2_mobile}
            </button>

            {nextHref && (
              <button
                onClick={() => {
                  if (isAnimating) return;
                  if (isMobile) {
                    if (mobileViewStep === 0) {
                      setMobileViewStep(1); // show right page
                      return;
                    }
                  }
                  animateAndNavigate(nextHref);
                }}
                className="px-4 py-2 mb-8 bg-amber-800 text-white rounded hover:bg-amber-700"
              >
                {mobileViewStep === 0 ? nextLabel : nextLabel2_mobile}
              </button>
            )}
          </div>
        </div>
      </div>
    </FullHeightLayout>
  );
}
