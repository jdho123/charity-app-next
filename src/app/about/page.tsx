'use client'

import { useState } from 'react'
import Image from 'next/image'
import GuestLayout from '@/components/layout/GuestLayout'
import PageTitle from '@/components/shared/PageTitle'
import WhoWeAre from '@/components/sections/about/WhoWeAre'

import Prakash from '@/components/sections/about/Prakash'
import ScrollToTop from '@/components/shared/ScrollToTop'
import WhatWeDo from '@/components/sections/about/WhatWeDo'
import Modal from '@/components/shared/Modal'
import OurPhilosophy from '@/components/sections/about/OurPhilosophy'
import Beginnings from '@/components/sections/about/Begginings'
import ReadTheDiary from '@/components/sections/about/ReadTheDiary'

// Assets configuration
const VIDEO_ASSETS = {
  impactVideo: {
    videoUrl: '/path-to-video.mp4',
    thumbnailUrl: '/path-to-thumbnail.jpg'
  },
  rafaVideo: '/videos/rafaTeaches.MOV'
}

export default function AboutPage() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <GuestLayout>
      {/* Hero Section */}
      <div className="relative w-full h-[80vh]">
        <Image 
          src="/images/about-us-hero.jpeg" 
          alt="About Us Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/40" />
        
        <div className="relative z-10 container mx-auto px-4 pt-52">
          <PageTitle className="text-center text-white">About Us</PageTitle>
        </div>
      </div>

      {/* Main Content */}
      <main>
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
          <video 
            src={VIDEO_ASSETS.rafaVideo} 
            controls 
            className="w-full max-w-4xl mx-auto"
          />
        </div>
      </Modal>
    </GuestLayout>
  );
}