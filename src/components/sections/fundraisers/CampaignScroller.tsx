'use client'
import { useState, useRef, useEffect } from 'react'
import CampaignCard from '@/components/sections/fundraisers/CampaignCard'
import Image from 'next/image'
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
  const [isAnimating, setIsAnimating] = useState(false)
  const [cardWidth, setCardWidth] = useState(400) // Default width
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isMovingCard, setIsMovingCard] = useState<number | null>(null)

  // Measure the width of the cards
  const measureCardWidth = () => {
    if (cardRef.current) {
      const width = cardRef.current.offsetWidth
      setCardWidth(width)
      return width
    }
    return cardWidth // Return current state if ref not available
  }

  // Calculate positions when window resizes or on mount
  useEffect(() => {
    // Initial measurement
    measureCardWidth()
    
    // Update on window resize
    const handleResize = () => {
      measureCardWidth()
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const nextCard = () => {
    if (isAnimating || currentIndex >= campaigns.length - 1) return
    setIsAnimating(true)
    setIsMovingCard(currentIndex)
    
    setCurrentIndex((prev) => prev + 1)
    setTimeout(() => {
        setIsAnimating(false)
        setIsMovingCard(null)
      }, 500)
  }

  const previousCard = () => {
    if (isAnimating || currentIndex <= 0) return
    setIsAnimating(true)
    setIsMovingCard(currentIndex - 1)
    setCurrentIndex((prev) => prev - 1)
    setTimeout(() => {
        setIsAnimating(false)
        setIsMovingCard(null)
      }, 500)
  }

  // Handle edge case of empty or single campaign
  if (campaigns.length === 0) {
    return <div>No campaigns available</div>
  }

  // Calculate position based on distance from current index without looping
  const getCardPosition = (index: number) => {
    return index - currentIndex
  }

  // Check if buttons should be disabled
  const isAtStart = currentIndex === 0
  const isAtEnd = currentIndex === campaigns.length - 1

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div className="relative w-full">
        {/* Left Navigation Button */}
        <button 
          onClick={previousCard}
          className={`absolute transition-opacity duration-500 ease-in-out left-1/2 top-1/2 -translate-y-1/2 -translate-x-[320px] z-30 ${isAtStart ? 'opacity-30 cursor-not-allowed' : ''}`}
          aria-label="Previous campaign"
          style={{ opacity: isAtStart ? 0 : 1 }}
          disabled={isAnimating || isAtStart}
        >
          <Image 
            src="/images/leftArrowScroller.png" 
            alt="Previous campaign"
            width={100}
            height={100}
            className="w-[100px] h-[100px]"
          />
        </button>

        {/* Right Navigation Button */}
        <button 
          onClick={nextCard}
          className={`absolute transition-opacity duration-500 ease-in-out right-1/2 top-1/2 -translate-y-1/2 translate-x-[320px] z-30 ${isAtEnd ? 'opacity-30 cursor-not-allowed' : ''}`}
          style={{ opacity: isAtEnd ? 0 : 1 }}
          aria-label="Next campaign"
          disabled={isAnimating || isAtEnd}
        >
          <Image 
            src="/images/rightArrowScroller.png" 
            alt="Next campaign"
            width={100}
            height={100}
            className="w-[100px] h-[100px]"
          />
        </button>
            
        <div ref={containerRef} className="relative h-[650px] w-full overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {campaigns.map((campaign, index) => {
              // Calculate position relative to current without looping
              const position = getCardPosition(index)
              
              // Define visual properties based on position
              let xOffset = 0
              let zIndex = 10
              let opacity = 1
              let scale = 1
              let bgColor = "transparent"
              const transitionClass = "transition-all duration-500 ease-in-out"
              
              // Calculate the card positions to match the design
              switch (position) {
                case -1: // Left card (visible)
                  xOffset = -cardWidth * 1.4 // Move left by 1.4x the card width
                  opacity = 1
                  scale = 1
                  zIndex = 10
                  bgColor = "#E6F0F9" // Light blue background from mockup
                  break;
                case 0: // Center/active card
                  xOffset = 0
                  opacity = 1
                  scale = 1
                  zIndex = 20
                  bgColor = "#CEEAF9" // Medium blue background from mockup
                  break;
                case 1: // Right card (visible)
                  xOffset = cardWidth * 1.4 // Move right by 1.4x the card width
                  opacity = 1
                  scale = 1
                  zIndex = 10
                  bgColor = "#E6F0F9" // Light blue background from mockup
                  break;
                default:
                  // Cards that are not visible in the current view
                  opacity = 0
                  scale = 1
                  zIndex = 0
                  // Position them far off to the sides
                  xOffset = position < 0 ? -cardWidth * 3 : cardWidth * 3
                  break;
              }
              
              // For the first card, add a ref to measure its width
              const isFirstCard = index === 0
              
              return (
                <div 
                  key={`card-${campaign.id}`}
                  ref={isFirstCard ? cardRef : null}
                  className={`absolute top-1/2 left-1/2 w-full max-w-[400px] ${transitionClass} rounded-3xl overflow-hidden shadow-lg`}
                  style={{ 
                    transform: `translate(calc(-50% + ${xOffset}px), -50%) scale(${scale})`,
                    opacity,
                    zIndex,
                    backgroundColor: bgColor
                  }}
                >
                  <CampaignCard {...campaign} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}