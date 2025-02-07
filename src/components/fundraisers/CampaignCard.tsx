'use client'
import { useMemo } from 'react'
import Image from 'next/image'

interface CampaignCardProps {
  title: string
  goal: number
  raised: number
  imageUrl: string
  description: string
  descriptionTitle?: string
  type?: 'general' | 'campaign'
  children?: React.ReactNode
}

export default function CampaignCard({
  title,
  goal,
  raised,
  imageUrl,
  description,
  descriptionTitle = 'Why We Need It:',
  children
}: CampaignCardProps) {
  const progress = useMemo(() => 
    Math.round((raised / goal) * 100)
  , [raised, goal])

  return (
    <div className="w-full h-full bg-[#CFE9FF] border border-black rounded-[50px] p-6 flex flex-col">
      {/* Title and Goal */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-gloria">{title}</h3>
        <div className={`
          rounded-full border border-black px-3 py-1
          ${progress >= 100 ? 'bg-green-600' : 'bg-gray-200'}
        `}>
          <span className="text-sm">Goal: ${goal.toLocaleString()}</span>
        </div>
      </div>

      {/* Image */}
        <Image 
          src={imageUrl} 
          alt={title}
          layout="responsive"
          width={640}
          height={360}
          className="object-cover"
        />
      {/* Description Box */}
      <div className="flex-1 flex flex-col mt-4">
        <h4 className="text-lg mb-2">{descriptionTitle}</h4>
        <p className="text-sm flex-1">
          {description}
        </p>
        {children}
      </div>

      {/* Progress Section */}
      <div className="space-y-2 mt-6">
        <div className="flex items-center gap-2">
          <span className="text-sm">Progress: {progress}%</span>
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="text-sm">
          <span>${raised.toLocaleString()} raised out of ${goal.toLocaleString()}</span>
        </div>
      </div>

      {/* Donate Button */}
      <button className="w-full bg-[#B21414] text-white rounded-full py-3 mt-6 text-xl font-gloria">
        Donate Now
      </button>
    </div>
  )
}