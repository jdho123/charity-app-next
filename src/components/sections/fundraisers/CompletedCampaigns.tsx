'use client';

import CampaignScroller from './CampaignScroller';
import { CompletedCampaign } from './types';

interface CompletedCampaignsProps {
  campaigns: CompletedCampaign[];
  title?: string;
}

export default function CompletedCampaigns({
  campaigns,
  title = 'Completed Campaigns',
}: CompletedCampaignsProps) {
  // Filter to ensure we only show completed campaigns
  const completedCampaigns = campaigns.filter(
    (campaign): campaign is CompletedCampaign => campaign.status === 'completed'
  );

  return (
    <section id="completed-campaigns" className="py-20 overflow-visible">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-gloria mb-12 px-4 text-center md:text-left">
          {title}
        </h2>

        <div className="px-4 overflow-visible mb-12">
          {completedCampaigns.length > 0 ? (
            <div className="w-full h-[800px] md:h-[780px] overflow-visible">
              <CampaignScroller campaigns={completedCampaigns} />
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-xl font-gloria">No completed campaigns yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
