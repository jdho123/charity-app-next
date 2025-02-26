'use client';

import React, { ReactNode } from 'react';

interface GloriaTitleProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  underlined?: boolean;
  color?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
}

/**
 * A reusable title component with Gloria Hallelujah font
 */
const GloriaTitle: React.FC<GloriaTitleProps> = ({
  children,
  className = "",
  as = "h2",
  underlined = false,
  color = "white",
  size = "4xl",
}) => {
  // Map sizes to Tailwind classes
  const sizeClasses = {
    'xs': 'text-xs',
    'sm': 'text-sm',
    'md': 'text-base',
    'lg': 'text-lg',
    'xl': 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
  };
  
  // Build the class string
  const titleClasses = [
    'font-gloria',
    sizeClasses[size], 
    color === 'white' ? 'text-white' : `text-${color}`,
    underlined ? 'border-b-2' : '',
    underlined && color === 'white' ? 'border-white' : underlined ? `border-${color}` : '',
    className
  ].filter(Boolean).join(' ');
  
  // Create the component element based on the 'as' prop
  const Component = as;
  
  return React.createElement(
    Component,
    { className: titleClasses },
    children
  );
};

export default GloriaTitle;