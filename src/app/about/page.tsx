'use client';

import { useState } from 'react';
import Image from 'next/image';
import GuestLayout from '@/components/layout/GuestLayout';
import PageTitle from '@/components/shared/PageTitle';
import WhoWeAre from '@/components/sections/about/WhoWeAre';

import Prakash from '@/components/sections/about/Prakash';
import ScrollToTop from '@/components/shared/ScrollToTop';
import WhatWeDo from '@/components/sections/about/WhatWeDo';
import Modal from '@/components/shared/Modal';
import OurPhilosophy from '@/components/sections/about/OurPhilosophy';
import Beginnings from '@/components/sections/about/Begginings';
import ReadTheDiary from '@/components/sections/about/ReadTheDiary';

// Assets configuration
const VIDEO_ASSETS = {
  impactVideo: {
    videoUrl: '/path-to-video.mp4',
    thumbnailUrl: '/path-to-thumbnail.jpg',
  },
  rafaVideo: '/videos/rafaTeaches.MOV',
};

export default function AboutPage() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <GuestLayout>
      {/* Hero Section */}
      <div className="relative w-full aspect-[1/1] md:aspect-[16/9]">
        <Image
          src="/images/about-us-hero-adjusted-2.jpeg"
          alt="About Us Hero"
          fill
          className="object-cover object-bottom"
          priority
        />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/40" /> */}

        <div className="relative z-10 container mx-auto top-[6rem]">
          <PageTitle className="text-center text-white max-lg:text-[2rem]">About Us</PageTitle>
        </div>

        {/* Left part of U - purple/green lei */}
        <div className="absolute w-[100px] lg:w-[150px] top-[94%] lg:top-[88%] xl:top-[88%] left-[12%] lg:left-[55%]">
          <Image
            src="/images/flower2.png"
            alt="Purple and green lei"
            width={150}
            height={200}
            className="object-contain"
          />
        </div>

        {/* Right part of U - red/yellow lei */}
        <div className="absolute w-[130px] lg:w-[190px] top-[91%] md:top-[88%] lg:top-[87%] xl:top-[86%] left-[65%] lg:left-[72%]">
          <Image
            src="/images/flower1.png"
            alt="Red and yellow lei"
            width={190}
            height={250}
            className="object-contain"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="overflow-x-hidden">
        <WhoWeAre />
        <WhatWeDo onWatchVideo={() => setShowVideo(true)} />
        <OurPhilosophy />
        <Beginnings />
        <Prakash />
        <ReadTheDiary />
      </main>

      <ScrollToTop />

      {/* Video Modal */}
      <Modal show={showVideo} onClose={() => setShowVideo(false)}>
        <div className="bg-black p-4 rounded-lg">
          <video src={VIDEO_ASSETS.rafaVideo} controls className="w-full max-w-4xl mx-auto" />
        </div>
      </Modal>
    </GuestLayout>
  );
}
