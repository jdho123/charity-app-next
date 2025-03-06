'use client';
import { useEffect, useState } from 'react';
import GuestLayout from '@/components/layout/GuestLayout';
import GeneralFund from '@/components/sections/fundraisers/GeneralFund';
import ActiveCampaigns from '@/components/sections/fundraisers/ActiveCampaigns';
import CompletedCampaigns from '@/components/sections/fundraisers/CompletedCampaigns';
import { API_URL } from '@/env';
import {
  Campaign,
  CategoryItem,
  ActiveCampaign,
  CompletedCampaign,
} from '@/components/sections/fundraisers/types';

type CampaignData = {
  active: ActiveCampaign[];
  completed: CompletedCampaign[];
  categories: CategoryItem[];
};

export default function FundraisersPage() {
  const [campaignData, setCampaignData] = useState<CampaignData>({
    active: [],
    completed: [],
    categories: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_URL + '/campaigns');

        if (!response.ok) {
          throw new Error(`Failed to fetch campaigns: ${response.status}`);
        }

        const data = await response.json();

        // Ensure type safety by filtering campaigns based on status
        setCampaignData({
          active:
            data.active?.filter(
              (campaign: Campaign): campaign is ActiveCampaign => campaign.status === 'active'
            ) || [],
          completed:
            data.completed?.filter(
              (campaign: Campaign): campaign is CompletedCampaign => campaign.status === 'completed'
            ) || [],
          categories: data.categories?.filter(
            (category: CategoryItem): category is CategoryItem =>
              !!category.name && !!category.color
          ),
        });
      } catch (err) {
        console.error('Error fetching campaigns:', err);
        setError('Failed to load campaigns. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <GuestLayout>
      {/* General Fund Section */}
      <GeneralFund />

      {/* Loading and Error States */}
      {isLoading && (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="py-16 text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-auto max-w-lg">
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Active Campaigns Section */}
      {!isLoading && !error && (
        <ActiveCampaigns campaigns={campaignData.active} categories={campaignData.categories} />
      )}

      {/* Completed Campaigns Section */}
      {!isLoading && !error && <CompletedCampaigns campaigns={campaignData.completed} />}
    </GuestLayout>
  );
}
