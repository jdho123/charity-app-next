'use client'
import IntroScreen from '@/components/shared/IntroScreen'

export default function TeacherIntroPage() {
  return (
    <IntroScreen
      title="Join as a Teacher"
      description="We are looking for experienced and passionate teachers to deliver online English lessons to children eager to learn. Share your knowledge and make a difference in their lives."
      buttonText="Complete the Survey"
      buttonLink="/apply_to_teach/application"
      imageSrc="/images/teacherDrawing.png"
      imageAlt="Teacher pointing at blackboard"
      backgroundColor="linear-gradient(180deg, #163E42 0%, #31848C 100%)"
      imageWidth={1080}
      imageHeight={1400}
      rightSideContent={true}
    />
  )
}