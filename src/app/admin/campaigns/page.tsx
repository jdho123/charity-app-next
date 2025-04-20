'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Campaign, ActiveCampaign, CompletedCampaign, CategoryItem } from '@/types/campaignTypes';
import GloriaTitle from '@/components/shared/GloriaTitle';
import AdminLayout from '@/components/admin/AdminLayout';

export default function ManageCampaigns() {
  const [campaigns, setCampaigns] = useState<{
    active: ActiveCampaign[];
    completed: CompletedCampaign[];
  }>({
    active: [],
    completed: [],
  });
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/campaigns');

      if (!response.ok) {
        throw new Error('Failed to fetch campaigns');
      }

      const data = await response.json();

      setCampaigns({
        active: data.active || [],
        completed: data.completed || [],
      });
      setCategories(data.categories || []);
      setError(null);
    } catch (err) {
      setError('Failed to load campaigns. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this campaign?')) {
      return;
    }

    try {
      const response = await fetch(`/api/campaigns/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete campaign');
      }

      setSuccessMessage('Campaign deleted successfully');

      // Remove the deleted campaign from state
      setCampaigns({
        active: campaigns.active.filter((campaign) => campaign.id !== id),
        completed: campaigns.completed.filter((campaign) => campaign.id !== id),
      });

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      setError('Failed to delete campaign. Please try again.');
      console.error(err);
    }
  };

  const handleCompleteCampaign = async (id: number) => {
    if (
      !confirm('Mark this campaign as completed? This will set raised amount to match the goal.')
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/campaigns/${id}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Thank you for your support!',
          bgColour: 'bg-[#E8F4FF]',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to complete campaign');
      }

      setSuccessMessage('Campaign marked as completed successfully');

      // Refresh the campaigns list
      fetchCampaigns();

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      setError('Failed to mark campaign as completed. Please try again.');
      console.error(err);
    }
  };

  const getCategoryColor = (categoryName: string): string => {
    const category = categories.find((cat) => cat.name === categoryName);
    return category ? category.color : 'bg-gray-200';
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <GloriaTitle as="h1" size="4xl" color="black">
            Manage Campaigns
          </GloriaTitle>
          <div className="flex space-x-2">
            <Link href="/admin/campaigns/new" className="px-4 py-2 bg-blue-600 text-white rounded">
              New Campaign
            </Link>
            <Link
              href="/admin/campaigns/categories"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Manage Categories
            </Link>
          </div>
        </div>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{successMessage}</div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'active'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('active')}
          >
            Active Campaigns ({campaigns.active.length})
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'completed'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('completed')}
          >
            Completed Campaigns ({campaigns.completed.length})
          </button>
        </div>

        {loading ? (
          <div className="text-gray-600">Loading campaigns...</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {activeTab === 'active' ? (
              campaigns.active.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No active campaigns found. Create a new campaign to get started.
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Campaign
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progress
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {campaigns.active.map((campaign) => (
                      <tr key={campaign.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{campaign.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            Goal: ${campaign.goal.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(campaign.category)}`}
                          >
                            {campaign.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-green-600 h-2.5 rounded-full"
                                style={{
                                  width: `${Math.min(Math.round((campaign.raised / campaign.goal) * 100), 100)}%`,
                                }}
                              ></div>
                            </div>
                            <span className="ml-2 text-xs font-medium text-gray-900">
                              {Math.round((campaign.raised / campaign.goal) * 100)}%
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            ${campaign.raised.toLocaleString()} of ${campaign.goal.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <Link
                              href={`/admin/campaigns/edit/${campaign.id}`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleCompleteCampaign(campaign.id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              Complete
                            </button>
                            <button
                              onClick={() => handleDelete(campaign.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            ) : // Completed Campaigns
            campaigns.completed.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No completed campaigns found.</div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Campaign
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount Raised
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {campaigns.completed.map((campaign) => (
                    <tr key={campaign.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{campaign.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          Goal: ${campaign.goal.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(campaign.category)}`}
                        >
                          {campaign.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${campaign.raised.toLocaleString()}
                        <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded mt-1 inline-block">
                          Completed
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            href={`/admin/campaigns/edit/${campaign.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(campaign.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
