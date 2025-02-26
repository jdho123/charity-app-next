'use client'
import { useState } from 'react'
import GuestLayout from '@/components/layout/GuestLayout'
import Hero from '@/components/sections/home/Hero'
import Modal from '@/components/shared/Modal'
import ScrollToTop from '@/components/shared/ScrollToTop'
import Philosophy from '@/components/sections/home/Philosophy'
import KidsStories from '@/components/sections/home/KidsStories'
import HowWeTeach from '@/components/sections/home/HowWeTeach'
import Goals from '@/components/sections/home/Goals'
import Newsletter from '@/components/sections/home/Newsletter'


export default function HomePage() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <GuestLayout>
      {/* Hero Section */}
      <Hero backgroundImage='/images/heroBackgroundMain.png' />
      
      {/* Our Philosophy Section */}
      <Philosophy />

      {/* Kid Stories Section */}
      <KidsStories />

      {/* How We Teach Section */}
      <HowWeTeach />

      {/* Gaols Section */}
      <Goals/>
      
      {/* Newsletter Section */}
      <Newsletter />
      
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