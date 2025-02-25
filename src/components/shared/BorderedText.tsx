'use client';

import React, { ReactNode, JSX } from 'react';

// Define the props interface for better TypeScript support
interface BorderedTextProps {
  text?: string;
  children?: ReactNode;
  className?: string;
  textClassName?: string;
  lineWidth?: string;
  lineColor?: string;
  padding?: string;
  fontSize?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
}

/**
 * BorderedText - A component that displays text with a black line on the left
 */
const BorderedText: React.FC<BorderedTextProps> = ({
  text,
  children,
  className = "",
  textClassName = "",
  lineWidth = "4px",
  lineColor = "black",
  padding = "0.75rem",
  fontSize,
  as = "p"
}) => {
  // Content can be either the text prop or children
  const content = text || children;
  
  // Create the component element based on the 'as' prop
  const Component = as;
  
  return (
    <div 
      className={`flex items-start ${className}`}
      style={{ 
        borderLeft: `${lineWidth} solid ${lineColor}`,
        paddingLeft: padding
      }}
    >
      {React.createElement(
        Component,
        {
          className: textClassName,
          style: { 
            fontSize: fontSize || 'inherit',
            margin: 0
          }
        },
        content
      )}
    </div>
  );
};

export default BorderedText;