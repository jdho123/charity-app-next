import Link from 'next/link';
import Image from 'next/image';
import { Facebook } from '@/components/socials/Facebook';
import { Instagram } from '@/components/socials/Instagram';
import { Linkedin } from '@/components/socials/Linkedin';
import { Youtube } from '@/components/socials/Youtube';
import { Whatsapp } from '@/components/socials/Whatsapp';
import BlurryBox from '@/components/shared/BlurryBox';

const aboutLinks = [
  { href: '/about#who-we-are', text: 'Who We Are' },
  { href: '/about#what-we-do', text: 'What We Do' },
  { href: '/about#our-philosophy', text: 'Our Philosophy' },
  { href: '/about#beginnings', text: 'Our Journey' },
];

const newsLinks = [{ href: '/newsletter', text: 'Latest News' }];

const fundraiserLinks = [
  { href: '/fundraisers#general-fund', text: 'General Fund' },
  { href: '/fundraisers#active-campaigns', text: 'Active Campaigns' },
  { href: '/fundraisers#completed-campaigns', text: 'Completed Campaigns' },
];

const diaryLinks = [{ href: '/diary', text: 'The Diary' }];

const socialLinks = [
  { href: 'https://facebook.com', component: Facebook, label: 'Facebook' },
  { href: 'https://linkedin.com', component: Linkedin, label: 'LinkedIn' },
  { href: 'https://whatsapp.com', component: Whatsapp, name: 'whatsapp', label: 'WhatsApp' },
  { href: 'https://instagram.com', component: Instagram, label: 'Instagram' },
  { href: 'https://youtube.com', component: Youtube, label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="relative items-center py-8 sm:py-12 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        {1 ? (
          <Image
            src="/images/footerAlt.svg"
            alt="Wavy background"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <Image
            src="/images/footer.png"
            alt="Colorful wavy background"
            fill
            priority
            className="object-cover object-center"
          />
        )}
      </div>

      {/* Main Content Container */}
      <div className="w-full px-4 relative z-10">
        <BlurryBox
          position="custom"
          customPosition="relative mx-auto"
          width="w-full"
          padding="px-6 py-6 sm:py-10"
          borderRadius="rounded-[32px]"
          bgOpacity="bg-white/30"
          blurAmount="backdrop-blur-sm"
          className="shadow-xl"
        >
          {/* MOBILE LAYOUT - Shown on small screens, hidden on md and up */}
          <div className="md:hidden">
            {/* Logo and Tagline - Mobile */}
            <div className="flex items-start mb-6">
              <div className="mr-4">
                <Image
                  src="/images/leduLogo.png"
                  alt="LEDU Logo"
                  width={70}
                  height={70}
                  className="object-contain scale-[180%]"
                />
              </div>
              <h2 className="text-2xl font-handwriting text-[#9797EE] mt-2">
                By Giving We Receive Much More
              </h2>
            </div>

            {/* Two column layout for mobile */}
            <div className="flex flex-row gap-4">
              {/* Left column - Navigation */}
              <div className="flex-1 space-y-4">
                <Link href="/about" className="hover:underline block">
                  <span className="text-xl font-handwriting">About Us</span>
                </Link>

                <Link href="/fundraisers" className="hover:underline block">
                  <span className="text-xl font-handwriting">Fundraisers</span>
                </Link>

                <Link href="/latest-news" className="hover:underline block">
                  <span className="text-xl font-handwriting">Our News</span>
                </Link>

                <Link href="/diary" className="hover:underline block">
                  <span className="text-xl font-handwriting">The Diary</span>
                </Link>

                <Link href="/contact" className="hover:underline block">
                  <span className="text-xl font-handwriting">Contact Us</span>
                </Link>

                {/* Social Media Icons */}
                <div className="flex gap-4 mt-6">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-black hover:opacity-80 transition-opacity"
                      aria-label={link.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <link.component size={24} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Right column - CTA buttons */}
              <div className="flex-1 flex flex-col space-y-4">
                <Link
                  href="/fundraisers"
                  className="inline-flex items-center justify-between bg-white rounded-full px-4 py-2 text-base font-handwriting text-black hover:shadow-lg transition-shadow"
                >
                  <span>Support the Cause</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2"
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
                  className="inline-flex items-center justify-between bg-[#D8E6F9] rounded-full px-4 py-2 text-base font-handwriting text-black hover:shadow-lg transition-shadow"
                >
                  <span>Join As Teacher</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2"
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
                  className="inline-flex items-center justify-between bg-[#D8D8F9] rounded-full px-4 py-2 text-base font-handwriting text-black hover:shadow-lg transition-shadow"
                >
                  <span>Join As School</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2"
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

          {/* DESKTOP LAYOUT - Hidden on mobile, shown on md and up */}
          <div className="hidden md:block">
            {/* Logo and Tagline - Desktop */}
            <div className="flex items-center mb-10">
              <div className="mr-6">
                <Image
                  src="/images/leduLogo.png"
                  alt="LEDU Logo"
                  width={90}
                  height={90}
                  className="object-contain"
                />
              </div>
              <h2 className="text-3xl lg:text-4xl font-handwriting text-[#9797EE]">
                By Giving We Receive Much More
              </h2>
            </div>

            {/* Main Content Grid - Desktop */}
            <div className="grid grid-cols-5 gap-8">
              {/* Navigation Columns (3 columns) */}
              <div className="col-span-3 grid grid-cols-3 gap-6">
                {/* About Us Column */}
                <div className="space-y-3">
                  <Link href="/about" className="hover:underline">
                    <h3 className="text-xl lg:text-2xl font-handwriting">About Us</h3>
                  </Link>
                  <nav className="space-y-2">
                    {aboutLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block text-base lg:text-lg font-handwriting hover:underline"
                      >
                        {link.text}
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* Middle columns - combined */}
                <div className="space-y-6">
                  {/* Fundraisers */}
                  <div className="space-y-3">
                    <Link href="/fundraisers" className="hover:underline">
                      <h3 className="text-xl lg:text-2xl font-handwriting">Fundraisers</h3>
                    </Link>
                    <nav className="space-y-2">
                      {fundraiserLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block text-base lg:text-lg font-handwriting hover:underline"
                        >
                          {link.text}
                        </Link>
                      ))}
                    </nav>
                  </div>

                  {/* Diary */}
                  <div className="space-y-3">
                    <Link href="/diary" className="hover:underline">
                      <h3 className="text-xl lg:text-2xl font-handwriting">The Diary</h3>
                    </Link>
                    <nav className="space-y-2">
                      {diaryLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block text-base lg:text-lg font-handwriting hover:underline"
                        >
                          {link.text}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>

                {/* News Column */}
                <div className="space-y-3">
                  <Link href="/latest-news" className="hover:underline">
                    <h3 className="text-xl lg:text-2xl font-handwriting">Our News</h3>
                  </Link>
                  <nav className="space-y-2">
                    {newsLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block text-base lg:text-lg font-handwriting hover:underline"
                      >
                        {link.text}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>

              {/* CTA and Contact Column (2 columns) */}
              <div className="col-span-2 flex flex-col justify-between">
                {/* Contact and Social Media */}
                <div className="mb-6">
                  <h3 className="text-xl lg:text-2xl font-handwriting mb-4">Contact Us</h3>
                  <div className="flex gap-4">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="text-black hover:opacity-80 transition-opacity"
                        aria-label={link.label}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <link.component size={28} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-4">
                  <Link
                    href="/fundraisers"
                    className="inline-flex items-center justify-between bg-white rounded-full px-6 py-3 text-lg font-handwriting text-black hover:shadow-lg transition-shadow w-full"
                  >
                    <span>Support the Cause</span>
                    <svg
                      width="20"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-3"
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
                    className="inline-flex items-center justify-between bg-[#D8E6F9] rounded-full px-6 py-3 text-lg font-handwriting text-black hover:shadow-lg transition-shadow w-full"
                  >
                    <span>Join As Teacher</span>
                    <svg
                      width="20"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-3"
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
                    className="inline-flex items-center justify-between bg-[#D8D8F9] rounded-full px-6 py-3 text-lg font-handwriting text-black hover:shadow-lg transition-shadow w-full"
                  >
                    <span>Join As School</span>
                    <svg
                      width="20"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-3"
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
        </BlurryBox>

        {/* Copyright - Outside the BlurryBox */}
        <div className="text-sm text-center text-gray-600 mt-6">
          ©LEDU 2025. All rights reserved
        </div>
      </div>
    </footer>
  );
}
