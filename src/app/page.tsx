'use client'
import { useState } from 'react'
import GuestLayout from '@/components/layout/GuestLayout'
import Hero from '@/components/sections/Hero'
import WhatWeDo from '@/components/sections/WhatWeDo'
import OurPhilosophy from '@/components/sections/OurPhilosophy'
import NewsletterSection from '@/components/sections/NewsletterSection'
import Modal from '@/components/shared/Modal'
import ScrollToTop from '@/components/shared/ScrollToTop'


export default function HomePage() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <GuestLayout>
      {/* Hero Section */}
      <Hero backgroundImage='/images/ropax1.png' />
      
      {/* What We Do Section */}
      <WhatWeDo onWatchVideo={() => setShowVideo(true)} />
      
      {/* Our Philosophy Section */}
      <OurPhilosophy />
      
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