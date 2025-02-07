'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { href: '/about', text: 'About Us' },
  { href: '/fundraisers', text: 'Fundraisers' },
  { href: '/diary', text: 'the Diary' },
  { href: '/news', text: 'Our News' },
  { href: '/contact', text: 'Contact Us' }
]

export default function SlideMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      {/* Menu Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 group"
      >
        <div className="flex flex-col items-end">
          <span className={`font-gloria text-2xl mb-1 transition-opacity ${!isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            Menu
          </span>
          <div className="space-y-1.5">
            <div className={`
              h-[3px] bg-black rounded-full transform origin-right transition-all duration-200
              ${isOpen ? 'w-12 rotate-45 translate-y-2' : 'w-12 group-hover:w-10'}
            `} />
            <div className={`
              h-[3px] bg-black rounded-full transform origin-right transition-all duration-200
              ${isOpen ? 'w-12 opacity-0' : 'w-12 group-hover:w-8'}
            `} />
            <div className={`
              h-[3px] bg-black rounded-full transform origin-right transition-all duration-200
              ${isOpen ? 'w-12 -rotate-45 -translate-y-2' : 'w-12 group-hover:w-6'}
            `} />
          </div>
        </div>
      </button>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-40
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setIsOpen(false)}
      />

      {/* Slide-out Menu */}
      <div className={`
        fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform 
        transition-transform duration-300 ease-out z-40
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Logo */}
        <div className="relative w-[193px] h-[189px]">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <div className="relative w-full h-full">
              <Image 
                src="/storage/worldMini2.png"
                alt="LEDU Logo"
                fill
                className="object-cover"
              />
              <div className="absolute top-[33px] left-[45px] w-[107px] h-[105px] rounded-full 
                bg-[radial-gradient(50%_50%_at_50%_50%,#fff_33.5%,rgba(255,255,255,0.6)_76.5%,rgba(255,255,255,0.3))]" 
              />
              <span className="absolute top-[46px] left-[52px] text-[40px] font-gloria">
                LEDU
              </span>
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
                onClick={() => setIsOpen(false)}
              >
                {link.text}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}
