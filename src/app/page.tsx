'use client'
import { useState } from 'react'
import GuestLayout from '@/components/layout/GuestLayout'
import Hero from '@/components/sections/home/Hero'
import WhatWeDo from '@/components/sections/WhatWeDo'
import NewsletterSection from '@/components/sections/NewsletterSection'
import Modal from '@/components/shared/Modal'
import ScrollToTop from '@/components/shared/ScrollToTop'
import Philosophy from '@/components/sections/home/Philosophy'


export default function HomePage() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <GuestLayout>
      {/* Hero Section */}
      <Hero backgroundImage='/images/heroBackgroundMain.png' />
      
      {/* Our Philosophy Section */}
      <Philosophy />

      {/* What We Do Section */}
      <WhatWeDo onWatchVideo={() => setShowVideo(true)} />
      
      {/* Newsletter Section */}
      <NewsletterSection />
      
      {/* Video Modal */}
      <Modal show={showVideo} onClose={() => setShowVideo(false)}>
        <div className="bg-black p-4 rounded-lg">
          <video 
            src="/images/our-mission.mp4" 
            controls 
            className="w-full max-w-4xl mx-auto"
          />
        </div>
      </Modal>
      
      <ScrollToTop />
    </GuestLayout>
  )
}