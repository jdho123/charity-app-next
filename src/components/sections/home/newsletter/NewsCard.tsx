'use client'

import Image from "next/image"
import Link from "next/link"

interface NewsCardProps {
  id?: number
  title?: string
  image?: string
  category?: string
  url?: string
}

export default function NewsCard({ 
  id = 1, 
  title = "", 
  image = "", 
  category = "News", 
  url = "#" 
}: NewsCardProps) {
  // Use a link if URL or ID is provided, otherwise just render the card content
  const CardContent = () => (
    <div className="flex w-full h-full">
      {/* Image section - left side */}
      <div className="w-1/3 p-5">
        <div className="h-full w-full bg-white rounded-xl overflow-hidden">
          {image ? (
            <div className="relative h-full w-full">
              <Image 
                src={image} 
                alt={title || "News image"}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-full w-full bg-white"></div>
          )}
        </div>
      </div>
      
      {/* Content section - right side */}
      <div className="w-2/3 p-5 flex flex-col justify-between">
        <div>
          <span className="text-gray-800 font-medium">{category}</span>
          {title && <h4 className="mt-2 font-medium">{title}</h4>}
        </div>
        <div className="flex justify-end">
          <span className="text-black font-bold">Read More&gt;&gt;&gt;</span>
        </div>
      </div>
    </div>
  )

  // If URL is provided, wrap in Link
  if (url !== "#" || id > 1) {
    const hrefUrl = url !== "#" ? url : `/news/${id}`
    
    return (
      <Link 
        href={hrefUrl}
        className="block bg-[#D1CDBC] rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow min-h-[140px] h-32"
      >
        <CardContent />
      </Link>
    )
  }
  
  // Otherwise return just the card
  return (
    <div className="bg-[#D1CDBC] rounded-2xl overflow-hidden shadow-md min-h-[140px] h-32">
      <CardContent />
    </div>
  )
}