'use client'
import { useState, useCallback } from 'react'
import CampaignCard from '@/components/fundraisers/CampaignCard'

interface Campaign {
  id: number
  title: string
  goal: number
  raised: number
  imageUrl: string
  description: string
  status: 'active' | 'completed'
}

interface CampaignScrollerProps {
  campaigns: Campaign[]
}

export default function CampaignScroller({ campaigns }: CampaignScrollerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const normalizedIndex = ((currentIndex % campaigns.length) + campaigns.length) % campaigns.length

  const visibleCampaigns = [...campaigns, ...campaigns, ...campaigns].slice(
    normalizedIndex + campaigns.length - 1,
    normalizedIndex + campaigns.length + 2
  )

  const nextCard = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % campaigns.length)
  }, [campaigns.length])

  const previousCard = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + campaigns.length) % campaigns.length)
  }, [campaigns.length])

  const getCardStyles = (index: number) => {
    const opacity = index === 1 ? 1 : 0.5
    const scale = index === 1 ? 1 : 0.95
    const translateX = index === 0 ? '50%' : index === 2 ? '-50%' : '0'
    const zIndex = index === 1 ? 2 : 1

    return {
      opacity,
      transform: `scale(${scale}) translateX(${translateX})`,
      zIndex
    }
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div className="relative px-16">
        {/* Navigation Buttons */}
        <button 
          onClick={previousCard}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
          aria-label="Previous campaign"
        >
          <span className="text-6xl font-bold">←</span>
        </button>

        {/* Cards Container */}
        <div className="overflow-visible">
          <div 
            className="flex"
            style={{ transform: 'translateX(-100%)' }}
          >
            {visibleCampaigns.map((campaign, index) => (
              <div 
                key={`${campaign.id}-${index}`}
                className="w-full flex-none px-4 transition-transform duration-500 ease-in-out"
                style={getCardStyles(index)}
              >
                <div className="max-w-[400px] mx-auto relative">
                  <CampaignCard {...campaign} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={nextCard}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
          aria-label="Next campaign"
        >
          <span className="text-6xl font-bold">→</span>
        </button>
      </div>
    </div>
  )
}