'use client';
import Image from 'next/image';
import OpenDiaryLayout from '@/components/sections/diary/layout';
import DiaryTransformation from '@/components/sections/diary/diaryTransformation';

export default function DiaryPage3() {
  // Left page content - just text, no image container
  const leftPageContent = (
    <>
      {/* Title */}
      <h2 className="text-4xl font-handwriting text-[#4C8217] mb-4 ml-28">
        FROM TRADEGY TO TRANSFORMATION
      </h2>
    </>
  );

  // Right page content
  const rightPageContent = (
    <>
      {/* Paragraph 1 */}
      <p className="text-sm text-[#000000] pt-4 -mt-8 ml-4 pr-64 mr-4">
        Another girl was brought up in a violent household. She would have to watch her mother and
        father argue every day up until she witnessed her mother kill her father, throwing a knife
        into his chest amid an argument. The child didn&apos;t take her eyes off her father as he
        bled to death. Both the mother and the child were taken away to prison.
      </p>

      {/* Paragraph 2 */}
      <p className="text-sm text-[#000000] ml-4 pr-24 mt-4">
        Before long, the child was taken up by Impact Schools. The mother though, even once she left
        the prison, could never return to the village or look after her daughter.
      </p>

      <p className="text-sm text-[#000000] mb-6 ml-4 pr-20 mt-4">
        Now safe and supported, this young girl is thriving at Impact Schools. Her journey shows the
        transformative power of a safe environment and the opportunities that education can provide.
      </p>
    </>
  );

  return (
    <div className="relative">
      {/* The image of children positioned absolutely to match the frame in the background */}

      <OpenDiaryLayout
        pageImage={<DiaryTransformation className="w-full h-full" />}
        prevHref="/diary/not_forgotten"
        nextHref="/diary/seven_oranges"
        prevLabel="Prev Page"
        prevLabel2_mobile="Prev Page"
        nextLabel="Next Page"
        nextLabel2_mobile="Next Page"
        backgroundImage="/images/diaryTransformation.png"
      />
    </div>
  );
}
