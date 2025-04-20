'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CategoryItem } from '@/types/campaignTypes';
import CategoryForm from '@/components/admin/campaigns/CategoryForm';
import GloriaTitle from '@/components/shared/GloriaTitle';
import AdminLayout from '@/components/admin/AdminLayout';

export default function ManageCategoriesPage() {
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
      setError(null);
    } catch (err) {
      setError('Failed to load categories. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCategory = async (category: CategoryItem) => {
    try {
      const response = await fetch('/api/campaigns/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save category');
      }

      // Refresh categories
      await fetchCategories();
    } catch (err) {
      console.error('Error saving category:', err);
      throw err; // Re-throw to let the form component handle the error state
    }
  };

  const handleDeleteCategory = async (categoryName: string) => {
    try {
      const response = await fetch(
        `/api/campaigns/categories?name=${encodeURIComponent(categoryName)}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete category');
      }

      // Refresh categories
      await fetchCategories();
    } catch (err) {
      console.error('Error deleting category:', err);
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
          Manage Campaign Categories
        </GloriaTitle>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-6">{error}</div>}

        {loading ? (
          <div className="text-gray-600">Loading categories...</div>
        ) : (
          <CategoryForm
            categories={categories}
            onSave={handleSaveCategory}
            onDelete={handleDeleteCategory}
          />
        )}
      </div>
    </AdminLayout>
  );
}
