import Link from 'next/link'
import Image from 'next/image'
import ActiveCampaignLink from '@/components/fundraisers/navigation/ActiveCampaignLink'
import CompletedCampaignLink from '@/components/fundraisers/navigation/CompletedCampaignsLink'
import GeneralFundLink from '@/components/fundraisers/navigation/GeneralFundLink'
import { Facebook } from '@/components/socials/Facebook'
import { Instagram } from '@/components/socials/Instagram'
import { Linkedin } from '@/components/socials/Linkedin'
import { Youtube } from '@/components/socials/Youtube'
import { Whatsapp } from '@/components/socials/Whatsapp'

const aboutLinks = [
  { href: '/who-we-are', text: 'Who We Are' },
  { href: '/what-we-do', text: 'What We Do' },
  { href: '/philosophy', text: 'Our Philosophy' },
  { href: '/journey', text: 'Our Journey' },
]

const newsLinks = [
  { href: '/latest-news', text: 'Latest News' },
  { href: '/all-news', text: 'All News' },
  { href: '/mission-updates', text: 'Mission Updates' },
]

const diaryLinks = [
  { href: '/diary', text: 'The Diary' },
]

const socialLinks = [
  { href: 'https://facebook.com', component: Facebook, label: 'Facebook' },
  { href: 'https://linkedin.com', component: Linkedin, label: 'LinkedIn' },
  { href: 'https://whatsapp.com', component: Whatsapp, name: 'whatsapp', label: 'WhatsApp' },
  { href: 'https://instagram.com', component: Instagram, label: 'Instagram' },
  { href: 'https://youtube.com', component: Youtube, label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="relative py-12 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/footerImage.png"
          alt="Footer background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Tagline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-gloria text-[#7B79D8]">
            By Giving We Receive Much More
          </h2>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16">
          {/* About Us Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-gloria">About Us</h3>
            <nav className="space-y-2">
              {aboutLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="block text-lg font-gloria hover:underline"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>

          {/* Fundraisers Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-gloria">Fundraisers</h3>
            <nav className="space-y-2">
              <GeneralFundLink className="block text-lg font-gloria hover:underline" />
              <ActiveCampaignLink className="block text-lg font-gloria hover:underline" />
              <CompletedCampaignLink className="block text-lg font-gloria hover:underline" />
            </nav>
          </div>

          {/* News Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-gloria">Our News</h3>
            <nav className="space-y-2">
              {newsLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="block text-lg font-gloria hover:underline"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>

          {/* Diary Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-gloria">The Diary</h3>
            <nav className="space-y-2">
              {diaryLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="block text-lg font-gloria hover:underline"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-gloria">Contact Us</h3>
            
            {/* Social Media Icons */}
            <div className="flex flex-wrap gap-4 mt-6">
              {socialLinks.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href}
                  className="text-black hover:opacity-80 transition-opacity"
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  
                  <link.component size={36} />
                  
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-8">
          <Link 
            href="/donate" 
            className="inline-flex items-center justify-between bg-white rounded-full px-8 py-4 text-xl font-gloria text-black hover:shadow-lg transition-shadow"
          >
            Support the Cause
            <svg width="32" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-4">
              <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 12H4.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          
          <Link 
            href="/apply_to_teach" 
            className="inline-flex items-center justify-between bg-[#D8E6F9] rounded-full px-8 py-4 text-xl font-gloria text-black hover:shadow-lg transition-shadow"
          >
            Join As Teacher
            <svg width="32" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-4">
              <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 12H4.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          
          <Link 
            href="/register_school" 
            className="inline-flex items-center justify-between bg-[#D8D8F9] rounded-full px-8 py-4 text-xl font-gloria text-black hover:shadow-lg transition-shadow"
          >
            Join As School
            <svg width="32" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-4">
              <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 12H4.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        
        {/* Copyright */}
        <div className="text-sm text-gray-600">
          ©LEDU 2025. All rights reserved
        </div>
      </div>
    </footer>
  )
}