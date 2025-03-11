'use client';

import { useState, useEffect } from 'react';
import { NewsItem } from './types';
import NewsItemCard from './NewsItemCard';
import GloriaTitle from '@/components/shared/GloriaTitle';

export default function NewsSummaryDisplay() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Using relative URL to work in any environment
        const response = await fetch('/api/stories');
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNewsItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load news');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <GloriaTitle color="black" as="h1" size="5xl" className="mb-8">
          Our News
        </GloriaTitle>
        <div className="text-gray-600">Loading news...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <GloriaTitle color="black" as="h1" size="5xl" className="mb-8">
          Our News
        </GloriaTitle>
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <GloriaTitle color="black" as="h1" size="5xl" className="mb-12">
        Our News
      </GloriaTitle>

      <div className="space-y-12">
        {newsItems.map((item) => (
          <NewsItemCard key={item.id} item={item} />
        ))}

        {newsItems.length === 0 && (
          <div className="text-gray-600">No news items available at the moment.</div>
        )}
      </div>
    </div>
  );
}
