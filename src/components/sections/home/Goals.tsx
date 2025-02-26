'use client';

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Goals() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far we've scrolled into the section
      // Start animation when top of section is at bottom of viewport
      // End animation when top of section is at top of viewport
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
  }, []);
  
  // Calculate transformations based on scroll progress - but finish animation at 50% scroll
  // Adjust progress to complete at 50% scroll (0.5)
  const adjustedProgress = Math.min(scrollProgress * 2, 1);
  
  const earthTransform = {
    scale: 1.5 + adjustedProgress * 1, // Earth starts larger (1.5x) and grows to 2.5x
    translateX: `${adjustedProgress * 35}%`, // Move 35% to the right
    opacity: 1,
  };
  
  const titleTransform = {
    translateX: `${Math.max(Math.min(adjustedProgress * -10, -10), -10)}%`, // Limit leftward movement to prevent going off-screen
    opacity: 1 - adjustedProgress * 0.2, // Slight fade out as it moves
  };
  
  const infoCardsTransform = {
    opacity: 1, // Always visible
    transform: `translateX(${(1 - adjustedProgress) * -100}%)`, // Start completely off-screen to the left
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[120vh] pb-32"
    >
      {/* Background Earth Image */}
      <div 
        className="sticky top-0 h-screen w-full pt-16 overflow-hidden"
      >
        {/* Title that moves left */}
        <div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-300 ease-out"
          style={{
            // transform: `translateX(${titleTransform.translateX})`,
            opacity: titleTransform.opacity,
            maxWidth: '90%' // Ensure title section doesn't get too wide
          }}
        >
          <h1 className="text-6xl font-gloria mb-6">Our Goals</h1>
          
          <p className="text-lg text-gray-700 mb-8 max-w-lg">
            At LEDU, we believe that education has the power to transform lives and communities. 
            That&apos;s why our mission is twofold:
          </p>
        </div>
        
        {/* Earth image that moves right and gets bigger */}
        <div 
          className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out overflow-visible"
          style={{
            transform: `translateX(${earthTransform.translateX}) scale(${earthTransform.scale})`,
            opacity: earthTransform.opacity
          }}
        >
          <div className="relative h-[80vh] w-[80vh]">
            <Image
              src="/images/bigWorldFull.png"
              alt="World globe illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Content boxes that come in from the side */}
      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 absolute top-[40%] sm:top-[35%] md:top-1/4 z-30 transition-all duration-500 ease-out pointer-events-auto w-full"
        style={infoCardsTransform}
      >
        <div className="grid gap-12 max-w-3xl">
          {/* Teachers Section */}
          <div className="relative group backdrop-blur-md bg-white/70 rounded-3xl p-8 shadow-xl border border-white/20">
            <h2 className="text-3xl font-gloria text-[#1135F3] mb-4">Find Teachers</h2>
            <p className="text-lg text-gray-800 max-w-xl mb-6">
              We are searching for passionate educators who are eager to share their knowledge 
              and make a lasting impact by teaching English to children in need around the globe.
            </p>
            <Link 
              href="/apply_to_teach"
              className="inline-flex items-center gap-2 bg-white/90 rounded-full px-6 py-3 text-lg font-gloria text-gray-800 hover:bg-white transition-all group-hover:translate-x-1"
            >
              Apply to Teach
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M12 4L20 12L12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Schools Section */}
          <div className="relative group backdrop-blur-md bg-white/70 rounded-3xl p-8 shadow-xl border border-white/20">
            <h2 className="text-3xl font-gloria text-[#53A21A] mb-4">Find Schools</h2>
            <p className="text-lg text-gray-800 max-w-xl mb-6">
              We aim to connect with schools in underserved regions, providing them with access 
              to resources, support, and transformative learning opportunities.
            </p>
            <Link 
              href="/register_school"
              className="inline-flex items-center gap-2 bg-white/90 rounded-full px-6 py-3 text-lg font-gloria text-gray-800 hover:bg-white transition-all group-hover:translate-x-1"
            >
              Register Your School
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M12 4L20 12L12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}