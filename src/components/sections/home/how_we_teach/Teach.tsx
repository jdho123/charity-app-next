import * as React from 'react';
import Image from 'next/image';
import { RoundedImage } from '../../../shared/RoundedImage';
import BorderedText from '@/components/shared/BorderedText';

export function TeachSection() {
  return (
    <section className="self-end w-full max-w-[1174px] px-4 sm:px-6 lg:px-4">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="relative w-full lg:w-[45%] order-2 lg:order-1">
          <Image
            src="/images/greenQuotes.png"
            alt="Quote"
            width={80}
            height={60}
            className="absolute -top-6 -left-4 sm:-top-10 sm:-left-10 opacity-30 w-16 h-12 sm:w-20 sm:h-16"
          />
          <Image
            src="/images/quote-right.png"
            alt="Quote"
            width={80}
            height={60}
            className="absolute -bottom-6 -right-4 sm:-bottom-10 sm:-right-10 opacity-30 w-16 h-12 sm:w-20 sm:h-16"
          />
          <div className="pl-4 border-l-4 border-[#3E6F1B] font-urbanist">
            <p className="text-base sm:text-lg lg:text-xl text-black mb-4 sm:mb-6">
              Our lessons are interactive and tailored to the children&apos;s needs. We use creative
              methods like role-playing, singing, storytelling, and collaborative activities to make
              learning fun and engaging.
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-black mb-4 sm:mb-6">
              Topics are aligned with the local curriculum, ensuring that lessons are both relevant
              and inspiring.
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-black">
              Beyond just teaching English, we help children build confidence, teamwork skills, and
              the ability to imagine a brighter future.
            </p>
          </div>
        </div>
        <div className="w-full lg:w-[55%] mt-8 lg:mt-0 order-1 lg:order-2">
          <RoundedImage
            src="/images/suprisedManWithKids.jpeg"
            alt="Interactive teaching session"
            className="w-full aspect-[1.67]"
            width={700}
            height={420}
          />
        </div>
      </div>
    </section>
  );
}
