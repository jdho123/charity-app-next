'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CategoryItem, Campaign } from '@/types/campaignTypes';
import CampaignForm from '@/components/admin/campaigns/CampaignForm';
import GloriaTitle from '@/components/shared/GloriaTitle';
import AdminLayout from '@/components/admin/AdminLayout';

export default function NewCampaignPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/campaigns/categories');

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError('Failed to load categories. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (campaign: Campaign) => {
    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaign),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create campaign');
      }

      // Redirect to the campaigns management page
      router.push('/admin/campaigns');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred while creating the campaign'
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
          Create New Campaign
        </GloriaTitle>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-6">{error}</div>}

        {loading ? (
          <div className="text-gray-600">Loading categories...</div>
        ) : (
          <CampaignForm categories={categories} onSubmit={handleSubmit} />
        )}
      </div>
    </AdminLayout>
  );
}
