import { ReactNode, useEffect, useState } from 'react';

interface ProgressIndicatorProps {
  progress: number;
  currentView: number;
  totalViews: number;
  getProgressImage: (stage: number) => ReactNode;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  progress,
  currentView,
  totalViews,
  getProgressImage,
}) => {
  // Calculate endpoints for safe image placement
  // Creates "stops" at each stage position instead of continuous tracking
  const stagePosition = ((currentView - 1) / (totalViews - 1)) * 100;

  // Track the previous view to handle animations
  const [prevView, setPrevView] = useState(currentView);
  const [animating, setAnimating] = useState(false);

  // Handle view changes
  useEffect(() => {
    if (currentView !== prevView) {
      setAnimating(true);
      const timer = setTimeout(() => {
        setPrevView(currentView);
        setAnimating(false);
      }, 500); // Match this to your transition duration

      return () => clearTimeout(timer);
    }
  }, [currentView, prevView]);

  return (
    <div className="flex items-center justify-center w-24 sm:w-32 md:w-48">
      {/* Container with proper positioning context */}
      <div className="relative w-full">
        {/* Track */}
        <div className="h-2 bg-white/30 rounded-full w-full"></div>

        {/* Progress fill - Shows actual progress */}
        <div
          className="absolute top-0 left-0 h-2 bg-white rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />

        {/* Progress stage indicators */}
        <div className="absolute top-0 left-0 w-full h-2">
          {Array.from({ length: totalViews }).map((_, index) => {
            const position = index * (100 / (totalViews - 1));
            return (
              <div
                key={`step-${index}`}
                className={`absolute w-3 h-3 top-1/2 -translate-y-1/2 rounded-full ${
                  index < currentView ? 'bg-white' : 'bg-white'
                }`}
                style={{
                  left: `${position}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            );
          })}
        </div>

        {/* Progress image - positioned at discrete stops with size transition */}
        <div
          className="absolute bottom-0 transition-all duration-500 ease-in-out z-10 overflow-visible"
          style={{
            left: `${stagePosition}%`,
            transform: 'translateX(-50%)',
          }}
        >
          {/* This wrapper will handle the size transition */}
          <div className="transition-all duration-500 ease-in-out transform origin-bottom">
            {getProgressImage(currentView)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
