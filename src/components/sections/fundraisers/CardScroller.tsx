/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useState, useEffect, useRef, ReactNode } from 'react';

type CardStatus = 'active' | 'entering-left' | 'entering-right' | 'exiting-left' | 'exiting-right';

interface VisibleCard {
  id: string;
  index: number;
  status: CardStatus;
}

interface CardScrollerProps {
  cards: ReactNode[];
}

const CardScroller: React.FC<CardScrollerProps> = ({ cards = [] }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [visibleCards, setVisibleCards] = useState<VisibleCard[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cleanupTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize visible cards on mount and when cards array changes
  useEffect(() => {
    if (cards.length > 0) {
      setVisibleCards([{ id: `card-${currentIndex}`, index: currentIndex, status: 'active' }]);
    }
  }, [cards.length]);

  // Handle animation and card replacement
  useEffect(() => {
    // Only run this effect when direction changes to a non-null value
    if (direction === null || cards.length <= 1) return;

    // Cancel any existing timers to prevent conflicts
    if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
    if (cleanupTimerRef.current) clearTimeout(cleanupTimerRef.current);

    // Start animation sequence
    const oldCardIndex = currentIndex;
    const newCardIndex =
      direction === 'right'
        ? (currentIndex + 1) % cards.length
        : (currentIndex - 1 + cards.length) % cards.length;

    // Start animation
    setIsAnimating(true);

    // Create the new card in the off-screen position
    setVisibleCards((prev) => [
      ...prev,
      {
        id: `card-${newCardIndex}-${Date.now()}`,
        index: newCardIndex,
        status: direction === 'right' ? 'entering-right' : 'entering-left',
      },
    ]);

    // Animate cards after a short delay (to ensure the new card is added to the DOM)
    animationTimerRef.current = setTimeout(() => {
      setVisibleCards((prev) =>
        prev.map((card) => {
          if (card.index === oldCardIndex) {
            return {
              ...card,
              status: direction === 'right' ? 'exiting-left' : 'exiting-right',
            };
          }
          if (card.index === newCardIndex) {
            return { ...card, status: 'active' };
          }
          return card;
        })
      );

      // Update the current index
      setCurrentIndex(newCardIndex);
    }, 50);

    // Clean up old card and reset animation state after animation completes
    cleanupTimerRef.current = setTimeout(() => {
      setVisibleCards((prev) => prev.filter((card) => card.index === newCardIndex));
      setIsAnimating(false);
      setDirection(null);
    }, 550); // Match the animation duration from CSS

    return () => {
      if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
      if (cleanupTimerRef.current) clearTimeout(cleanupTimerRef.current);
    };
  }, [direction, cards.length]);

  // Navigate to the previous card
  const goToPrevious = (): void => {
    if (isAnimating || cards.length <= 1) return;
    setDirection('left');
  };

  // Navigate to the next card
  const goToNext = (): void => {
    if (isAnimating || cards.length <= 1) return;
    setDirection('right');
  };

  // Get the appropriate Tailwind classes based on card status
  const getCardClasses = (status: CardStatus): string => {
    const baseClasses =
      'absolute top-0 left-0 w-full h-full flex justify-center items-center transition-all duration-500 ease-in-out';

    switch (status) {
      case 'entering-right':
        return `${baseClasses} translate-x-full opacity-0`;
      case 'entering-left':
        return `${baseClasses} -translate-x-full opacity-0`;
      case 'exiting-right':
        return `${baseClasses} translate-x-full opacity-0`;
      case 'exiting-left':
        return `${baseClasses} -translate-x-full opacity-0`;
      case 'active':
      default:
        return `${baseClasses} translate-x-0 opacity-100`;
    }
  };

  if (cards.length === 0) {
    return <div className="text-center p-4">No cards available</div>;
  }

  return (
    <div className="relative w-full h-full overflow-visible">
      {/* Cards Container */}
      <div ref={containerRef} className="relative w-full h-full">
        {visibleCards.map((card) => (
          <div key={card.id} className={getCardClasses(card.status)}>
            {cards[card.index]}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      {cards.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            disabled={isAnimating}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md z-10 disabled:opacity-50"
            aria-label="Previous card"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            onClick={goToNext}
            disabled={isAnimating}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md z-10 disabled:opacity-50"
            aria-label="Next card"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </>
      )}

      {/* Card Indicator Dots */}
      {cards.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {cards.map((_, index) => (
            <div
              key={`indicator-${index}`}
              className={`h-2 w-2 rounded-full ${
                index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardScroller;
