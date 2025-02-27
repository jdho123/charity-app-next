'use client'
import IntroScreen from '@/components/shared/IntroScreen'

export default function SchoolIntroPage() {
  return (
    <IntroScreen
      title="Join as a School Partner"
      description="Partner with us to bring quality English education to your students. We offer tailored programs that complement your curriculum and help your students build confidence in their language skills."
      buttonText="Complete the Survey"
      buttonLink="/register_school/application"
      imageSrc="/images/schoolDrawing.png" // You'll need to create or add this image
      imageAlt="School building with students"
      backgroundColor="linear-gradient(180deg, #3D1809 0%, #6F4433 100%)"
      imageWidth={540}
      imageHeight={700}
      rightSideContent={true}
    />
  )
}