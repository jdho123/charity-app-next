import Image from 'next/image';
import Button from '@/components/shared/Button';

interface WhatWeDoProps {
  onWatchVideo: () => void;
}

export default function WhatWeDo({ onWatchVideo }: WhatWeDoProps) {
  return (
    <section className="bg-white py-20" id="what-we-do">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl text-[#31848C] font-gloria">What We Do</h2>
            <p className="text-xl font-urbanist max-w-lg">
              We provide education to children who are missing out on its fruits. Through
              partnerships with schools in areas affected by humanitarian crises, we deliver online
              lessons tailored to their needs. These lessons have covered subjects like English,
              music, geography, and applied mathematics, and we aim to expand this variety based on
              what the children need most.
            </p>

            <div className="pt-4">
              <Button variant="primary" className="text-xl" onClick={onWatchVideo}>
                Watch the Video
              </Button>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/images/whatWeDoVideo.png"
              alt="What We Do"
              width={800}
              height={600}
              className="rounded-[50px] w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
