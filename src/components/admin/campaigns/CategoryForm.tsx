'use client';

import { useState } from 'react';
import { CategoryItem } from '@/types/campaignTypes';
import GloriaTitle from '@/components/shared/GloriaTitle';

interface CategoryFormProps {
  categories: CategoryItem[];
  onSave: (category: CategoryItem) => Promise<void>;
  onDelete: (categoryName: string) => Promise<void>;
}

export default function CategoryForm({ categories, onSave, onDelete }: CategoryFormProps) {
  const [newCategory, setNewCategory] = useState<CategoryItem>({ name: '', color: 'bg-[#FFFFFF]' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const predefinedColors = [
    'bg-[#C6F0A8]', // Light green
    'bg-[#B9C0FA]', // Light blue
    'bg-[#FFEF9A]', // Light yellow
    'bg-[#FFBC92]', // Light orange
    'bg-[#FFC0CB]', // Light pink
    'bg-[#D8BFD8]', // Light purple
    'bg-[#E6E6FA]', // Lavender
    'bg-[#F0FFF0]', // Honeydew
    'bg-[#F5F5DC]', // Beige
    'bg-[#E0FFFF]', // Light cyan
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCategory({
      ...newCategory,
      [name]: value,
    });
  };

  const handleColorSelect = (color: string) => {
    setNewCategory({
      ...newCategory,
      color,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCategory.name.trim()) {
      setError('Category name is required');
      return;
    }

    if (!newCategory.color) {
      setError('Category color is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onSave(newCategory);
      setSuccess(`Category "${newCategory.name}" saved successfully!`);
      setNewCategory({ name: '', color: 'bg-[#FFFFFF]' });

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setError(`Failed to save category: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (categoryName: string) => {
    if (!confirm(`Are you sure you want to delete category "${categoryName}"?`)) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onDelete(categoryName);
      setSuccess(`Category "${categoryName}" deleted successfully!`);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setError(`Failed to delete category: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <GloriaTitle as="h2" size="3xl" color="black" className="mb-6">
        Manage Categories
      </GloriaTitle>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Categories List */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-4">Current Categories</h3>

          {categories.length === 0 ? (
            <p className="text-gray-500">No categories defined yet.</p>
          ) : (
            <ul className="space-y-3">
              {categories.map((category) => (
                <li
                  key={category.name}
                  className="flex items-center justify-between border p-3 rounded"
                >
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 mr-3 rounded ${category.color}`}
                      style={{ border: '1px solid #000' }}
                    ></div>
                    <span>{category.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(category.name)}
                    className="text-red-600 hover:text-red-800"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Add/Update Category Form */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-4">
            {newCategory.name ? `Create: ${newCategory.name}` : 'Create New Category'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Category Name</label>
              <input
                type="text"
                name="name"
                value={newCategory.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Custom Color</label>
              <input
                type="text"
                name="color"
                value={newCategory.color}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
                disabled={loading}
                placeholder="bg-[#HEXCODE]"
              />
              <p className="text-xs text-gray-500 mt-1">Use Tailwind format, e.g., bg-[#C6F0A8]</p>
            </div>

            {/* Color Presets */}
            <div>
              <label className="block mb-1 font-medium">Preset Colors</label>
              <div className="flex flex-wrap gap-2">
                {predefinedColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`w-8 h-8 rounded cursor-pointer ${color} hover:opacity-80`}
                    style={{
                      border: '1px solid #000',
                      boxShadow: newCategory.color === color ? '0 0 0 2px #3B82F6' : 'none',
                    }}
                    onClick={() => handleColorSelect(color)}
                    disabled={loading}
                  ></button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="mt-4">
              <label className="block mb-1 font-medium">Preview</label>
              <div
                className={`w-full h-12 rounded flex items-center justify-center ${newCategory.color} border border-black`}
              >
                <span className="font-bold">{newCategory.name || 'Category Preview'}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-blue-600 text-white rounded"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Category'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
