'use client'
import OpenDiaryLayout from '@/components/sections/diary/layout'

export default function DiaryPage4() {
  // Left page content - just text, no image container
  const leftPageContent = (
    <>
      {/* Title */}
      <h2 className="text-3xl font-handwriting text-[#FDAB39] mb-4 ml-32 pl-40">
        The Gift of Seven Oranges
      </h2>
      
      {/* Paragraph 1 */}
      <p className="text-xs text-[#7A3A12] pt-12 ml-24 mr-4">
      During one of our visits to Impact Schools, 
      we met a little boy who had just become a part of the orphanage. 
      He had suffered unbearable pain in the very long five years of his life. 
      First, he lost his father, who was imprisoned, and then his mother, 
      who tragically passed away from a heart attack while carrying 
      a heavy load on the road back home. With no one else to look after him, 
      his older sister became his sole caregiver.
      </p>

      <p className="text-xs text-[#7A3A12] pt-4 ml-36">
      During her visit to the orphanage, she brought him seven oranges—a rare 
      and precious gift for a child living in such challenging conditions.
       What happened next profoundly moved us.
      </p>
    </>
  )
  
  // Right page content
  const rightPageContent = (
    <>
      {/* Paragraph 2 */}
      <p className="text-sm text-[#7A3A12] mb-6 ml-4 pr-20 mt-8">
      The little boy walked up to one of us and, without hesitation, 
      handed over all seven oranges. His gesture wasn&apos;t out of
       abundance but a pure expression of gratitude for our presence and support.
      </p>
      
      <p className="text-sm text-[#7A3A12] mb-6 ml-4 pr-20 mt-4">
      This single event influenced us more deeply than any book, speech, or memory. 
      It showed us the boundless capacity for kindness that exists even 
      in the face of profound loss and adversity.
      </p>

      <p className="text-sm text-[#DB6B24] mb-6 ml-4 pr-20 mt-4">
      This single event influenced us more deeply than any book, speech, or memory. 
      It showed us the boundless capacity for kindness that exists even 
      in the face of profound loss and adversity.
      </p>
    </>
  )
  
  return (
    <div className="relative">
      {/* The image of children positioned absolutely to match the frame in the background */}

      
      <OpenDiaryLayout
        leftPageContent={leftPageContent}
        rightPageContent={rightPageContent}
        prevHref="/diary/transformation"
        nextHref="/diary/light_of_christmas"
        prevLabel="Prev Page"
        nextLabel="Next Page"
        backgroundImage="/images/diarySevenOranges.png"
      />
    </div>
  )
}