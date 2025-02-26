import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import GuestLayout from '@/components/layout/GuestLayout'

export const metadata: Metadata = {
  title: 'Contact Us - LEDU',
}

export default function ContactPage() {
  return (
    <GuestLayout>
      <div className="relative min-h-screen bg-white overflow-hidden">
        {/* Background World Illustration */}
        <div className="absolute inset-0 overflow-hidden">
          {/* <Image 
            src="/images/bigWorld.png" 
            alt=""
            fill
            className="object-cover object-left"
            style={{ width: '70%', right: 0 }}
          /> */}
        </div>

        {/* Main Content */}
        <div className="relative min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Header Section */}
            <div className="max-w-2xl">
              <h1 className="text-6xl font-gloria mb-6">Our Goals</h1>
              
              <p className="text-lg font-verdana text-gray-700 mb-16">
                At LEDU, we believe that education has the power to transform lives and communities. 
                That&apos;s why our mission is twofold:
              </p>
            </div>

            {/* Goals Sections */}
            <div className="grid gap-12 max-w-3xl">
              {/* Teachers Section */}
              <div className="relative group backdrop-blur-sm bg-white/30 rounded-3xl p-8">
                <h2 className="text-3xl font-gloria text-[#1135F3] mb-4">Find Teachers</h2>
                <p className="text-lg font-verdana text-gray-800 max-w-xl mb-6">
                  We are searching for passionate educators who are eager to share their knowledge 
                  and make a lasting impact by teaching English to children in need around the globe.
                </p>
                <Link 
                  href="/apply_to_teach"
                  className="inline-flex items-center gap-2 bg-white/80 rounded-full px-6 py-3 text-lg font-gloria text-gray-800 hover:bg-white/90 transition-all group-hover:translate-x-1"
                >
                  Apply to Teach
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                    <path d="M12 4L20 12L12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>

              {/* Schools Section */}
              <div className="relative group backdrop-blur-sm bg-white/30 rounded-3xl p-8">
                <h2 className="text-3xl font-gloria text-[#53A21A] mb-4">Find Schools</h2>
                <p className="text-lg font-verdana text-gray-800 max-w-xl mb-6">
                  We aim to connect with schools in underserved regions, providing them with access 
                  to resources, support, and transformative learning opportunities.
                </p>
                <Link 
                  href="/register_school"
                  className="inline-flex items-center gap-2 bg-white/80 rounded-full px-6 py-3 text-lg font-gloria text-gray-800 hover:bg-white/90 transition-all group-hover:translate-x-1"
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
        </div>
      </div>
    </GuestLayout>
  )
}