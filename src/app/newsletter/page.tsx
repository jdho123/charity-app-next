import type { Metadata } from 'next'
import GuestLayout from '@/components/layout/GuestLayout'
import ScrollToTop from '@/components/shared/ScrollToTop'
import NewsletterSection from '@/components/sections/home/Newsletter'

export const metadata: Metadata = {
  title: 'Newsletter - LEDU',
}


export default function NewsletterPage() {
  return (
    <GuestLayout>
      <div className="bg-[#4B7277] min-h-screen">
        <NewsletterSection />
      </div>
      
      <ScrollToTop />
    </GuestLayout>
  )
}