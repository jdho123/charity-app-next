import { ReactNode } from 'react';

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
                  index < currentView ? 'bg-white' : 'bg-white/30'
                }`}
                style={{
                  left: `${position}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            );
          })}
        </div>

        {/* Progress image - positioned at discrete stops rather than continuous points */}
        <div
          className="absolute top-0 transition-all duration-500 ease-in-out z-10 overflow-visible"
          style={{
            left: `${stagePosition}%`,
            transform: 'translateX(-50%)',
          }}
        >
          {getProgressImage(currentView)}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
