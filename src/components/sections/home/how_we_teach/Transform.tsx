import * as React from 'react';
import Image from 'next/image';
import GloriaTitle from '@/components/shared/GloriaTitle';
import Sprite from '@/components/animation/Sprite';

export function TransformSection() {
  return (
    <section className="w-full max-w-[1257px] px-4 sm:px-6 mt-16 sm:mt-24 lg:mt-32 mb-4">
      <div className="flex gap-10 max-md:flex-col">
        <div className="w-[55%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col max-md:mt-10 max-md:max-w-full">
            <Sprite
              totalFrames={24}
              frameWidth={385}
              frameHeight={385}
              scale={1}
              className="self-center w-[80%] object-contain"
              imagePath="/animated/arrow2smooth.png"
            />
            <div className="mt-10 lg:mt-20 w-full overflow-hidden rounded-[30px]">
              <Image
                src="/images/kidsWithHandUp.jpeg"
                alt="Children transforming through education"
                width={800}
                height={480}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mobile order change: On mobile, this div comes first */}
        <div className="w-full lg:w-[45%] order-1 lg:order-2">
          <div className="flex flex-col text-black lg:-mt-12">
            <div className="w-full relative mb-4">
              <Image
                src="/images/greenTree.png"
                alt="Decorative element"
                width={206}
                height={167}
                className="object-contain w-[140px] sm:w-[170px] md:w-[206px]"
              />
            </div>
            <GloriaTitle
              as="h2"
              color="black"
              size="6xl"
              className="self-start text-4xl sm:text-5xl lg:text-6xl"
            >
              Transform
            </GloriaTitle>
            <h3 className="font-gloria text-xl sm:text-2xl lg:text-3xl leading-tight sm:leading-normal lg:leading-[50px] mt-4 mb-6 lg:mb-10 max-w-[600px]">
              How do we help children grow beyond their circumstances?
            </h3>

            <div className="pl-4 sm:pl-6 border-l-4 border-[#3E6F1B] text-base sm:text-lg lg:text-xl font-urbanist">
              <p className="mb-4 sm:mb-6">
                Through fundraisers, we provide essential resources like Wi-Fi, books, and sports
                equipment that make learning possible.
              </p>
              <p className="mb-4 sm:mb-6">
                Our efforts extend beyond education; we aim to transform lives by helping children
                dream bigger and giving them the tools to achieve those dreams.
              </p>
              <p className="mb-8 lg:mb-0">
                For many, our lessons become a source of joy and hope, sparking a belief that their
                circumstances can change for the better.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
