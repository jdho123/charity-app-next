'use client'
import { useState } from 'react'
import GuestLayout from '@/components/layout/GuestLayout'
import Hero from '@/components/sections/home/Hero'
import ScrollToTop from '@/components/shared/ScrollToTop'
import Philosophy from '@/components/sections/home/Philosophy'
import KidsStories from '@/components/sections/home/KidsStories'
import HowWeTeach from '@/components/sections/home/HowWeTeach'
import Goals from '@/components/sections/home/Goals'
import Newsletter from '@/components/sections/home/Newsletter'


export default function HomePage() {

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
      
      
      
      <ScrollToTop />
    </GuestLayout>
  )
}