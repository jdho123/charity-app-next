'use client';
import DiaryChristmas from '@/components/sections/diary/diaryChristmas';
import OpenDiaryLayout from '@/components/sections/diary/layout';

export default function DiaryPage5() {
  // Left page content - just text, no image container
  const leftPageContent = (
    <>
      {/* Title */}
      <h2 className="text-3xl font-handwriting text-[#FFDD00] mb-0 ml-24 pl-28 -mt-12">
        The Light of Christmas
      </h2>

      {/* Paragraph 1 */}
      <p className="text-xs text-[#FFEF9A] pt-0 pl-24 ml-20">
        During the same visit, which happened to be around Christmas, we brought string lights to
        decorate the school. We wanted to surprise the children and create a moment of joy amidst
        their daily struggles. As we started setting up the lights, one curious child peeked out
        from behind a door. His face lit up with wonder, scanning the room to ensure no teachers
        were nearby before stepping out further. His eyes widened slightly, and a sincere smile
        stretched from ear to ear.
      </p>
    </>
  );

  // Right page content
  const rightPageContent = (
    <>
      {/* Paragraph 2 */}
      <p className="text-xs text-[#FFEF9A] ml-60 pr-16 mt-12">
        Moments later, more children began to gather, their faces glowing with excitement and
        amazement. Their laughter and joy filled the room as they took in the simple yet magical
        transformation of their school. It was just a stretch of string lights—nothing compared to
        the grand decorations in cities—but to these children, it was a beacon of hope and
        happiness.
      </p>

      <p className="text-xs text-[#FFEF9A] ml-8 pr-20 mt-8">
        This small act of giving resonated with us long after that evening. It reminded us that even
        the simplest gestures can spark immense joy and provide a sense of wonder. The
        children&apos;s smiles and laughter renewed our commitment to the project, showing us the
        profound impact that love, attention, and small acts of kindness can have on their lives.
      </p>
    </>
  );

  return (
    <div className="relative">
      {/* The image of children positioned absolutely to match the frame in the background */}

      <OpenDiaryLayout
        pageImage={<DiaryChristmas className="w-full h-full" />}
        prevHref="/diary/seven_oranges"
        nextHref="/diary"
        prevLabel="Prev Page"
        nextLabel="Close Diary"
        backgroundImage="/images/diaryChristmas.png"
      />
    </div>
  );
}
