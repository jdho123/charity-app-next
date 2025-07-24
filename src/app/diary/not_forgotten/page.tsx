'use client';
import DiaryNotForgotten from '@/components/sections/diary/diaryNotForgotten';
import OpenDiaryLayout from '@/components/sections/diary/layout';

export default function DiaryPage2() {
  // Left page content - just text, no image container
  const leftPageContent = (
    <>
      {/* Title */}
      <h2 className="text-2xl font-handwriting text-[#973F07] -mt-4 ml-20">
        Alone But Not Forgotten
      </h2>

      {/* Paragraph 1 */}
      <p className="text-sm text-[#532000] pt-8 pr-56 ml-20">
        Another child&apos;s father moved to India to earn money that he could regularly send back
        to sustain his family. Whilst away, he tragically passed away before being able to see how
        the hard-earned remittances improved his family&apos;s life.
      </p>

      {/* Paragraph 2 */}
      <p className="text-sm text-[#532000] pt-16 ml-24">
        His wife quickly remarried and shut the child off from her life. The little girl is not
        allowed to come to her mother&apos;s house. The mother is living a different life with a
        different family and has not once come to visit the girl who&apos;s been left alone, all by
        herself in this world.
      </p>
    </>
  );

  // Right page content
  const rightPageContent = (
    <>
      {/* Paragraph 2 */}
      <p className="text-sm text-[#532000] mb-6 ml-4 pr-24 mt-24">
        Impact Schools stepped in to provide her with a community that cares, offering her a sense
        of belonging and the tools to dream of a better future. Her story is a testament to the
        resilience of the human spirit and the power of collective action.
      </p>
    </>
  );

  return (
    <div className="relative">
      {/* The image of children positioned absolutely to match the frame in the background */}

      <OpenDiaryLayout
        pageImage={<DiaryNotForgotten className="w-full h-full" />}
        prevHref="/diary/sister_love"
        nextHref="/diary/transformation"
        prevLabel="Prev Page"
        nextLabel="Next Page"
        backgroundImage="/images/diaryNotForgotten.png"
      />
    </div>
  );
}
