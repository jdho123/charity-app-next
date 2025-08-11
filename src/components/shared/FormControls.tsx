import { ReactNode } from 'react';
import ProgressIndicator from './ProgressIndicator';

interface MultiViewFormControlProps {
  handleSubmit: (e: React.FormEvent) => void;
  nextView: () => void;
  prevView: () => void;
  getProgressImage: (stage: number) => ReactNode;
  viewCount: number;
  currentView: number;
  progress: number;
}

export default function FormControls({
  handleSubmit,
  nextView,
  prevView,
  getProgressImage,
  currentView,
  viewCount,
  progress,
}: MultiViewFormControlProps) {
  return (
    <div className="max-w-3xl mx-auto flex justify-between items-center px-2 lg:px-4 py-2 border-t border-white/20">
      {/* Fixed width back button */}
      <div className="w-28 sm:w-32 md:w-36 flex justify-start">
        <button
          type="button"
          onClick={prevView}
          className={`bg-white/90 border-2 border-black rounded-full px-4 sm:px-6 md:px-8 py-2 md:py-3 text-lg md:text-xl font-gloria
                      transition-all focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${currentView === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'}`}
          disabled={currentView === 1}
        >
          ← Back
        </button>
      </div>

      {/* Progress Indicator Component */}
      <ProgressIndicator
        progress={progress}
        currentView={currentView}
        totalViews={viewCount}
        getProgressImage={getProgressImage}
      />

      {/* Fixed width continue/submit button */}
      <div className="w-28 sm:w-32 md:w-36 flex justify-end">
        <button
          type={currentView === viewCount ? 'submit' : 'button'}
          onClick={currentView < viewCount ? nextView : handleSubmit}
          className="bg-white/90 border-2 border-black rounded-full px-4 sm:px-6 md:px-8 py-2 md:py-3 text-lg md:text-xl font-gloria
                    hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap"
        >
          {currentView === viewCount ? 'Submit' : 'Continue →'}
        </button>
      </div>
    </div>
  );
}
