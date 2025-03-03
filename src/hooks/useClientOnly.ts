
'use client'
import { useState, useEffect } from 'react'

/**
 * A hook that ensures window-dependent code only runs on the client
 * @returns An object with the following properties:
 * - isClient: boolean - true if running in browser, false during SSR
 * - windowWidth: number - current window width (0 during SSR)
 * - windowHeight: number - current window height (0 during SSR)
 * - isMobile: boolean - true if width is below the provided breakpoint
 */
export default function useClientOnly(mobileBreakpoint = 768) {
  // Initialize with SSR-safe values
  const [isClient, setIsClient] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // This code only runs on the client
    setIsClient(true)
    
    // Set initial values
    setWindowWidth(window.innerWidth)
    setWindowHeight(window.innerHeight)
    setIsMobile(window.innerWidth < mobileBreakpoint)
    
    // Add resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
      setIsMobile(window.innerWidth < mobileBreakpoint)
    }
    
    window.addEventListener('resize', handleResize)
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileBreakpoint])

  return { isClient, windowWidth, windowHeight, isMobile }
}