import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const checkScroll = () => {
      setShowButton(window.scrollY > 500)
    }

    window.addEventListener('scroll', checkScroll)
    return () => window.removeEventListener('scroll', checkScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!showButton) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-3 rounded-full bg-[#b21414] text-white shadow-lg hover:bg-[#961212] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b21414] transition duration-300 ease-out transform translate-y-0 opacity-100"
      aria-label="Scroll to top"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  )
}