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
    <div className="w-full h-full bg-[#CFE9FF] border border-black rounded-[32px] overflow-hidden flex flex-col">
      {/* Header with Title and Goal */}
      <div className="p-4 flex justify-between items-center">
        <h3 className="text-3xl font-gloria underline">{title}</h3>
        <div className="bg-white rounded-full border border-black px-3 py-1">
          <span className="text-sm">Goal: ${goal.toLocaleString()}</span>
        </div>
      </div>

      {/* Image */}
      <div className="px-6 py-2">
        <div className="relative w-full h-[200px] rounded-lg overflow-hidden">
          <Image 
            src={imageUrl} 
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Description Box */}
      <div className="p-6 flex-1 flex flex-col space-y-6">
        <div>
          <h4 className="text-xl font-gloria mb-2">{descriptionTitle}</h4>
          <p className="text-sm">
            {description}
          </p>
          {children}
        </div>

        {/* Progress Section */}
        <div className="space-y-2 mt-auto">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">Progress: {progress}%</span>
          </div>
          <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-sm">
            <span>${raised.toLocaleString()} raised out of ${goal.toLocaleString()}</span>
          </div>
        </div>

        {/* Donate Button */}
        <button className="w-full bg-[#B21414] text-white rounded-full py-3 text-xl font-gloria">
          Donate Now
        </button>
      </div>
    </div>
  )
}