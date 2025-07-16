import * as React from "react";
import Image from "next/image";
import PageTitle from "@/components/shared/PageTitle";

export function HeroSection() {
  return (
    // Min height set to 200 due to image height
    <header className="hidden relative lg:flex flex-col w-full px-6 pl-20 max-md:px-5 max-md:max-w-full min-h-[400px]">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/KidStoriesFooter-adjusted.png"
          alt="Background image for How We Teach section"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      <div className="relative z-10 flex justify-between items-start self-end w-full gap-5 max-w-[1295px] py-8 max-sm:py-4 max-md:max-w-full top-0">
        <PageTitle className="text-white whitespace-nowrap min-w-0 text-[clamp(1.5rem,5vw,3rem)]">
          How We Teach: <br /> Our Approach
        </PageTitle>
      </div>
      
      {/* Connect section moved to Connect.tsx */}
    </header>
  );
}