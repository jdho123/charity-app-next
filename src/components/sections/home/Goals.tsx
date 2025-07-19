'use client';

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useClientOnly from '@/hooks/useClientOnly';

export default function Goals() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { isClient, windowWidth } = useClientOnly();

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far we've scrolled into the section
      let progress = 0;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        progress = Math.min(Math.max(progress, 0), 1);
      } else if (rect.top < 0) {
        progress = 1;
      }

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isClient]);

  // Adjust progress to complete at 33% scroll (0.33)
  const adjustedProgress = Math.min(scrollProgress * 3, 1);

  // Modified transformations for better mobile experience
  const earthTransform = {
    scale: 1 + adjustedProgress * 1.5, // Start smaller on mobile
    translateX: `${adjustedProgress * (windowWidth < 768 ? 20 : 35)}%`, // Move less on mobile
    translateY: `${adjustedProgress * (windowWidth < 1024 ? 30 : 15)}%`,
    opacity: 1,
  };

  const titleTransform = {
    translateX: `${Math.max(Math.min(adjustedProgress * -10, -10), -10)}%`,
    translateY: `${adjustedProgress * 60}%`, // Move less on mobile
    opacity: 1 - adjustedProgress * 0.2,
  };

  const infoCardsTransform = {
    opacity: 1,
    transform: `translateX(${(1 - adjustedProgress) * -100}%)`,
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[150vh] sm:min-h-[140vh] md:min-h-[120vh] pb-20 sm:pb-32 overflow-hidden  bg-black"
    >
      {/* Background Earth Image */}
      <div className="sticky top-0 h-screen w-full pt-8 sm:pt-16">
        {/* Title with background */}
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-300 ease-out"
          style={{
            opacity: titleTransform.opacity,
            maxWidth: '90%',
          }}
        >
          <div className="backdrop-blur-md rounded-xl p-5 sm:p-7 shadow-lg inline-block max-w-full">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-gloria mb-3 sm:mb-6 text-white">
              Our Goals
            </h1>

            <p className="text-lg sm:text-xl text-white font-urbanist mb-4 sm:mb-8 max-w-lg leading-relaxed">
              At LEDU, we believe that education has the power to transform lives and communities.
              That&apos;s why our mission is twofold:
            </p>
          </div>
        </div>

        {/* Earth image that moves right and gets bigger */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out overflow-visible"
          style={{
            transform: `translateX(${earthTransform.translateX}) translateY(${earthTransform.translateY}) scale(${earthTransform.scale})`,
            opacity: earthTransform.opacity,
          }}
        >
          <div className="relative h-[60vh] w-[60vh] sm:h-[70vh] sm:w-[70vh] md:h-[80vh] md:w-[80vh]">
            <Image
              src="/images/bigWorldFull-new.png"
              alt="World globe illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        <Image
          src="/images/star_7.png"
          alt="Star"
          width={80}
          height={80}
          className="absolute top-[40%] lg:top-[20%] left-[2%] -z-10"
          priority
        />
        <Image
          src="/images/star_2.png"
          alt="Star"
          width={70}
          height={70}
          className="absolute lg:top-[12%] lg:left-[60%] top-[10%] left-[85%] -z-10"
          priority
        />
        <Image
          src="/images/star_2.png"
          alt="Star"
          width={50}
          height={50}
          className="absolute top-[73%] left-[20%] -z-10"
          priority
        />
        <Image
          src="/images/star_3.png"
          alt="Star"
          width={100}
          height={100}
          className="absolute top-[95%] lg:top-[90%] left-[10%] lg:left-[55%] -z-10"
          priority
        />
        <Image
          src="/images/star_5.png"
          alt="Star"
          width={55}
          height={55}
          className="absolute lg:top-[5%] lg:left-[40%] top-[2%] left-[65%] -z-10"
          priority
        />
      </div>

      {/* Content boxes that come in from the side - repositioned for mobile */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 absolute top-[60%] sm:top-[50%] md:top-[40%] z-30 transition-all duration-500 ease-out pointer-events-auto w-full"
        style={infoCardsTransform}
      >
        <div className="grid gap-5 sm:gap-8 md:gap-12 max-w-full sm:max-w-3xl">
          {/* Teachers Section */}
          <div className="relative group backdrop-blur-md bg-white/70 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-white/20">
            <h2 className="text-2xl sm:text-3xl font-gloria text-[#1135F3] mb-2 sm:mb-4">
              Find Teachers
            </h2>
            <p className="text-base sm:text-lg text-gray-800 max-w-xl mb-4 sm:mb-6 font-urbanist">
              We are searching for passionate educators who are eager to share their knowledge and
              make a lasting impact by teaching English to children in need around the globe.
            </p>
            <Link
              href="/apply_to_teach"
              className="inline-flex items-center gap-2 bg-white/90 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-gloria text-gray-800 hover:bg-white transition-all group-hover:translate-x-1"
            >
              Apply to Teach
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M12 4L20 12L12 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 12H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          {/* Schools Section */}
          <div className="relative group backdrop-blur-md bg-white/70 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-white/20">
            <h2 className="text-2xl sm:text-3xl font-gloria text-[#53A21A] mb-2 sm:mb-4">
              Find Schools
            </h2>
            <p className="text-base sm:text-lg text-gray-800 max-w-xl mb-4 sm:mb-6 font-urbanist">
              We aim to connect with schools in underserved regions, providing them with access to
              resources, support, and transformative learning opportunities.
            </p>
            <Link
              href="/register_school"
              className="inline-flex items-center gap-2 bg-white/90 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-gloria text-gray-800 hover:bg-white transition-all group-hover:translate-x-1"
            >
              Register Your School
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M12 4L20 12L12 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 12H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
