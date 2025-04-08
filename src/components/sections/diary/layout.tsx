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
  // useEffect(() => {
  //   [...Array(19).keys()].forEach((i) => {
  //     const img = new window.Image();
  //     img.src = `/images/bookpages/${i}.png`; // Browsers will fetch & cache
  //   });
  // }, []);

  const router = useRouter();
  // Use our custom hook with a custom breakpoint of 1000px
  const { isMobile, isClient } = useClientOnly(1000);

  const [isAnimating, setIsAnimating] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  const maxPageIndex = 18;

  const animateAndNavigate = (href: string, reverse: boolean = false) => {
    if (isAnimating) return;

    setIsAnimating(true);

    if (reverse) setPageIndex(maxPageIndex);
    let index = reverse ? maxPageIndex : 0;

    setTimeout(() => {
      const interval = setInterval(() => {
        setPageIndex(index);
        index += reverse ? -1 : 1;
        //setPageIndex((prev) => prev + (reverse ? -1 : 1));
        if (reverse ? index <= 0 : index >= maxPageIndex) {
          clearInterval(interval);
          router.push(href);
        }
      }, 20); // Adjust timing for how fast you want each frame
    }, 300); // Matches CSS fade-out duration
  };

  useEffect(() => {
    // Only redirect if we're on the client AND it's a mobile device
    if (isClient && isMobile) {
      router.push('/diary');
    }
  }, [isMobile, router, isClient]);

  // Show loading or nothing during SSR
  if (!isClient) {
    return <div className="min-h-screen bg-[#D8B29A]"></div>;
  }

  if (isMobile) {
    return null; // Will redirect via useEffect
  }

  return (
    <FullHeightLayout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#D8B29A] p-4">
        {/* Open Diary Layout with background image */}
        <div className="relative w-full max-w-5xl mx-auto">
          <div className="w-full aspect-[3/2] relative">
            {/* Background diary image */}
            <Image
              src={!isAnimating ? backgroundImage : '/images/bookpages/open.png'}
              alt="Diary background"
              fill
              className="object-contain"
              priority
            />

            {/* Content overlay - positioned to match the diary pages */}
            <div className="absolute inset-0 flex">
              <div
                className="w-1/2 pt-28 pb-20 pl-12 flex flex-col"
                style={{ transition: 'opacity 0.3s ease', opacity: Number(!isAnimating) }}
              >
                {leftPageContent}
              </div>
              <div
                className="w-1/2 pt-28 pb-20 pr-12 flex flex-col"
                style={{ transition: 'opacity 0.3s ease', opacity: Number(!isAnimating) }}
              >
                {rightPageContent}
              </div>
              <Image
                src={`/images/bookpages/${pageIndex}.png`}
                key={pageIndex}
                alt="Turning page"
                fill
                className="object-contain"
                style={{ transition: 'opacity 0.3s ease', opacity: Number(isAnimating) }}
                priority
              />
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
