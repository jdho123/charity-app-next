'use client';

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useClientOnly from '@/hooks/useClientOnly';

export default function Goals() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [modelOpen, setModelOpen] = useState(false);
  const { isClient, windowWidth } = useClientOnly();

  useEffect(() => {
    if (!isClient) return;

    // inside your useEffect, replace handleScroll with:
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const { top, bottom, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 1) decide how much of the viewport we want to wait through before starting
      //    e.g. 25% of the viewport height
      const startOffset = windowHeight;
      // 2) the total distance over which we want the animation to run
      const totalDistance = windowHeight + height - startOffset;

      let rawProgress = 0;

      // only start counting once the section enters below the startOffset line
      if (top <= windowHeight - startOffset && bottom >= 0) {
        // distance traveled beyond the start line:
        const dist = windowHeight - startOffset - top;
        rawProgress = dist / totalDistance;
      } else if (top < windowHeight - startOffset) {
        rawProgress = 1;
      }

      // clamp and update
      rawProgress = Math.min(Math.max(rawProgress, 0), 1);
      setScrollProgress(rawProgress);
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
      className="relative flex min-h-[160vh] sm:min-h-[150vh] md:min-h-[200vh] pb-20 sm:pb-32 overflow-hidden bg-black"
    >
      {/* Background Earth Image */}
      <div className="sticky top-0 h-screen w-full pt-8 sm:pt-16">
        {/* Title with background */}
        <div
          className="flex justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-300 ease-out"
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
          className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out overflow-visible pt-[25%]"
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
            <div
              className={`absolute w-[15%] h-[15%] top-[31%] left-[47%] transition-opacity duration-700 ease-out ${adjustedProgress >= 0.8 ? 'opacity-100' : 'opacity-0'}`}
            >
              <button onClick={() => setModelOpen(true)}>
                <Image src="/images/pin.png" alt="Location pin" fill className="object-contain" />
              </button>
            </div>
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
        <Image
          src="/images/star_5.png"
          alt="Star"
          width={55}
          height={55}
          className="absolute top-[120%] left-[80%] -z-10"
          priority
        />
        <Image
          src="/images/star_7.png"
          alt="Star"
          width={80}
          height={80}
          className="absolute left-[30%] top-[110%] -z-10"
          priority
        />
        <Image
          src="/images/star_5.png"
          alt="Star"
          width={110}
          height={110}
          className="absolute top-[140%] left-[1%] -z-10"
          priority
        />
        <Image
          src="/images/star_2.png"
          alt="Star"
          width={60}
          height={60}
          className="absolute top-[160%] left-[48%] -z-10"
          priority
        />
        <Image
          src="/images/star_1.png"
          alt="Star"
          width={60}
          height={60}
          className="absolute top-[100%] left-[5%] -z-10"
          priority
        />
        <Image
          src="/images/star_1.png"
          alt="Star"
          width={70}
          height={70}
          className="absolute top-[40%] left-[90%] -z-10"
          priority
        />
      </div>

      {/* Content boxes that come in from the side - repositioned for mobile */}
      <div
        className="flex justify-center mx-auto px-4 sm:px-6 lg:px-8 absolute bottom-[2%] z-30 transition-all duration-500 ease-out pointer-events-auto w-full"
        style={infoCardsTransform}
      >
        <div className="flex flex-col md:flex-row justify-evenly w-full md:w-[90%] gap-5 sm:gap-8 md:gap-12">
          {/* Teachers Section */}
          <div className="relative flex flex-col group backdrop-blur-md bg-white/70 rounded-2xl sm:rounded-3xl px-4 pt-4 sm:px-6 sm:pt-6 md:px-8 md:pt-8 max-md:pb-4 shadow-xl border border-white/20">
            <h2 className="text-xl lg:text-3xl font-gloria text-[#1135F3] mb-2 sm:mb-4">
              Find Teachers
            </h2>
            <p className="text-sm lg:text-lg text-gray-800 max-w-xl mb-4 sm:mb-6 font-urbanist">
              We are searching for passionate educators who are eager to share their knowledge and
              make a lasting impact by teaching English to children in need around the globe.
            </p>
            <div className="flex flex-col mt-auto">
              <Link
                href="/apply_to_teach"
                className="inline-flex items-center mx-auto gap-2 bg-white/90 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-gloria text-gray-800 hover:bg-white transition-all group-hover:translate-x-1"
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
              <div className="relative w-[90%] h-40 mx-auto max-md:hidden">
                <Image
                  src="/images/teacherDrawing.png"
                  alt="Teacher Drawing"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Schools Section */}
          <div className="relative flex flex-col group backdrop-blur-md bg-white/70 rounded-2xl sm:rounded-3xl px-4 pt-4 sm:px-6 sm:pt-6 md:px-8 md:pt-8 max-md:pb-4 shadow-xl border border-white/20 ">
            <h2 className="text-xl lg:text-3xl font-gloria text-[#53A21A] mb-2 sm:mb-4">
              Find Schools
            </h2>
            <p className="text-sm lg:text-lg text-gray-800 max-w-xl mb-4 sm:mb-6 font-urbanist">
              We aim to connect with schools in underserved regions, providing them with access to
              resources, support, and transformative learning opportunities.
            </p>
            <div className="flex flex-col mt-auto">
              <Link
                href="/register_school"
                className="inline-flex items-center mx-auto gap-2 bg-white/90 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-gloria text-gray-800 hover:bg-white transition-all group-hover:translate-x-1"
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
              <div className="relative w-[90%] h-40 mx-auto max-md:hidden">
                <Image
                  src="/images/schoolDrawing.png"
                  alt="School Drawing"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modelOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50 flex items-center justify-center overflow-auto p-4"
          onClick={() => setModelOpen(false)} /* optional: click outside to close */
        >
          <div
            className="relative bg-white/60 backdrop-blur-xl rounded-xl shadow-xl max-w-3xl w-full p-6"
            onClick={(e) => e.stopPropagation()} /* prevent closing when clicking inside */
          >
            {/* your actual modal content goes here */}
            <h2 className="text-2xl font-bold mb-4 font-gloria">Nepal</h2>
            <p className="mb-6 font-urbanist">
              A country full of adults who are incredibly profound in their thought and are so
              welcoming, with children who are always radiating positivity and are eager to learn.
            </p>
            <button
              className="mt-auto inline-block px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setModelOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
