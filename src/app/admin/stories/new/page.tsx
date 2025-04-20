'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminStoryForm from '@/components/admin/stories/AdminStoryForm';
import { StoryDetail } from '@/types/newsTypes';
import GloriaTitle from '@/components/shared/GloriaTitle';
import AdminLayout from '@/components/admin/AdminLayout';

export default function NewStoryPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (story: StoryDetail) => {
    try {
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(story),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create story');
      }

      const data = await response.json();

      // Redirect to the story management page
      router.push('/admin/stories');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while creating the story');
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
          Create New Story
        </GloriaTitle>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-6">{error}</div>}

        <AdminStoryForm onSubmit={handleSubmit} />
      </div>
    </AdminLayout>
  );
}
