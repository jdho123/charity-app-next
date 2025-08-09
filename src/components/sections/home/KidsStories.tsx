'use client';

import Image from 'next/image';
import React from 'react';
import DiarySection from './kid_stories/DiarySection';
import GloriaTitle from '@/components/shared/GloriaTitle';

import '@/app/styles/HoverImages.css';
import Link from 'next/link';

const KidsStories: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white w-full max-lg:border max-lg:rounded-[4rem]">
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
          <div className="relative w-full">
            <Image
              src="/images/mountainDrawings.png"
              alt="Mountain drawing"
              width={1200}
              height={300}
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
          <div className="relative w-full">
            {/* 5 transparent overlays for hover detection (each 20% wide) */}
            <Link
              href="/diary/sister_love"
              className="hoversection s1 absolute top-0 left-[10%] w-[10%] h-full"
            />
            <Link
              href="/diary/not_forgotten"
              className="hoversection s2 absolute top-0 left-[30%] w-[10%] h-full"
            />
            <Link
              href="/diary/transformation"
              className="hoversection s3 absolute top-0 left-[40%] w-[10%] h-full"
            />
            <Link
              href="/diary/seven_oranges"
              className="hoversection s4 absolute top-0 left-[50%] w-[10%] h-full"
            />
            <Link
              href="/diary/light_of_christmas"
              className="hoversection s5 absolute top-0 left-[60%] w-[20%] h-full"
            />

            {/* Default image (visible initially) */}
            <Image
              src="/images/kids/default.png"
              alt="Kids holding hands"
              width={1200}
              height={300}
              className="defaultBg w-full h-auto transition-opacity duration-300 ease-in-out"
            />

            {/* Hover images: each starts hidden, absolute stacked, same styling */}
            <Image
              src="/images/kids/0_aligned.png"
              alt="Kids holding hands - 0 aligned"
              width={1200}
              height={300}
              className="aligned0 absolute top-0 left-0 w-full h-auto transition-opacity duration-300 ease-in-out opacity-0"
            />
            <Image
              src="/images/kids/1_aligned.png"
              alt="Kids holding hands - 1 aligned"
              width={1200}
              height={300}
              className="aligned1 absolute top-0 left-0 w-full h-auto transition-opacity duration-300 ease-in-out opacity-0"
            />
            <Image
              src="/images/kids/2_aligned.png"
              alt="Kids holding hands - 2 aligned"
              width={1200}
              height={300}
              className="aligned2 absolute top-0 left-0 w-full h-auto transition-opacity duration-300 ease-in-out opacity-0"
            />
            <Image
              src="/images/kids/3_aligned.png"
              alt="Kids holding hands - 3 aligned"
              width={1200}
              height={300}
              className="aligned3 absolute top-0 left-0 w-full h-auto transition-opacity duration-300 ease-in-out opacity-0"
            />
            <Image
              src="/images/kids/4_aligned.png"
              alt="Kids holding hands - 4 aligned"
              width={1200}
              height={300}
              className="aligned4 absolute top-0 left-0 w-full h-auto transition-opacity duration-300 ease-in-out opacity-0"
            />
          </div>

          {/* Story Content - Centered */}
          <div
            className="relative mx-auto mt-8 w-full max-w-[85%] md:max-w-[75%] lg:max-w-[856px]"
            style={{ height: '20vh' }}
          >
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
