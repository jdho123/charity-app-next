'use client';

import { useState, useEffect } from 'react';
import { NewsArticle } from './types';
import NewsBreadcrumb from './NewsBreadcrumb';
import ContentRenderer from './NewsContentRenderer';
import GloriaTitle from '@/components/shared/GloriaTitle';

interface NewsDetailPageProps {
  id: number;
}

export default function NewsDetailPage({ id }: NewsDetailPageProps) {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Using relative URL to work in any environment
        const response = await fetch(`/api/stories/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch article');
        }
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load article');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-gray-600">Loading article...</div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500">Error: {error || 'Article not found'}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb navigation */}
      <NewsBreadcrumb title={article.title} />

      {/* Read time */}
      <div className="text-gray-600 mb-8">Read the article {article.readTime || 5} min</div>

      {/* Main article title */}
      <GloriaTitle as="h1" size="4xl" color="black" className="mb-8">
        {article.title}
      </GloriaTitle>

      {/* Flexible content area */}
      <div className="article-content">
        {article.content.map((tag, index) => (
          <ContentRenderer key={tag.id || `content-${index}`} tag={tag} />
        ))}
      </div>
    </div>
  );
}
