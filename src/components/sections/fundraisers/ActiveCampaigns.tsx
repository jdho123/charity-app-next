'use client';
import { useState, useEffect } from 'react';
import GloriaTitle from '@/components/shared/GloriaTitle';
import Image from 'next/image';
import BlurryBox from '@/components/shared/BlurryBox';
import CategoryGrid from './CategoryGrid';
import CampaignDialog from './CampaignDialog';
import { Campaign, CategoryItem } from './types';

interface ActiveCampaignsProps {
  campaigns: Campaign[];
  categories: CategoryItem[];
}

export default function ActiveCampaigns({ campaigns, categories }: ActiveCampaignsProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCategorySelect = (category: CategoryItem | null) => {
    setSelectedCategory(category);
    setIsDialogOpen(true);

    // Prevent body scrolling when dialog is open
    document.body.style.overflow = 'hidden';
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);

    // Re-enable body scrolling when dialog is closed
    document.body.style.overflow = 'auto';
  };

  // Clean up the body overflow style when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-white w-full min-h-screen"
      id="active-campaigns"
    >
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="/images/readingTextbook.jpeg"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-top max-lg:hidden"
          sizes="100vw"
        />
        <Image
          src="/images/activeCampaignsMobileBackground.jpg"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-top filter grayscale lg:hidden"
          sizes="100vw"
        />
      </div>
      <div className="relative z-10 flex flex-col w-full min-h-screen">
        <header className="w-full pt-4 px-4 lg:pt-12 md:px-12 lg:px-8">
          <div className="md:ml-2 lg:ml-2">
            <GloriaTitle
              as="h1"
              size="false"
              color="[#0E26A5]"
              className="font-normal text-4xl md:text-5xl lg:text-6xl leading-tight"
            >
              Active Campaigns
            </GloriaTitle>
          </div>
        </header>

        <div className="relative w-full">
          <BlurryBox
            position="custom"
            customPosition="relative mx-auto my-12"
            width="max-w-3xl w-full"
            padding="p-8"
            borderRadius="rounded-[32px]"
            bgOpacity="bg-white/40"
          >
            <CategoryGrid categories={categories} onCategorySelect={handleCategorySelect} />
          </BlurryBox>
        </div>
      </div>

      {/* Full-screen Campaign Dialog */}
      <CampaignDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        category={selectedCategory}
        campaigns={campaigns}
        categories={categories}
      />
    </section>
  );
}
