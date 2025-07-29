import * as React from 'react';
import { RoundedImage } from '../../../shared/RoundedImage';
import BorderedText from '@/components/shared/BorderedText';

export function TeachSection() {
  return (
    <section className="self-end w-full max-w-[1174px] px-4 sm:px-6 lg:px-4 max-md:hidden">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="w-full lg:w-[45%]">
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
        <div className="w-full lg:w-[55%] mt-8 lg:mt-0">
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
