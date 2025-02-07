import Link from 'next/link'
import Image from 'next/image'
import {Facebook} from '../socials/Facebook'
import {Linkedin} from '../socials/Linkedin'
import {Instagram} from '../socials/Instagram'
import {Youtube} from '../socials/Youtube'

export default function Header() {
  return (
    <div className="w-full">
      {/* Top banner with motto */}
      <div className="w-full bg-sky-300 py-4 relative">
        <div className="text-center text-2xl font-gloria text-white">
          By Giving We Receive Much More
        </div>
        <button className="absolute right-4 top-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="relative w-32 h-32">
            <Link href="/">
              <div className="relative w-full h-full">
                <Image 
                  src="/images/worldMini2.png"
                  alt="LEDU Logo"
                  fill
                  className="object-contain"
                />
                <div className="absolute top-1/4 left-1/4 rounded-full bg-gradient-radial from-white via-white/60 to-white/30 w-16 h-16" />
                <div className="absolute top-1/3 left-1/3 font-gloria text-2xl">LEDU</div>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-12">
            {/* About Us Dropdown */}
            <div className="group relative">
              <Link href="/about" className="text-2xl font-gloria hover:text-sky-600">
                About Us
              </Link>
              <div className="hidden group-hover:block absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2">
                <Link href="/who-we-are" className="block px-4 py-2 text-lg font-gloria hover:bg-sky-50">Who We Are</Link>
                <Link href="/what-we-do" className="block px-4 py-2 text-lg font-gloria hover:bg-sky-50">What We Do</Link>
                <Link href="/philosophy" className="block px-4 py-2 text-lg font-gloria hover:bg-sky-50">Our Philosophy</Link>
                <Link href="/journey" className="block px-4 py-2 text-lg font-gloria hover:bg-sky-50">Our Journey</Link>
              </div>
            </div>

            {/* Fundraisers Dropdown */}
            <div className="group relative">
              <Link href="/fundraisers" className="text-2xl font-gloria hover:text-sky-600">
                Fundraisers
              </Link>
              <div className="hidden group-hover:block absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2">
                <Link href="/fundraisers#general-fund" className="block px-4 py-2 text-lg font-gloria hover:bg-sky-50">General Fund</Link>
                <Link href="/fundraisers#active-campaigns" className="block px-4 py-2 text-lg font-gloria hover:bg-sky-50">Active Campaigns</Link>
                <Link href="/fundraisers#completed-campaigns" className="block px-4 py-2 text-lg font-gloria hover:bg-sky-50">Completed Campaigns</Link>
              </div>
            </div>

            {/* Our News Dropdown */}
            <div className="group relative">
              <Link href="/news" className="text-2xl font-gloria hover:text-sky-600">
                Our News
              </Link>
              <div className="hidden group-hover:block absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2">
                <Link href="/latest-news" className="block px-4 py-2 text-lg font-gloria hover:bg-sky-50">Latest News</Link>
                <Link href="/all-news" className="block px-4 py-2 text-lg font-gloria hover:bg-sky-50">All News</Link>
                <Link href="/mission-updates" className="block px-4 py-2 text-lg font-gloria hover:bg-sky-50">Mission Updates</Link>
              </div>
            </div>

            {/* The Diary Dropdown */}
            <div className="group relative">
              <Link href="/diary" className="text-2xl font-gloria hover:text-sky-600">
                The Diary
              </Link>
              <div className="hidden group-hover:block absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md py-2">
                <Link href="/diary/sisters-love" className="block px-4 py-2 text-lg font-gloria hover:bg-sky-50">A Sister&apos;s Love Amidst Loss</Link>
                <Link href="/diary/tragedy-transformation" className="block px-4 py-2 text-lg font-gloria hover:bg-sky-50">From Tragedy To Transformation</Link>
                <Link href="/diary/not-forgotten" className="block px-4 py-2 text-lg font-gloria hover:bg-sky-50">Alone But Not Forgotten</Link>
                <Link href="/diary/seven-oranges" className="block px-4 py-2 text-lg font-gloria hover:bg-sky-50">The Gift of Seven Oranges</Link>
                <Link href="/diary/christmas-light" className="block px-4 py-2 text-lg font-gloria hover:bg-sky-50">The Light of Christmas</Link>
              </div>
            </div>

            <Link href="/contact" className="text-2xl font-gloria hover:text-sky-600">
              Contact Us
            </Link>
          </div>
        </div>
      </nav>

      {/* Social Media Links */}
      <div className="flex justify-center space-x-6 py-4">
        <Link href="#" className="hover:text-sky-600">
          <Facebook size={24} />
        </Link>
        <Link href="#" className="hover:text-sky-600">
          <Linkedin size={24} />
        </Link>
        <Link href="#" className="hover:text-sky-600">
          <Instagram size={24} />
        </Link>
        <Link href="#" className="hover:text-sky-600">
          <Youtube size={24} />
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-8 py-6">
        <Link href="/donate" className="bg-white px-6 py-2 rounded-full font-gloria text-xl hover:bg-sky-50 border-2 border-black flex items-center">
          Support the Cause
          <span className="ml-2">→</span>
        </Link>
        <Link href="/apply_to_teach" className="bg-sky-200 px-6 py-2 rounded-full font-gloria text-xl hover:bg-sky-300 flex items-center">
          Join As Teacher
          <span className="ml-2">→</span>
        </Link>
        <Link href="/register_school" className="bg-violet-200 px-6 py-2 rounded-full font-gloria text-xl hover:bg-violet-300 flex items-center">
          Join As School
          <span className="ml-2">→</span>
        </Link>
      </div>
    </div>
  )
}