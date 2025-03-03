import Link from 'next/link'
import Image from 'next/image'
import { Facebook } from '@/components/socials/Facebook'
import { Instagram } from '@/components/socials/Instagram'
import { Linkedin } from '@/components/socials/Linkedin'
import { Youtube } from '@/components/socials/Youtube'
import { Whatsapp } from '@/components/socials/Whatsapp'

const aboutLinks = [
  { href: '/about#who-we-are', text: 'Who We Are' },
  { href: '/about#what-we-do', text: 'What We Do' },
  { href: '/about#our-philosophy', text: 'Our Philosophy' },
  { href: '/about#beginnings', text: 'Our Journey' },
]

const newsLinks = [
  { href: '/latest-news', text: 'Latest News' },
  { href: '/all-news', text: 'All News' },
  { href: '/mission-updates', text: 'Mission Updates' },
]

const fundraiserLinks = [
  { href: '/fundraisers#general-fund', text: 'General Fund' },
  { href: '/fundraisers#active-campaigns', text: 'Active Campaigns' },
  { href: '/fundraisers#completed-campaigns', text: 'Completed Campaigns' },
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
    <footer className="relative py-8 sm:py-12 overflow-hidden">
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
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-gloria text-[#7B79D8]">
            By Giving We Receive Much More
          </h2>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-8 mb-10 sm:mb-16">
          {/* About Us Column */}
          <div className="space-y-3">
            <Link href='/about' className='hover:underline'>
              <h3 className="text-xl sm:text-2xl font-gloria">About Us</h3>
            </Link>
            <nav className="space-y-2">
              {aboutLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="block text-base sm:text-lg font-gloria hover:underline"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>

          {/* Fundraisers Column */}
          <div className="space-y-3">
            <Link href='/fundraisers' className='hover:underline'>
              <h3 className="text-xl sm:text-2xl font-gloria">Fundraisers</h3>
            </Link>
            <nav className="space-y-2">
              {fundraiserLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="block text-base sm:text-lg font-gloria hover:underline"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>

          {/* News Column */}
          <div className="space-y-3">
            <Link href='/latest-news' className='hover:underline'>
              <h3 className="text-xl sm:text-2xl font-gloria">Our News</h3>
            </Link>
            <nav className="space-y-2">
              {newsLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="block text-base sm:text-lg font-gloria hover:underline"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>

          {/* Diary Column */}
          <div className="space-y-3 sm:col-span-1">
            <Link href='/diary' className='hover:underline'>
              <h3 className="text-xl sm:text-2xl font-gloria">The Diary</h3>
            </Link>
            <nav className="space-y-2">
              {diaryLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="block text-base sm:text-lg font-gloria hover:underline"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Column */}
          <div className="space-y-3 sm:col-span-2 md:col-span-1">
            <h3 className="text-xl sm:text-2xl font-gloria">Contact Us</h3>
            
            {/* Social Media Icons */}
            <div className="flex flex-wrap gap-4 mt-3 sm:mt-6">
              {socialLinks.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href}
                  className="text-black hover:opacity-80 transition-opacity"
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <link.component size={30} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 md:gap-8 mb-8">
          <Link 
            href="/donate" 
            className="inline-flex items-center justify-between bg-white rounded-full px-5 sm:px-8 py-2 sm:py-3 md:py-4 text-base sm:text-lg md:text-xl font-gloria text-black hover:shadow-lg transition-shadow w-full sm:w-auto"
          >
            <span>Support the Cause</span>
            <svg width="24" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-3 sm:ml-4">
              <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 12H4.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          
          <Link 
            href="/apply_to_teach" 
            className="inline-flex items-center justify-between bg-[#D8E6F9] rounded-full px-5 sm:px-8 py-2 sm:py-3 md:py-4 text-base sm:text-lg md:text-xl font-gloria text-black hover:shadow-lg transition-shadow w-full sm:w-auto"
          >
            <span>Join As Teacher</span>
            <svg width="24" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-3 sm:ml-4">
              <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 12H4.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          
          <Link 
            href="/register_school" 
            className="inline-flex items-center justify-between bg-[#D8D8F9] rounded-full px-5 sm:px-8 py-2 sm:py-3 md:py-4 text-base sm:text-lg md:text-xl font-gloria text-black hover:shadow-lg transition-shadow w-full sm:w-auto"
          >
            <span>Join As School</span>
            <svg width="24" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-3 sm:ml-4">
              <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 12H4.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        
        {/* Copyright */}
        <div className="text-sm text-center text-gray-600">
          ©LEDU 2025. All rights reserved
        </div>
      </div>
    </footer>
  )
}