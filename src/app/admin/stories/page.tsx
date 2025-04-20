'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { StoryListing, StoryDetail } from '@/types/newsTypes';
import GloriaTitle from '@/components/shared/GloriaTitle';
import AdminLayout from '@/components/admin/AdminLayout';

export default function ManageStories() {
  const [stories, setStories] = useState<StoryListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/stories');

      if (!response.ok) {
        throw new Error('Failed to fetch stories');
      }

      const data = await response.json();
      setStories(data);
      setError(null);
    } catch (err) {
      setError('Failed to load stories. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this story?')) {
      return;
    }

    try {
      const response = await fetch(`/api/stories/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete story');
      }

      setSuccessMessage('Story deleted successfully');
      // Remove the deleted story from the state
      setStories(stories.filter((story) => story.id !== id));

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      setError('Failed to delete story. Please try again.');
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <GloriaTitle as="h1" size="4xl" color="black">
            Manage Stories
          </GloriaTitle>
          <Link href="/admin/stories/new" className="px-4 py-2 bg-blue-600 text-white rounded">
            New Story
          </Link>
        </div>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{successMessage}</div>
        )}

        {loading ? (
          <div className="text-gray-600">Loading stories...</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {stories.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No stories found. Create a new story to get started.
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stories.map((story) => (
                    <tr key={story.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{story.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {story.excerpt}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {story.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {story.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            href={`/newsletter/${story.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                            target="_blank"
                          >
                            View
                          </Link>
                          <Link
                            href={`/admin/stories/edit/${story.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(story.id)}
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
