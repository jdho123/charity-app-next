'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Facebook } from '@/components/socials/Facebook';
import { Instagram } from '@/components/socials/Instagram';
import { Linkedin } from '@/components/socials/Linkedin';
import { Youtube } from '@/components/socials/Youtube';
import { Whatsapp } from '@/components/socials/Whatsapp';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const aboutLinks = [
    { href: '/who-we-are', text: 'Who We Are' },
    { href: '/what-we-do', text: 'What We Do' },
    { href: '/philosophy', text: 'Our Philosophy' },
    { href: '/journey', text: 'Our Journey' },
  ];

  const fundraiserLinks = [
    { href: '/general-fund', text: 'General Fund' },
    { href: '/active-campaigns', text: 'Active Campaigns' },
    { href: '/completed-campaigns', text: 'Complited Campaigns' },
  ];

  const newsLinks = [
    { href: '/latest-news', text: 'Latest News' },
    { href: '/all-news', text: 'All News' },
    { href: '/mission-updates', text: 'Mission Updates' },
  ];

  const socialLinks = [
    { href: 'https://facebook.com', component: Facebook, label: 'Facebook' },
    { href: 'https://linkedin.com', component: Linkedin, label: 'LinkedIn' },
    { href: 'https://whatsapp.com', component: Whatsapp, name: 'whatsapp', label: 'WhatsApp' },
    { href: 'https://instagram.com', component: Instagram, label: 'Instagram' },
    { href: 'https://youtube.com', component: Youtube, label: 'YouTube' },
  ];

  return (
    <div>
      {/* Menu Button */}
      <button 
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 group"
      >
        <div className="flex flex-col items-end">
          <span 
            className={`font-gloria text-2xl mb-1 ${
              !isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            Menu
          </span>
          <div className="space-y-1.5">
            <div 
              className={`h-[3px] bg-black rounded-full transform origin-right transition-all duration-200 ${
                isOpen ? 'w-12 rotate-45 translate-y-2' : 'w-12 group-hover:w-10'
              }`}
            ></div>
            <div 
              className={`h-[3px] bg-black rounded-full transform origin-right transition-all duration-200 ${
                isOpen ? 'w-12 opacity-0' : 'w-12 group-hover:w-8'
              }`}
            ></div>
            <div 
              className={`h-[3px] bg-black rounded-full transform origin-right transition-all duration-200 ${
                isOpen ? 'w-12 -rotate-45 -translate-y-2' : 'w-12 group-hover:w-6'
              }`}
            ></div>
          </div>
        </div>
      </button>

      {/* Slide-out Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      ></div>

      {/* Slide-out Menu */}
      <div 
        className={`fixed top-0 right-0 w-full md:w-[500px] h-full bg-white shadow-lg transform transition-transform duration-300 ease-out z-40 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end p-6">
          <button onClick={closeMenu} className="text-black">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
            {/* About Us Section */}
            <div>
              <h2 className="text-3xl font-gloria text-[#F9D949] mb-4">About Us</h2>
              <ul className="space-y-3">
                {aboutLinks.map(link => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-xl text-black font-gloria hover:underline"
                      onClick={closeMenu}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fundraisers Section */}
            <div>
              <h2 className="text-3xl font-gloria text-[#E74646] mb-4">Fundraisers</h2>
              <ul className="space-y-3">
                {fundraiserLinks.map(link => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-xl text-black font-gloria hover:underline"
                      onClick={closeMenu}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* The Diary Section */}
            <div>
              <h2 className="text-3xl font-gloria text-[#54B435] mb-4">the Diary</h2>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/diary" 
                    className="text-xl text-black font-gloria hover:underline"
                    onClick={closeMenu}
                  >
                    the Diary
                  </Link>
                </li>
              </ul>
            </div>

            {/* Our News Section */}
            <div>
              <h2 className="text-3xl font-gloria text-[#19A7CE] mb-4">Our News</h2>
              <ul className="space-y-3">
                {newsLinks.map(link => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-xl text-black font-gloria hover:underline"
                      onClick={closeMenu}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us Section */}
            <div className="md:col-span-2">
              <h2 className="text-3xl font-gloria text-[#9376E0] mb-4">Contact Us</h2>
              
              {/* Social Media Icons */}
              <div className="flex space-x-6 mt-2 mb-8">
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
          <div className="mt-12 space-y-4">
            <Link 
              href="/donate" 
              className="inline-flex items-center justify-between bg-white border border-gray-300 rounded-full px-8 py-3 text-xl font-gloria text-black hover:shadow-lg transition-shadow w-full"
              onClick={closeMenu}
            >
              <span>Support the Cause</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 12H4.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            
            <Link 
              href="/apply_to_teach" 
              className="inline-flex items-center justify-between bg-[#D8E6F9] rounded-full px-8 py-3 text-xl font-gloria text-black hover:shadow-lg transition-shadow w-full"
              onClick={closeMenu}
            >
              <span>Join As Teacher</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 12H4.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            
            <Link 
              href="/register_school" 
              className="inline-flex items-center justify-between bg-[#D8D8F9] rounded-full px-8 py-3 text-xl font-gloria text-black hover:shadow-lg transition-shadow w-full"
              onClick={closeMenu}
            >
              <span>Join As School</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 12H4.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}