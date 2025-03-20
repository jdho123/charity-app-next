'use client';

import React from 'react';
import CardScroller from './CardScroller';
import CompletedCampaignCard from './CompletedCampaignCard';
import { CompletedCampaign } from './types';

interface CampaignScrollerProps {
  campaigns: CompletedCampaign[];
}

const CampaignScroller: React.FC<CampaignScrollerProps> = ({ campaigns }) => {
  // Convert campaign data into campaign card components
  const campaignCards = campaigns.map((campaign) => (
    <div
      key={campaign.id}
      className="w-full max-sm:p-0 max-w-5xl mx-auto px-16 py-16 h-full flex items-center"
    >
      <CompletedCampaignCard campaign={campaign} />
    </div>
  ));

  return (
    <div className="w-full h-full overflow-visible">
      <CardScroller cards={campaignCards} />
    </div>
  );
};

export default CampaignScroller;
