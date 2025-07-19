import * as React from 'react';
import Image from 'next/image';
import { RoundedImage } from '../../../shared/RoundedImage';
import BorderedText from '@/components/shared/BorderedText';
import GloriaTitle from '@/components/shared/GloriaTitle';
import Sprite from '@/components/animation/Sprite';
import PageTitle from '@/components/shared/PageTitle';

export function ConnectSection() {
  return (
    <>
      {/* Hero Connect Section - Fixed medium screen overlapping */}
      <div className="relative w-full max-w-[1138px] mb-12 px-4 sm:px-6">
        <div className="lg:hidden">
          <PageTitle className="max-lg:text-4xl text-black text-center whitespace-nowrap min-w-0 my-20">
            How We Teach: <br /> Our Approach
          </PageTitle>
        </div>
        {/* Changed to stack vertically until lg breakpoint (1024px) */}
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Left column - Icon and titles */}
          <div className="w-full lg:w-[45%]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                <Image
                  src="/images/greenHandshake.png"
                  alt="Connect icon"
                  width={110}
                  height={110}
                  className="object-contain w-20 h-20 sm:w-28 sm:h-28 md:w-[110px] md:h-[110px]"
                />
                <div className="flex flex-col">
                  <GloriaTitle
                    as="h2"
                    color="black"
                    size="6xl"
                    className="mb-1 text-4xl sm:text-5xl md:text-6xl"
                  >
                    Connect
                  </GloriaTitle>
                  <p className="text-xl sm:text-2xl font-gloria text-black leading-tight">
                    How do we create connections that inspire children?
                  </p>
                </div>
              </div>

              {/* Arrow only shows on large screens */}
              <Image
                src="/images/rightArrowTeach.png"
                alt="Connect illustration"
                width={180}
                height={40}
                className="ml-auto mr-4 sm:mr-20 mb-6 sm:mb-10 hidden lg:block"
              />

              <RoundedImage
                src="/images/whatWeDoVideo.png"
                alt="Children connecting with teachers"
                className="w-full aspect-[1.65] mt-4"
                width={550}
                height={333}
              />
            </div>
          </div>

          {/* Right column - Quote and description */}
          <div className="w-full lg:w-[45%] flex flex-col mt-8 lg:mt-10">
            <div className="relative">
              <Image
                src="/images/greenQuotes.png"
                alt="Quote"
                width={80}
                height={60}
                className="absolute -top-6 -left-4 sm:-top-10 sm:-left-10 opacity-30 w-16 h-12 sm:w-20 sm:h-16"
              />
              <div className="pl-4 border-l-4 border-[#3E6F1B] font-urbanist">
                <p className="text-base sm:text-lg md:text-xl text-black mb-4 sm:mb-6">
                  We show children that someone outside their community truly cares about them.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-black mb-4 sm:mb-6">
                  This connection sparks a sense of belonging and hope, encouraging them to dream of
                  a better future.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-black">
                  By bridging the gap between children and teachers from different parts of the
                  world, we prove that care knows no boundaries.
                </p>
              </div>
            </div>

            <Sprite
              totalFrames={24}
              frameWidth={500}
              frameHeight={500}
              scale={0.6}
              className="ml-auto mt-12 max-w-[80%]"
              imagePath="/animated/arrow1smooth.png"
            />
          </div>
        </div>
      </div>

      {/* Teach Section Title - Improved medium screen responsiveness */}
      <div className="w-full max-w-[1138px] mt-0 mb-10 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <Image
            src="/images/greenComputer.png"
            alt="Teach icon"
            width={120}
            height={100}
            className="object-contain w-20 h-16 sm:w-24 sm:h-20 md:w-[120px] md:h-[100px]"
          />
          <div className="flex flex-col">
            <GloriaTitle
              as="h2"
              color="black"
              size="6xl"
              className="mb-1 text-4xl sm:text-5xl md:text-6xl"
            >
              Teach
            </GloriaTitle>
            <p className="text-xl sm:text-2xl font-gloria text-black leading-tight">
              What makes our lessons unforgettable?
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
