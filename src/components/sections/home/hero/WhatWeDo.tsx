import Link from 'next/link'
import Button from '@/components/shared/Button'


export default function WhatWeDo() {
  return (
    <section className="flex flex-col md:flex-row items-center">
        <div className="md:w-2/3 mb-6 md:mb-0">
            <div className="flex items-center mb-4">
                <h2 className="text-2xl md:text-3xl font-gloria text-white mr-4">What We Do</h2>
                <div className="h-0.5 w-12 bg-white"></div>
            </div>
            <p className="text-base md:text-xl text-black/80 font-verdana">
                We provide education to children in humanitarian crisis areas through online lessons tailored to their needs, 
                while also supporting their communities with resources like WiFi, books, and other.
            </p>
            </div>
            <div className="md:w-1/3 md:pl-6 flex justify-center">
            <Link href="/fundraisers" className="inline-block">
                <Button variant="primary" className="text-lg md:text-xl py-3 px-6 rounded-full bg-red-600 hover:bg-red-700 text-white border-none">
                Support the Cause
                </Button>
            </Link>
        </div>
        
    </section>
  )
}