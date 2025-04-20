'use client';

import { useState, useEffect } from 'react';
import { Campaign, ActiveCampaign, CompletedCampaign, CategoryItem } from '@/types/campaignTypes';
import GloriaTitle from '@/components/shared/GloriaTitle';
import ImageUploader from '@/components/admin/ImageUploader';

interface CampaignFormProps {
  initialCampaign?: Campaign;
  categories: CategoryItem[];
  onSubmit: (campaign: ActiveCampaign | CompletedCampaign) => Promise<void>;
}

const defaultActiveCampaign: ActiveCampaign = {
  id: 0,
  title: '',
  goal: 0,
  raised: 0,
  imageUrl: '',
  description: '',
  status: 'active',
  category: '',
  fundLink: '',
};

const defaultCompletedCampaign: CompletedCampaign = {
  id: 0,
  title: '',
  goal: 0,
  raised: 0,
  imageUrl: '',
  description: '',
  status: 'completed',
  category: '',
  message: 'Thank you for your support!',
  bgColour: 'bg-[#E8F4FF]',
};

export default function CampaignForm({ initialCampaign, categories, onSubmit }: CampaignFormProps) {
  const [campaign, setCampaign] = useState<ActiveCampaign | CompletedCampaign>(
    initialCampaign || defaultActiveCampaign
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (initialCampaign) {
      setCampaign(initialCampaign);
    }
  }, [initialCampaign]);

  const handleStatusChange = (newStatus: 'active' | 'completed') => {
    if (newStatus === 'active') {
      setCampaign({
        ...campaign,
        status: 'active',
      } as ActiveCampaign);
    } else {
      // Convert to completed campaign, keeping all common fields
      setCampaign({
        ...campaign,
        status: 'completed',
        message: (campaign as CompletedCampaign).message || 'Thank you for your support!',
        bgColour: (campaign as CompletedCampaign).bgColour || 'bg-[#E8F4FF]',
      } as CompletedCampaign);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Handle numeric values
    if (name === 'goal' || name === 'raised') {
      const numericValue = parseFloat(value);
      setCampaign({
        ...campaign,
        [name]: isNaN(numericValue) ? 0 : numericValue,
      });
      return;
    }

    setCampaign({
      ...campaign,
      [name]: value,
    });
  };

  const handleImageUpload = (imagePath: string) => {
    setCampaign({
      ...campaign,
      imageUrl: imagePath,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validation checks
      if (!campaign.title) {
        throw new Error('Title is required');
      }

      if (campaign.goal <= 0) {
        throw new Error('Goal must be greater than zero');
      }

      if (!campaign.category) {
        throw new Error('Category is required');
      }

      if (!campaign.description) {
        throw new Error('Description is required');
      }

      if (!campaign.imageUrl) {
        throw new Error('Image is required');
      }

      await onSubmit(campaign);
      setSuccess(true);

      // Reset form if it's a new campaign
      if (!initialCampaign) {
        setCampaign(
          campaign.status === 'active' ? defaultActiveCampaign : defaultCompletedCampaign
        );
      }
    } catch (err) {
      setError((err as Error).message || 'Failed to save campaign');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <GloriaTitle as="h2" size="3xl" color="black" className="mb-4">
          {initialCampaign ? 'Edit Campaign' : 'Create New Campaign'}
        </GloriaTitle>

        <div className="flex space-x-2 mb-4">
          <button
            type="button"
            onClick={() => handleStatusChange('active')}
            className={`px-4 py-2 rounded ${
              campaign.status === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Active
          </button>
          <button
            type="button"
            onClick={() => handleStatusChange('completed')}
            className={`px-4 py-2 rounded ${
              campaign.status === 'completed'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}

      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded">
          Campaign {initialCampaign ? 'updated' : 'created'} successfully!
        </div>
      )}

      <div className="bg-white p-6 rounded shadow">
        <GloriaTitle as="h3" size="2xl" color="black" className="mb-4">
          Basic Information
        </GloriaTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={campaign.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              value={campaign.category}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Goal Amount ($)</label>
            <input
              type="number"
              name="goal"
              value={campaign.goal}
              onChange={handleInputChange}
              min="1"
              step="1"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Raised Amount ($)</label>
            <input
              type="number"
              name="raised"
              value={campaign.raised}
              onChange={handleInputChange}
              min="0"
              step="1"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Fund Link</label>
            <input
              type="url"
              name="fundLink"
              value={campaign.fundLink || ''}
              onChange={handleInputChange}
              placeholder="https://example.com"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Campaign Image</label>
            <ImageUploader initialImageUrl={campaign.imageUrl} onImageUpload={handleImageUpload} />
            <p className="text-sm text-gray-500 mt-1">
              Upload an image for this campaign, or provide a URL below
            </p>
            <input
              type="text"
              name="imageUrl"
              value={campaign.imageUrl}
              onChange={handleInputChange}
              placeholder="/images/example.jpg"
              className="w-full p-2 border rounded mt-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={campaign.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
      </div>

      {campaign.status === 'completed' && (
        <div className="bg-white p-6 rounded shadow">
          <GloriaTitle as="h3" size="2xl" color="black" className="mb-4">
            Completion Details
          </GloriaTitle>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-1 font-medium">Thank You Message</label>
              <textarea
                name="message"
                value={(campaign as CompletedCampaign).message || ''}
                onChange={handleInputChange}
                rows={2}
                className="w-full p-2 border rounded"
                placeholder="Thank you for your support!"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Background Color</label>
              <input
                type="text"
                name="bgColour"
                value={(campaign as CompletedCampaign).bgColour || 'bg-[#E8F4FF]'}
                onChange={handleInputChange}
                placeholder="bg-[#E8F4FF]"
                className="w-full p-2 border rounded"
              />
              <p className="text-sm text-gray-500 mt-1">
                Use Tailwind CSS format, e.g., bg-[#E8F4FF]
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => setCampaign(initialCampaign || defaultActiveCampaign)}
          className="px-4 py-2 border rounded"
          disabled={loading}
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
          disabled={loading}
        >
          {loading ? 'Saving...' : initialCampaign ? 'Update Campaign' : 'Create Campaign'}
        </button>
      </div>
    </form>
  );
}
