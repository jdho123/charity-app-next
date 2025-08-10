'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Facebook } from '@/components/socials/Facebook';
import { Instagram } from '@/components/socials/Instagram';
import { Linkedin } from '@/components/socials/Linkedin';
import { Youtube } from '@/components/socials/Youtube';
import { Whatsapp } from '@/components/socials/Whatsapp';
import MenuButton from '@/components/layout/menuButtons/reactive';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const aboutLinks = [
    { href: '/about#who-we-are', text: 'Who We Are' },
    { href: '/about#what-we-do', text: 'What We Do' },
    { href: '/about#our-philosophy', text: 'Our Philosophy' },
    { href: '/about#beginnings', text: 'Our Journey' },
  ];

  const fundraiserLinks = [
    { href: '/fundraisers#general-fund', text: 'General Fund' },
    { href: '/fundraisers#active-campaigns', text: 'Active Campaigns' },
    { href: '/fundraisers#completed-campaigns', text: 'Completed Campaigns' },
  ];

  const socialLinks = [
    { href: 'https://facebook.com', component: Facebook, label: 'Facebook' },
    { href: 'https://linkedin.com', component: Linkedin, label: 'LinkedIn' },
    { href: 'https://whatsapp.com', component: Whatsapp, label: 'WhatsApp' },
    { href: 'https://instagram.com', component: Instagram, label: 'Instagram' },
    { href: 'https://youtube.com', component: Youtube, label: 'YouTube' },
  ];

  return (
    <div>
      {/* Menu Button */}
      <MenuButton toggleMenu={toggleMenu} isOpen={isOpen} />

      {/* Slide-out Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      ></div>

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 right-0 w-full md:w-[500px] h-full bg-white/50 backdrop-blur-md border rounded-[3rem] shadow-lg transform transition-transform duration-300 ease-out z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button */}
        <div className="sticky top-0 flex justify-end p-4 z-10">
          <button onClick={closeMenu} className="text-black">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Menu Content - now scrollable */}
        <div className="h-[calc(100%-60px)] px-6 overflow-y-auto pb-6">
          <div className="mb-6 pb-2">
            <Link href="/" className="hover:underline inline-block" onClick={closeMenu}>
              <h2 className="text-3xl font-gloria text-black mb-0">Home</h2>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {/* About Us Section */}
            <div className="mb-6">
              <Link href="/about" className="hover:underline" onClick={closeMenu}>
                <h2 className="text-3xl font-gloria text-[#F9D949] mb-2">About Us</h2>
              </Link>
              <ul className="space-y-2">
                {aboutLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-lg text-black font-gloria hover:underline"
                      onClick={closeMenu}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fundraisers Section */}
            <div className="mb-6">
              <Link href="/fundraisers" className="hover:underline" onClick={closeMenu}>
                <h2 className="text-3xl font-gloria text-[#E74646] mb-2">Fundraisers</h2>
              </Link>
              <ul className="space-y-2">
                {fundraiserLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-lg text-black font-gloria hover:underline"
                      onClick={closeMenu}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* The Diary Section */}
            <div className="mb-6">
              <Link
                href="/diary"
                className="text-lg text-black font-gloria hover:underline"
                onClick={closeMenu}
              >
                <h2 className="text-3xl font-gloria text-[#54B435] mb-2">the Diary</h2>
              </Link>
            </div>

            {/* Our News Section */}
            <div className="mb-6">
              <Link
                href="/newsletter"
                className="text-lg text-black font-gloria hover:underline"
                onClick={closeMenu}
              >
                <h2 className="text-3xl font-gloria text-[#19A7CE] mb-2">Our News</h2>
              </Link>
            </div>

            {/* Contact Us Section */}
            <div className="md:col-span-2 mb-8">
              <h2 className="text-3xl font-gloria text-[#9376E0] mb-2">Contact Us</h2>

              {/* Social Media Icons */}
              <div className="flex space-x-4 mt-1 mb-2">
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
          <div className="space-y-3 mt-4">
            <Link
              href="/fundraisers"
              className="inline-flex items-center justify-between bg-white border border-gray-300 rounded-full px-6 py-2 text-lg font-gloria text-black hover:shadow-lg transition-shadow w-full"
              onClick={closeMenu}
            >
              <span>Support the Cause</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.75 6.75L19.25 12L13.75 17.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 12H4.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <Link
              href="/apply_to_teach"
              className="inline-flex items-center justify-between bg-[#D8E6F9] rounded-full px-6 py-2 text-lg font-gloria text-black hover:shadow-lg transition-shadow w-full"
              onClick={closeMenu}
            >
              <span>Join As Teacher</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.75 6.75L19.25 12L13.75 17.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 12H4.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <Link
              href="/register_school"
              className="inline-flex items-center justify-between bg-[#D8D8F9] rounded-full px-6 py-2 text-lg font-gloria text-black hover:shadow-lg transition-shadow w-full"
              onClick={closeMenu}
            >
              <span>Join As School</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.75 6.75L19.25 12L13.75 17.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 12H4.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
