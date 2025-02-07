import type { Metadata } from 'next'
import GuestLayout from '@/components/layout/GuestLayout'
import Image from 'next/image'
import PageTitle from '@/components/shared/PageTitle'
import WhoWeAre from '@/components/about/WhoWeAre'
import Beginning from '@/components/about/Beginning'
import Prakash from '@/components/about/Prakash'
import VideoPage from '@/components/about/VideoPage'
import ScrollToTop from '@/components/shared/ScrollToTop'

export const metadata: Metadata = {
  title: 'About Us - LEDU',
}

interface AboutPageProps {
  assets: Record<string, string>;
  showImpactVideo?: boolean;
}

// This would typically come from your API or environment variables
const defaultProps: AboutPageProps = {
  assets: {
    videoUrl: '/path-to-video.mp4',
    thumbnailUrl: '/path-to-thumbnail.jpg'
  },
  showImpactVideo: true
}

export default function AboutPage() {
  // In Next.js 14, you would typically fetch this data using Server Components
  const { assets, showImpactVideo } = defaultProps;

  return (
    <GuestLayout>
      {/* Hero Section */}
      <>
        <Image 
          src="/storage/about-us-hero.jpeg" 
          alt="About Us Hero"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/40" />
        
        <div className="relative z-10 container mx-auto px-4 pt-52">
          <PageTitle className="text-center text-white">About Us</PageTitle>
        </div>
      </>

      {/* Main Content */}
      <main>
        <WhoWeAre />
        <Beginning />
        <Prakash />
        {showImpactVideo && (
          <VideoPage 
            videoUrl={assets.videoUrl}
            thumbnailUrl={assets.thumbnailUrl}
          />
        )}
      </main>
      
      <ScrollToTop />
    </GuestLayout>
  );
}