import React from 'react';
import { useState, useRef } from 'react';

interface VideoPageProps {
  videoUrl: string;
  thumbnailUrl: string;
  title?: string;
  description?: string;
}

export default function VideoPage({ 
  videoUrl, 
  thumbnailUrl, 
  title = '', 
  description = '' 
}: VideoPageProps) {
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startVideo = () => {
    setVideoStarted(true);
    // Use useEffect to handle video play after state update
    videoRef.current?.play();
  };

  const videoEnded = () => {
    setVideoStarted(false);
  };

  return (
    <section className="bg-black py-16">
      <div className="container mx-auto px-4">
        <div className="relative aspect-video max-w-5xl mx-auto rounded-[50px] overflow-hidden">
          {/* Video Placeholder */}
          {!videoStarted && (
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${thumbnailUrl})` }}
            >
              {/* Play Button */}
              <button
                className="absolute inset-0 flex items-center justify-center group"
                onClick={startVideo}
                aria-label="Play video"
              >
                <div className="p-6 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                  <svg 
                    className="w-16 h-16 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            </div>
          )}

          {/* Video Player */}
          <video
            ref={videoRef}
            className={`w-full h-full ${!videoStarted ? 'hidden' : ''}`}
            src={videoUrl}
            poster={thumbnailUrl}
            controls
            onEnded={videoEnded}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Optional Title/Description */}
        {(title || description) && (
          <div className="mt-8 text-center text-white">
            {title && <h2 className="text-3xl font-gloria mb-4">{title}</h2>}
            {description && (
              <p className="text-xl font-verdana max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}