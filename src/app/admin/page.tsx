// app/admin/page.tsx

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import GloriaTitle from '@/components/shared/GloriaTitle';

export default function AdminDashboard() {
  const [storiesCount, setStoriesCount] = useState<number | null>(null);
  const [campaignsCount, setCampaignsCount] = useState<{
    active: number;
    completed: number;
  } | null>(null);
  const [categoriesCount, setCategoriesCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data counts
    Promise.all([fetchStories(), fetchCampaigns(), fetchCategories()]).finally(() => {
      setLoading(false);
    });
  }, []);

  const fetchStories = async () => {
    try {
      const response = await fetch('/api/stories');
      if (!response.ok) return;

      const data = await response.json();
      setStoriesCount(Array.isArray(data) ? data.length : 0);
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('/api/campaigns');
      if (!response.ok) return;

      const data = await response.json();
      setCampaignsCount({
        active: Array.isArray(data.active) ? data.active.length : 0,
        completed: Array.isArray(data.completed) ? data.completed.length : 0,
      });
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/campaigns/categories');
      if (!response.ok) return;

      const data = await response.json();
      setCategoriesCount(Array.isArray(data) ? data.length : 0);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const DashboardCard = ({
    title,
    count,
    link,
    color,
    icon,
  }: {
    title: string;
    count: number | null | string;
    link: string;
    color: string;
    icon: string;
  }) => (
    <Link href={link} className="block">
      <div
        className={`${color} rounded-lg shadow-md p-6 flex items-center justify-between transition-transform hover:scale-105`}
      >
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-3xl font-bold">{loading ? '...' : count}</p>
        </div>
        <div className="text-4xl opacity-80">{icon}</div>
      </div>
    </Link>
  );

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-12">
        <GloriaTitle as="h1" size="4xl" color="black" className="mb-8">
          Admin Dashboard
        </GloriaTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Stories"
            count={storiesCount}
            link="/admin/stories"
            color="bg-blue-100"
            icon="📚"
          />

          <DashboardCard
            title="Active Campaigns"
            count={campaignsCount?.active ?? null}
            link="/admin/campaigns"
            color="bg-green-100"
            icon="💰"
          />

          <DashboardCard
            title="Completed Campaigns"
            count={campaignsCount?.completed ?? null}
            link="/admin/campaigns?tab=completed"
            color="bg-yellow-100"
            icon="🎉"
          />

          <DashboardCard
            title="Campaign Categories"
            count={categoriesCount}
            link="/admin/campaigns/categories"
            color="bg-purple-100"
            icon="🏷️"
          />
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/admin/stories/new"
              className="block p-4 bg-blue-50 rounded hover:bg-blue-100"
            >
              📝 Create New Story
            </Link>

            <Link
              href="/admin/campaigns/new"
              className="block p-4 bg-green-50 rounded hover:bg-green-100"
            >
              ➕ Create New Campaign
            </Link>

            <Link href="/newsletter" className="block p-4 bg-yellow-50 rounded hover:bg-yellow-100">
              🌐 View News Page
            </Link>

            <Link href="/fundraisers" className="block p-4 bg-pink-50 rounded hover:bg-pink-100">
              💸 View Fundraisers Page
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
