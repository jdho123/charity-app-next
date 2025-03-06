import React, { ReactNode } from 'react';

interface BlurryBoxProps {
  children: ReactNode;
  className?: string;
  position?: 'center' | 'top-center' | 'custom';
  customPosition?: string;
  width?: string;
  padding?: string;
  borderRadius?: string;
  blurAmount?: string;
  bgOpacity?: string;
}

const BlurryBox: React.FC<BlurryBoxProps> = ({
  children,
  className = '',
  position = 'center',
  customPosition = '',
  width = 'max-w-4xl w-full',
  padding = 'p-8',
  borderRadius = 'rounded-[50px]',
  blurAmount = 'backdrop-blur-md',
  bgOpacity = 'bg-white/30',
}) => {
  // Define positioning classes based on the position prop
  let positionClasses = '';

  switch (position) {
    case 'center':
      positionClasses = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      break;
    case 'top-center':
      positionClasses = 'absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3';
      break;
    case 'custom':
      positionClasses = customPosition;
      break;
    default:
      positionClasses = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
  }

  return (
    <div
      className={`
        ${positionClasses}
        ${width}
        ${padding}
        ${borderRadius}
        ${blurAmount}
        ${bgOpacity}
        z-10
        border border-white/30
        shadow-md
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default BlurryBox;
