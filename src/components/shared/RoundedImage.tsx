import * as React from "react";
import Image from "next/image";

interface RoundedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export function RoundedImage({ 
  src, 
  alt, 
  className = "", 
  width = 800, 
  height = 500 
}: RoundedImageProps) {
  return (
    <div className={`overflow-hidden rounded-[30px] ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover w-full h-full"
      />
    </div>
  );
}