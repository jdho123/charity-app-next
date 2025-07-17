"use client";

import Sprite from "@/components/animation/Sprite";
import Link from "next/link";
import React from "react";

const DiarySection: React.FC = () => {
  return (
    <section className="relative z-10 mx-auto mt-8 max-w-full w-[85%] md:w-[75%] lg:w-[628px] pb-8 px-4">
      <Link href="/diary" className="block">
        <div className="flex gap-5 items-center">
          <div className="w-[70%] lg:w-[66%] min-w-0">
            <h2 className="self-stretch my-auto text-4xl lg:text-5xl text-right font-gloria text-white underline border-white ">
              Read The Diary
            </h2>
          </div>
          <div className="ml-5 w-[30%] max-md:ml-0 max-md:w-full">
            <div className="relative w-full max-md:mt-7">
              <Sprite
                totalFrames={10}
                frameWidth={550}
                frameHeight={300}
                scale={0.2}
                className="object-contain"
                imagePath="/animated/arrow3.png"
              />
              {/* <Image
                src="/images/heartArrow.png"
                alt="Diary icon"
                fill
                className="object-contain"
              /> */}
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default DiarySection;
