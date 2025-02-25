'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { href: '/about', text: 'About Us' },
    { href: '/fundraisers', text: 'Fundraisers' },
    { href: '/diary', text: 'the Diary' },
    { href: '/news', text: 'Our News' },
    { href: '/contact', text: 'Contact Us' }
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
        className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform transition-transform duration-300 ease-out z-40 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="parent">
          <Link href="/" onClick={closeMenu}>
            <div className="relative w-full h-full">
              <Image 
                src="/worldMini2.png"
                alt="LEDÚ Logo"
                width={193}
                height={189}
                className="icon1"
              />
              <div className="group-child" />
              <div className="ledu">LEDÚ</div>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="mt-8 px-8">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className="text-2xl font-gloria text-black hover:text-gray-600 transition-colors"
                onClick={closeMenu}
              >
                {link.text}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      <style jsx>{`
        .bg-black {
          background-image: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='none' stroke='black' stroke-width='4' stroke-dasharray='5,5' stroke-dashoffset='0' stroke-linecap='round'/%3E%3C/svg%3E");
          background-color: black;
        }

        .parent {
          position: relative;
          width: 193px;
          height: 189px;
          font-size: 40px;
        }

        .icon1 {
          position: absolute;
          top: 0;
          left: 0;
          width: 193px;
          height: 189px;
          object-fit: cover;
        }
        
        .group-child {
          position: absolute;
          top: 33px;
          left: 45px;
          border-radius: 50%;
          background: radial-gradient(50% 50% at 50% 50%, #fff 33.5%, rgba(255, 255, 255, 0.6) 76.5%, rgba(255, 255, 255, 0.3));
          width: 107px;
          height: 105px;
        }

        .ledu {
          position: absolute;
          top: 46px;
          left: 52px;
        }
      `}</style>
    </div>
  );
}