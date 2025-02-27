'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const DiarySection: React.FC = () => {
  return (
    <section className="relative z-10 mx-auto mt-8 max-w-full w-[85%] md:w-[75%] lg:w-[628px] pb-8 px-4">
      <Link href="/diary" className="block">
        <div className="flex gap-5 items-center">
          <div className="w-[66%] lg:w-[66%] min-w-0">
            <h2 className="self-stretch my-auto text-3xl md:text-4xl lg:text-5xl font-gloria text-white underline border-white ">
              Read The Diary
            </h2>
          </div>
          <div className="w-[34%] lg:w-[34%] flex-shrink-0">
            <div className="relative w-full h-[140px] md:h-[200px] lg:h-[200px]">
              <Image
                src="/images/heartArrow.png"
                alt="Diary icon"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default DiarySection;