import * as React from "react";
import Image from "next/image";
import { RoundedImage } from "../../../shared/RoundedImage";
import BorderedText from "@/components/shared/BorderedText";
import GloriaTitle from "@/components/shared/GloriaTitle";

export function ConnectSection() {
  return (
    <>
      {/* Hero Connect Section - Following the reference design */}
      <div className="relative w-full max-w-[1138px] mb-20 max-md:mb-10">
        <div className="flex flex-wrap items-start gap-8 max-md:flex-col">
          {/* Left column - Icon and titles */}
          <div className="w-[45%] max-md:w-full">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-8">
                <Image
                  src="/images/greenHandshake.png"
                  alt="Connect icon"
                  width={110}
                  height={110}
                  className="object-contain"
                />
                <div className="flex flex-col">
                  <GloriaTitle as="h2" color="black" size="6xl" className="mb-1">
                    Connect
                  </GloriaTitle>
                  <p className="text-2xl font-gloria text-black leading-tight">
                    How do we create connections that inspire children?
                  </p>
                </div>
              </div>
              
              <Image
                src="/images/rightArrowTeach.png"
                alt="Connect illustration"
                width={180}
                height={40}
                className="ml-auto mr-20 mb-10 max-md:hidden"
              />
              
              <RoundedImage
                src="/images/whatWeDoVideo.png"
                alt="Children connecting with teachers"
                className="w-full aspect-[1.65]"
                width={550}
                height={333}
              />
            </div>
          </div>

          {/* Right column - Quote and description */}
          <div className="w-[45%] max-md:w-full flex flex-col mt-10">
            <div className="relative">
              <Image
                src="/images/quoteMark.png"
                alt="Quote"
                width={80}
                height={60}
                className="absolute -top-10 -left-10 opacity-30"
              />
              <div className="pl-4 border-l-4 border-[#3E6F1B]">
                <p className="text-xl text-black mb-6">
                  We show children that someone outside their community truly cares
                  about them.
                </p>
                <p className="text-xl text-black mb-6">
                  This connection sparks a sense of belonging and hope, encouraging
                  them to dream of a better future.
                </p>
                <p className="text-xl text-black">
                  By bridging the gap between children and teachers from different
                  parts of the world, we prove that care knows no boundaries.
                </p>
              </div>
            </div>
            
            <Image
              src="/images/swirlyArrow.png"
              alt="Swirly Arrow"
              width={300}
              height={230}
              className="ml-auto mt-12 max-w-[80%]"
            />
          </div>
        </div>
      </div>

      {/* Teach Section Title - Following the reference design */}
      <div className="w-full max-w-[1138px] mt-20 mb-10 max-md:mt-10">
        <div className="flex items-center gap-6">
          <Image
            src="/images/greenComputer.png"
            alt="Teach icon"
            width={120}
            height={100}
            className="object-contain"
          />
          <div className="flex flex-col">
            <GloriaTitle as="h2" color="black" size="6xl" className="mb-1">
              Teach
            </GloriaTitle>
            <p className="text-2xl font-gloria text-black leading-tight">
              What makes our lessons unforgettable?
            </p>
          </div>
        </div>
      </div>
    </>
  );
}