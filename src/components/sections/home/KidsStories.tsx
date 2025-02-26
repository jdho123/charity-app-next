'use client';

import Image from 'next/image';
import React from 'react';
import DiarySection from './kid_stories/DiarySection';
import GloriaTitle from '@/components/shared/GloriaTitle';

const KidsStories: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white w-full">
      <div className="flex relative flex-col w-full">
        {/* Background Image */}
        <div className="absolute inset-0 h-full w-full">
          <Image
            src="/images/mountainSunriseStoryBackground.jpeg"
            alt="Background image"
            fill
            priority
            className="object-cover w-full h-full"
          />
        </div>

        <div className="relative z-10 flex flex-col w-full min-h-screen">
          {/* Header Section */}
          <header className="w-full relative">
            <div className="absolute" style={{ width: '760px', height: '127px', top: '50px', left: '122px' }}>
              <GloriaTitle 
                as="h1" 
                size="6xl"
                className="font-normal leading-[126.88px] tracking-normal text-[64px]"
              >
                Real Lives, Real Impact
              </GloriaTitle>
            </div>
          </header>

          {/* Mountain Drawings - Full Width */}
          <div className="relative w-full mt-48">
            <Image
              src="/images/mountainDrawings.png"
              alt="Mountain drawing"
              width={1200}
              height={300}
              style={{
                width: '100%',
                height: 'auto'
              }}
            />
          </div>

          {/* Kids Holding Hands Drawing - Full Width */}
          <div className="relative w-full">
            <Image
              src="/images/kidsHoldingHandsDrawing.png"
              alt="Kids holding hands"
              width={1200}
              height={300}
              style={{
                width: '100%',
                height: 'auto'
              }}
            />
          </div>

          {/* Story Content - Centered */}
          <div className="relative self-center mt-8 w-full max-w-[856px]" style={{ height: '20vh' }}>
            <Image
              src="/images/weWillMissYouThisMuch.png" 
              alt="We will miss you this much"
              fill
              className="object-contain"
            />
          </div>

          {/* Diary Section Component */}
          <DiarySection />
        </div>
      </div>
    </section>
  );
};

export default KidsStories;