import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import CampaignCard from './CampaignCard';
import Image from 'next/image';
import { Campaign, CategoryItem } from './types';

interface CampaignDialogProps {
  isOpen: boolean;
  onClose: () => void;
  category: CategoryItem | null;
  categories: CategoryItem[];
  campaigns: Campaign[];
}

const CampaignDialog: React.FC<CampaignDialogProps> = ({
  isOpen,
  onClose,
  category,
  campaigns,
  categories,
}) => {
  // Handle escape key to close dialog
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  // Filter campaigns by selected category else disp all
  const filteredCampaigns = campaigns.filter((campaign) =>
    category ? campaign.category === category.name : true
  );

  const findCatColour = (campaign: Campaign) => {
    if (category) return category.color;

    const c = categories.find((v: CategoryItem) => v.name === campaign.category);
    return c ? c.color : 'bg-[#CFE9FF]';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onClose}>
      <div
        className={`fixed inset-0 flex flex-col bg-white transform transition-all duration-300 ease-in-out
                   ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background gradient - fixed and doesn't scroll */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50 to-blue-100 opacity-70"></div>
          <Image
            src="/images/footerAlt.svg"
            alt="Background pattern"
            fill
            className="object-cover opacity-20"
          />
        </div>

        {/* Header with Title and Close Button - fixed at top */}
        <div className="sticky top-0 z-20 flex justify-between items-center p-4 sm:p-6 bg-white/80 backdrop-blur-sm border-b">
          <div className="flex items-center">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${
                category?.color ?? 'bg-[#CFE9FF]'
              } flex items-center justify-center mr-4`}
            >
              <span className="font-gloria text-xl">{category?.name[0] ?? 'All'}</span>
            </div>
            <h2 className="font-gloria text-3xl md:text-4xl text-[#0E26A5]">
              {category?.name ?? ''} Campaigns
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close dialog"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto z-10">
          <div className="p-4 md:p-8 container mx-auto">
            {filteredCampaigns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCampaigns.map((campaign) => (
                  <CampaignCard
                    key={campaign.id}
                    title={campaign.title}
                    goal={campaign.goal}
                    raised={campaign.raised}
                    imageUrl={campaign.imageUrl}
                    description={campaign.description}
                    descriptionTitle="Why We Need It:"
                    bgColor={findCatColour(campaign)}
                    link={campaign.fundLink}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[50vh] py-12">
                <div
                  className={`w-24 h-24 ${
                    category?.color ?? 'bg-[#CFE9FF]'
                  } rounded-full flex items-center justify-center mb-6 border-2 border-black`}
                >
                  <span className="font-gloria text-5xl">{category?.name?.[0] ?? '!'}</span>
                </div>
                <h3 className="font-gloria text-3xl text-[#0E26A5] mb-4">No Active Campaigns</h3>
                <p className="text-center max-w-md text-gray-600 mb-8">
                  There are currently no active campaigns in{' '}
                  {category ? `the ${category.name} category` : 'any category'}. Please check back
                  later or explore other categories.
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#B21414] text-white rounded-full py-3 px-8 text-lg font-gloria hover:bg-red-700 transition-colors"
                >
                  Back to Categories
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDialog;
