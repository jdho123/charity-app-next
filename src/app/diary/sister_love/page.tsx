'use client';
import Image from 'next/image';
import OpenDiaryLayout from '@/components/sections/diary/layout';
import DiarySisterLove from '@/components/sections/diary/diarySisterLove';

export default function DiaryPage1() {
  // Left page content - just text, no image container
  const leftPageContent = (
    <>
      {/* Title */}
      <h2 className="text-2xl font-handwriting text-[#B51B6F] mb-4 ml-20">
        A Sister&apos;s Love Amidst Loss
      </h2>
      {/* Position text underneath where image will appear */}
      <div className="h-52"></div>{' '}
      {/* This creates space for the image that will be positioned absolutely */}
      {/* Paragraph 1 */}
      <p className="text-sm text-[#83094E] pt-8 ml-20">
        Two twin sisters lost their parents for reasons that are still unknown at a very young age
        before they were even old enough to look after themselves. Suffering from hunger, the
        children started eating the red clay coming off the walls of the house they were living in,
        which were becoming wet as a consequence of the monsoon season.
      </p>
    </>
  );

  // Right page content
  const rightPageContent = (
    <>
      {/* Paragraph 2 */}
      <p className="text-sm text-[#83094E] mb-6 ml-4 pr-20 mt-8">
        They were tempted by it because there is iron in clay, which makes one feel full. But
        tragically, eating it was poisonous. The younger sister of the two twins died of
        malnutrition whilst the older was fortunately discovered before it would be too late.
      </p>

      <p className="text-sm text-[#83094E] mb-6 ml-4 pr-20 mt-8">
        This story reminds us of the urgency of our work and why every moment counts. Through Impact
        Schools, the older sister found hope and a future, showing that even in the darkest
        circumstances,
        <span className="font-bold"> education can light the way.</span>
      </p>
    </>
  );

  return (
    <div className="relative">
      {/* The image of children positioned absolutely to match the frame in the background */}

      <OpenDiaryLayout
        pageImage={<DiarySisterLove className="w-full h-full" />}
        prevHref="/diary"
        nextHref="/diary/not_forgotten"
        prevLabel="Close Diary"
        nextLabel="Next Page"
        backgroundImage="/images/diarySisterLove.png"
      />
    </div>
  );
}
