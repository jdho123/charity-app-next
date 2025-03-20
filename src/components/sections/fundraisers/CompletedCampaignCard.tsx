'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CompletedCampaign } from './types';

interface CompletedCampaignCardProps {
  campaign: CompletedCampaign;
  onSeeMore?: () => void;
}

export default function CompletedCampaignCard({ campaign, onSeeMore }: CompletedCampaignCardProps) {
  const { title, goal, imageUrl, description, message, bgColour, fundLink } = campaign;

  // Split the description into paragraphs for better display
  const descriptionParagraphs = description.split('\n\n').filter(Boolean);

  return (
    <div className="w-full flex flex-col h-full relative">
      {/* Celebration Cracker Image - top right */}
      <div className="absolute -top-28 -right-36 w-80 h-80 max-md:hidden z-10 pointer-events-none">
        <Image
          src="/images/celebrationCracker.png"
          alt="Celebration"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>

      {/* Thank You Image - bottom left */}
      <div className="absolute -bottom-24 -right-16 w-64 h-40 z-10 pointer-events-none">
        <Image
          src="/images/thankyou.png"
          alt="Thank you"
          width={300}
          height={150}
          className="object-contain max-md:hidden"
        />
      </div>

      {/* Main Card */}
      <div
        className={`w-full ${
          bgColour || 'bg-[#E8F4FF]'
        } rounded-[24px] overflow-hidden flex flex-col p-6 h-full border border-black relative`}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <h3 className="text-3xl md:text-4xl font-gloria">{title}</h3>
          <div className="bg-[#A7E489] border border-black rounded-full px-4 py-2 whitespace-nowrap z-20">
            <span className="text-base font-medium">Goal Achieved: ${goal.toLocaleString()}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 max-md:hidden">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">Progress: 100%</span>
          </div>
          <div className="h-3 bg-white rounded-full overflow-hidden border border-black">
            <div className="h-full bg-green-500 rounded-full w-full" />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 flex-grow">
          {/* Left Side - Description */}
          <div className="bg-white rounded-xl p-5 flex flex-col gap-4">
            {descriptionParagraphs.length > 0 ? (
              descriptionParagraphs.map((paragraph, idx) => (
                <p key={idx} className="text-base font-gloria">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-base">{description}</p>
            )}
          </div>

          {/* Right Side - Impact Image */}
          <div className="flex flex-col">
            <div className="relative h-64 md:h-72 w-full rounded-xl overflow-hidden border border-black">
              <Image src={imageUrl} alt={`Impact of ${title}`} fill className="object-cover" />
            </div>

            <p className="text-xl font-gloria text-center mt-4">
              {message || 'Thank you for making this campaign a success!'}
            </p>
          </div>
        </div>

        {/* See More Button */}
        <div className="mt-auto flex justify-center">
          <Link
            href={fundLink || '/impact'}
            onClick={
              onSeeMore
                ? (e) => {
                    e.preventDefault();
                    onSeeMore();
                  }
                : undefined
            }
            className="inline-block"
          >
            <button className="bg-white border-2 border-[#B21414] text-[#B21414] rounded-full px-10 py-3 text-xl font-gloria hover:bg-[#B21414] hover:text-white transition-colors">
              See More Impact Stories
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
