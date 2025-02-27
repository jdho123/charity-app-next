"use client";

import { useState, useEffect, useRef } from "react";

interface SpriteProps {
  totalFrames: number;
  frameWidth: number;
  frameHeight: number;
  imagePath: string;
  className?: string;
  scale?: number; // New optional scale prop (default 1)
}

export default function Sprite({
  totalFrames,
  frameWidth,
  frameHeight,
  imagePath,
  className = "",
  scale = 1, // Default scale is 1 (original size)
}: SpriteProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const spriteRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!spriteRef.current) return;

      const spriteRect = spriteRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight; // When the sprite starts at the bottom
      const end = windowHeight * 0.33; // When the sprite reaches the middle

      // Normalize progress: 0 when at bottom, 1 when at center
      let progress = (spriteRect.top - start) / (end - start);
      progress = Math.max(0, Math.min(1, progress)); // Clamp between 0-1

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const frameIndex = Math.floor(scrollProgress * (totalFrames - 1));

  return (
    <div
      ref={spriteRef}
      className={className}
      style={{
        width: frameWidth * scale, // Apply scaling
        height: frameHeight * scale,
        backgroundImage: `url('${imagePath}')`,
        backgroundSize: `${totalFrames * frameWidth * scale}px auto`, // Scale background
        backgroundPosition: `${-frameIndex * frameWidth * scale}px 0`, // Adjust position with scaling
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
