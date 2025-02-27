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
  const [windowWidth, setWindowWidth] = useState(1200) // Default window width
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isMovingCard, setIsMovingCard] = useState<number | null>(null)

  // Measure the width of the cards and the window
  const updateMeasurements = () => {
    if (cardRef.current) {
      const width = cardRef.current.offsetWidth
      setCardWidth(width)
    }
    
    // Update window width
    setWindowWidth(window.innerWidth)
  }

  // Calculate positions when window resizes or on mount
  useEffect(() => {
    // Initial measurement
    updateMeasurements()
    
    // Update on window resize
    const handleResize = () => {
      updateMeasurements()
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

  // Calculate responsive arrow positions based on screen size
  const getArrowOffset = () => {
    if (windowWidth < 640) return '85px';       // Small mobile
    if (windowWidth < 768) return '85%';        // Mobile - percentage based
    if (windowWidth < 1024) return '90%';       // Tablet - percentage based
    if (windowWidth < 1280) return '95%';       // Small desktop - percentage based
    return '320px';                             // Large desktop
  }

  // Calculate responsive card spacing based on screen size
  const getCardSpacing = () => {
    if (windowWidth < 640) return 1.0;  // Less spacing on mobile
    return 1.4;                         // Full spacing on desktop
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4">
      <div className="relative w-full">
        {/* Left Navigation Button */}
        <button 
          onClick={previousCard}
          className={`absolute transition-opacity duration-500 ease-in-out z-30 ${isAtStart ? 'opacity-30 cursor-not-allowed' : ''}`}
          style={{ 
            opacity: isAtStart ? 0 : 1,
            top: '50%',
            transform: 'translateY(-50%)',
            // Dynamic positioning based on screen size
            left: windowWidth < 640 ? '8px' : 
                  windowWidth < 768 ? '12px' : 
                  windowWidth < 1024 ? '100px' : 
                  windowWidth < 1280 ? '200px' : 
                  'calc(50% - 320px)'
          }}
          aria-label="Previous campaign"
          disabled={isAnimating || isAtStart}
        >
          <Image 
            src="/images/leftArrowScroller.png" 
            alt="Previous campaign"
            width={100}
            height={100}
            className="w-[50px] h-[50px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px]"
          />
        </button>

        {/* Right Navigation Button */}
        <button 
          onClick={nextCard}
          className={`absolute transition-opacity duration-500 ease-in-out z-30 ${isAtEnd ? 'opacity-30 cursor-not-allowed' : ''}`}
          style={{ 
            opacity: isAtEnd ? 0 : 1,
            top: '50%',
            transform: 'translateY(-50%)',
            // Dynamic positioning based on screen size
            right: windowWidth < 640 ? '8px' : 
                   windowWidth < 768 ? '12px' : 
                   windowWidth < 1024 ? '100px' : 
                   windowWidth < 1280 ? '200px' : 
                   'calc(50% - 320px)'
          }}
          aria-label="Next campaign"
          disabled={isAnimating || isAtEnd}
        >
          <Image 
            src="/images/rightArrowScroller.png" 
            alt="Next campaign"
            width={100}
            height={100}
            className="w-[50px] h-[50px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px]"
          />
        </button>
            
        <div ref={containerRef} className="relative w-full overflow-hidden" style={{ 
          height: '700px',
        }}>
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
              
              // Calculate the card positions with responsive spacing
              const spacing = getCardSpacing()
              
              // Set card size based on screen size
              const cardSize = windowWidth < 500 ? {width: '260px', height: '390px'} :
                             windowWidth < 768 ? {width: '300px', height: '430px'} :
                             windowWidth < 1024 ? {width: '330px', height: '470px'} :
                             {width: '350px', height: '500px'};
              
              switch (position) {
                case -1: // Left card (visible)
                  xOffset = -cardWidth * spacing 
                  opacity = windowWidth < 768 ? 0 : 1 // Hide side cards on very small screens
                  scale = windowWidth < 768 ? 0.9 : 1 // Slightly smaller on tablet
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
                  xOffset = cardWidth * spacing
                  opacity = windowWidth < 768 ? 0 : 1 // Hide side cards on very small screens
                  scale = windowWidth < 768 ? 0.9 : 1 // Slightly smaller on tablet
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
                  className={`absolute top-1/2 left-1/2 ${transitionClass} rounded-3xl overflow-hidden shadow-lg`}
                  style={{ 
                    transform: `translate(calc(-50% + ${xOffset}px), -50%) scale(${scale})`,
                    opacity,
                    zIndex,
                    backgroundColor: bgColor,
                    width: cardSize.width,
                    maxWidth: '90%'
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