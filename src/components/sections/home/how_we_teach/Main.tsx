import * as React from "react";
import Image from "next/image";
import PageTitle from "@/components/shared/PageTitle";

export function HeroSection() {
  return (
    // Min height set to 200 due to image height
    <header className="relative flex flex-col w-full px-6 pl-20 max-md:px-5 max-md:max-w-full min-h-[200px]">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/KidStoriesFooter.png"
          alt="Background image for How We Teach section"
          width={1200}
          height={300}
          style={{
            width: '100%',
            height: 'auto'
          }}
          className="object-cover"
          priority
        />
      </div>
      
      <div className="relative z-10 flex flex-wrap justify-between items-start self-end w-full gap-5 max-w-[1295px]  py-8 max-md:my-10 max-md:max-w-full">
        <PageTitle className="text-white">
          How We Teach: Our Approach
        </PageTitle>
      </div>
      
      {/* Connect section moved to Connect.tsx */}
    </header>
  );
}