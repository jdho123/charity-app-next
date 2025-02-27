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
          <header className="w-full relative pt-12 px-6 md:pt-16 md:px-12 lg:px-24">
            <div className="md:ml-10 lg:ml-16">
              <GloriaTitle 
                as="h1" 
                size="6xl"
                className="font-normal text-4xl md:text-5xl lg:text-6xl leading-tight"
              >
                Real Lives, Real Impact
              </GloriaTitle>
            </div>
          </header>

          {/* Mountain Drawings - Full Width */}
          <div className="relative w-full mt-24 md:mt-32 lg:mt-48">
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
          <div className="relative mx-auto mt-8 w-full max-w-[85%] md:max-w-[75%] lg:max-w-[856px]" style={{ height: '20vh' }}>
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