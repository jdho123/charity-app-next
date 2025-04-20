'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminStoryForm from '@/components/admin/stories/AdminStoryForm';
import { StoryDetail } from '@/types/newsTypes';
import GloriaTitle from '@/components/shared/GloriaTitle';
import AdminLayout from '@/components/admin/AdminLayout';

interface EditStoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditStoryPage({ params }: EditStoryPageProps) {
  const router = useRouter();
  const [story, setStory] = useState<StoryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const resolvedParams = use(params);
  const id = Number(resolvedParams.id);

  useEffect(() => {
    if (isNaN(id)) {
      setError('Invalid story ID');
      setLoading(false);
      return;
    }

    const fetchStory = async () => {
      try {
        const response = await fetch(`/api/stories/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Story not found');
          }
          throw new Error('Failed to fetch story');
        }

        const data = await response.json();
        setStory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching the story');
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  const handleSubmit = async (updatedStory: StoryDetail) => {
    try {
      const response = await fetch(`/api/stories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStory),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update story');
      }

      // Redirect to the story management page
      router.push('/admin/stories');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while updating the story');
      throw err; // Re-throw to let the form component handle the error state
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Link href="/admin/stories" className="text-blue-600 hover:underline flex items-center">
            ← Back to Stories
          </Link>
        </div>

        <GloriaTitle as="h1" size="4xl" color="black" className="mb-8">
          Edit Story
        </GloriaTitle>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-6">{error}</div>}

        {loading ? (
          <div className="text-gray-600">Loading story...</div>
        ) : (
          <>
            {story ? (
              <AdminStoryForm initialStory={story} onSubmit={handleSubmit} />
            ) : (
              <div className="bg-yellow-100 text-yellow-700 p-4 rounded">
                Story not found.{' '}
                <Link href="/admin/stories" className="underline">
                  Return to story list
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
}
