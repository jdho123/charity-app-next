'use client';
import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CampaignCardProps {
  title: string;
  goal: number;
  raised: number;
  imageUrl: string;
  description: string;
  descriptionTitle?: string;
  link?: string;
  type?: 'general' | 'campaign';
  bgColor?: string;
  onDonate?: () => void;
}

export default function CampaignCard({
  title,
  goal,
  raised,
  imageUrl,
  description,
  descriptionTitle = 'Why We Need It:',
  link,
  bgColor = 'bg-[#CFE9FF]',
  onDonate,
}: CampaignCardProps) {
  const progress = useMemo(() => Math.round((raised / goal) * 100), [raised, goal]);

  return (
    <div className="w-full flex flex-col">
      {/* Main Card */}
      <div
        className={`w-full ${bgColor} border border-black rounded-[24px] overflow-hidden flex flex-col mb-4`}
      >
        {/* Header with Title and Goal */}
        <div className="p-4 flex justify-between items-center">
          <h3 className="text-2xl md:text-3xl font-gloria">{title}</h3>
          <div className="bg-white rounded-full border border-black px-3 py-1">
            <span className="text-sm">Goal: ${goal.toLocaleString()}</span>
          </div>
        </div>

        {/* Image */}
        <div className="px-4 py-2">
          <div className="relative w-full h-[180px] rounded-lg overflow-hidden">
            <Image src={imageUrl} alt={title} fill className="object-cover" />
          </div>
        </div>

        {/* Description Box */}
        <div className="p-4 flex-1 flex flex-col space-y-4">
          <div>
            <h4 className="text-xl font-gloria mb-2">{descriptionTitle}</h4>
            <p className="text-sm">{description}</p>
          </div>

          {/* Progress Section */}
          <div className="space-y-2 mt-auto">
            <div className="flex items-center justify-between">
              <span className="text-base font-gloria">Progress: {progress}%</span>
            </div>
            <div className="h-3 bg-white rounded-full overflow-hidden border border-black">
              <div className="h-full bg-green-500 rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <div className="text-sm">
              <span className="font-gloria">
                ${raised.toLocaleString()} raised out of ${goal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Donate Button - Outside the card */}
      <Link
        href={link || '/fundraisers'}
        onClick={
          onDonate
            ? (e) => {
                e.preventDefault();
                onDonate();
              }
            : undefined
        }
      >
        <button className="w-full bg-[#B21414] text-white rounded-full py-2 md:py-3 text-lg md:text-xl font-gloria">
          {progress >= 100 ? 'See More Impact Stories' : 'Donate Now'}
        </button>
      </Link>
    </div>
  );
}
