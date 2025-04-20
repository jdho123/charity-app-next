'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Campaign, CategoryItem } from '@/types/campaignTypes';
import CampaignForm from '@/components/admin/campaigns/CampaignForm';
import GloriaTitle from '@/components/shared/GloriaTitle';
import AdminLayout from '@/components/admin/AdminLayout';

interface EditCampaignPageProps {
  params: {
    id: string;
  };
}

export default function EditCampaignPage({ params }: EditCampaignPageProps) {
  const router = useRouter();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const id = Number(params.id);

  useEffect(() => {
    if (isNaN(id)) {
      setError('Invalid campaign ID');
      setLoading(false);
      return;
    }

    // Fetch both campaign and categories
    Promise.all([fetchCampaign(id), fetchCategories()])
      .catch((err) => {
        console.error('Error loading data:', err);
        setError('Failed to load data. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const fetchCampaign = async (campaignId: number) => {
    const response = await fetch(`/api/campaigns/${campaignId}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Campaign not found');
      }
      throw new Error('Failed to fetch campaign');
    }

    const data = await response.json();
    setCampaign(data);
    return data;
  };

  const fetchCategories = async () => {
    const response = await fetch('/api/campaigns/categories');

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const data = await response.json();
    setCategories(data);
    return data;
  };

  const handleSubmit = async (updatedCampaign: Campaign) => {
    try {
      const response = await fetch(`/api/campaigns/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCampaign),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update campaign');
      }

      // Redirect to the campaigns management page
      router.push('/admin/campaigns');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred while updating the campaign'
      );
      throw err; // Re-throw to let the form component handle the error state
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Link href="/admin/campaigns" className="text-blue-600 hover:underline flex items-center">
            ← Back to Campaigns
          </Link>
        </div>

        <GloriaTitle as="h1" size="4xl" color="black" className="mb-8">
          Edit Campaign
        </GloriaTitle>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-6">{error}</div>}

        {loading ? (
          <div className="text-gray-600">Loading campaign data...</div>
        ) : (
          <>
            {campaign ? (
              <CampaignForm
                initialCampaign={campaign}
                categories={categories}
                onSubmit={handleSubmit}
              />
            ) : (
              <div className="bg-yellow-100 text-yellow-700 p-4 rounded">
                Campaign not found.{' '}
                <Link href="/admin/campaigns" className="underline">
                  Return to campaign list
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}
