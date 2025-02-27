"use client";

import Sprite from "@/components/animation/Sprite";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DiarySection: React.FC = () => {
  return (
    <section className="relative z-10 self-center mt-8 ml-32 max-w-full w-[628px] pb-8 max-md:ml-0 max-md:px-4">
      <Link href="/diary" className="block">
        <div className="flex gap-5 items-center max-md:flex-col">
          <div className="w-[59%] max-md:ml-0 max-md:w-full">
            <h2 className="relative whitespace-nowrap self-stretch my-auto text-5xl font-gloria text-white border-b-2 border-white max-md:mt-10 max-md:text-4xl">
              Read The Diary
            </h2>
          </div>
          <div className="ml-5 w-[41%] max-md:ml-0 max-md:w-full">
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
