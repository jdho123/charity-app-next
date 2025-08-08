import Link from 'next/link';
import Button from '@/components/shared/Button';
import Image from 'next/image';
import BorderedText from '@/components/shared/BorderedText';

export default function WhatWeDo() {
  return (
    <section className="flex flex-col md:flex-row items-center lg:items-start">
      <div className="md:w-2/3 mb-2 md:mb-0">
        <div className="flex items-center mb-2 sm:mb-4">
          <h2 className="text-2xl md:text-3xl font-gloria text-white mr-4">What We Do</h2>
          <Link href="/about#what-we-do">
            <Image
              src="/images/rightArrow.png"
              alt="Right arrow"
              width={48}
              height={24}
              className="object-contain h-6 md:h-8 w-auto"
            />
          </Link>
        </div>
        <BorderedText
          className="text-[2vmax] md:text-xl text-black/80 font-urbanist font-semibold"
          lineColor="white"
        >
          The cornerstone of our work is providing education to children in developing areas through
          online lessons tailored to their needs, while also furnishing resources such as internet
          connectivity and books to encourage lifelong learning.
        </BorderedText>
      </div>
      <div className="md:w-1/3 md:pl-6 flex justify-center">
        <Link href="/fundraisers" className="inline-block">
          <Button
            variant="primary"
            className="text-base md:text-xl py-3 px-6 rounded-full bg-red-600 hover:bg-red-700 text-white border-none"
          >
            Support the Cause
          </Button>
        </Link>
      </div>
    </section>
  );
}
