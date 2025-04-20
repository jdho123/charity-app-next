'use client';

import { useState, useEffect } from 'react';
import {
  StoryDetail,
  StoryContentSection,
  TextSection,
  TitleSection,
  ImageSection,
  RowSection,
  ColumnSection,
} from '@/types/newsTypes';
import GloriaTitle from '@/components/shared/GloriaTitle';
import ImageUploader from '@/components/admin/ImageUploader';

interface StoryFormProps {
  initialStory?: StoryDetail;
  onSubmit: (story: StoryDetail) => Promise<void>;
}

const defaultStory: StoryDetail = {
  id: 0,
  title: '',
  excerpt: '',
  date: new Date().toLocaleDateString('en-US'),
  image: '',
  category: 'News',
  readTime: 3,
  content: [
    {
      type: 'title',
      id: 'main-title',
      content: '',
    },
    {
      type: 'text',
      id: 'intro-text',
      content: '',
    },
  ],
};

const AdminStoryForm: React.FC<StoryFormProps> = ({ initialStory, onSubmit }) => {
  const [story, setStory] = useState<StoryDetail>(initialStory || defaultStory);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Update the form if initialStory changes
  useEffect(() => {
    if (initialStory) {
      setStory(initialStory);
    }
  }, [initialStory]);

  const handleBasicInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStory((prev) => ({
      ...prev,
      [name]: name === 'readTime' ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleContentUpdate = (index: number, updatedSection: StoryContentSection) => {
    const newContent = [...story.content];
    newContent[index] = updatedSection;
    setStory((prev) => ({
      ...prev,
      content: newContent,
    }));
  };

  // Update text or title content
  const handleContentTextChange = (index: number, value: string) => {
    const section = story.content[index];
    if (section.type === 'text' || section.type === 'title') {
      handleContentUpdate(index, {
        ...section,
        content: value,
      } as TextSection | TitleSection);
    }
  };

  // Update image properties
  const handleImageChange = (index: number, field: 'src' | 'alt', value: string) => {
    const section = story.content[index];
    if (section.type === 'image') {
      handleContentUpdate(index, {
        ...section,
        [field]: value,
      } as ImageSection);
    }
  };

  // Handle image upload for a section
  const handleSectionImageUpload = (index: number, imagePath: string) => {
    const section = story.content[index];
    if (section.type === 'image') {
      handleContentUpdate(index, {
        ...section,
        src: imagePath,
      } as ImageSection);
    }
  };

  // Handle featured image upload
  const handleFeaturedImageUpload = (imagePath: string) => {
    setStory((prev) => ({
      ...prev,
      image: imagePath,
    }));
  };

  // Add a new content section
  const addContentSection = (type: 'text' | 'title' | 'image' | 'row') => {
    const newId = `${type}-${Date.now()}`;
    let newSection: StoryContentSection;

    switch (type) {
      case 'text':
        newSection = {
          type: 'text',
          id: newId,
          content: '',
        } as TextSection;
        break;
      case 'title':
        newSection = {
          type: 'title',
          id: newId,
          content: '',
        } as TitleSection;
        break;
      case 'image':
        newSection = {
          type: 'image',
          id: newId,
          src: '',
          alt: '',
        } as ImageSection;
        break;
      case 'row':
        newSection = {
          type: 'row',
          id: newId,
          content: [
            {
              type: 'column',
              id: `column-1-${Date.now()}`,
              content: [],
            } as ColumnSection,
          ],
        } as RowSection;
        break;
      default:
        return;
    }

    setStory((prev) => ({
      ...prev,
      content: [...prev.content, newSection],
    }));
  };

  // Add a column to a row
  const addColumnToRow = (rowIndex: number) => {
    const row = story.content[rowIndex];
    if (row.type !== 'row') return;

    // Don't add more than 2 columns
    if ((row as RowSection).content.length >= 2) {
      alert('Maximum of 2 columns per row allowed');
      return;
    }

    const newColumn = {
      type: 'column',
      id: `column-${Date.now()}`,
      content: [],
    } as ColumnSection;

    const updatedRow = {
      ...row,
      content: [...row.content, newColumn],
    } as RowSection;

    handleContentUpdate(rowIndex, updatedRow);
  };

  // Add a content element to a column
  const addContentToColumn = (
    rowIndex: number,
    columnIndex: number,
    type: 'text' | 'title' | 'image'
  ) => {
    const row = story.content[rowIndex] as RowSection;
    if (row.type !== 'row') return;

    const column = row.content[columnIndex] as ColumnSection;
    if (!column) return;

    const newId = `${type}-${Date.now()}`;
    let newContent;

    switch (type) {
      case 'text':
        newContent = {
          type: 'text',
          id: newId,
          content: '',
        } as TextSection;
        break;
      case 'title':
        newContent = {
          type: 'title',
          id: newId,
          content: '',
        } as TitleSection;
        break;
      case 'image':
        newContent = {
          type: 'image',
          id: newId,
          src: '',
          alt: '',
        } as ImageSection;
        break;
      default:
        return;
    }

    const updatedColumn = {
      ...column,
      content: [...column.content, newContent],
    };

    const updatedRowContent = [...row.content];
    updatedRowContent[columnIndex] = updatedColumn;

    const updatedRow = {
      ...row,
      content: updatedRowContent,
    };

    handleContentUpdate(rowIndex, updatedRow);
  };

  // Handle image upload for column content
  const handleColumnImageUpload = (
    rowIndex: number,
    columnIndex: number,
    contentIndex: number,
    imagePath: string
  ) => {
    const row = story.content[rowIndex] as RowSection;
    if (row.type !== 'row') return;

    const column = row.content[columnIndex] as ColumnSection;
    if (!column) return;

    const contentItem = column.content[contentIndex];
    if (!contentItem || contentItem.type !== 'image') return;

    const updatedContentItem = {
      ...contentItem,
      src: imagePath,
    };

    const updatedColumnContent = [...column.content];
    updatedColumnContent[contentIndex] = updatedContentItem;

    const updatedColumn = {
      ...column,
      content: updatedColumnContent,
    };

    const updatedRowContent = [...row.content];
    updatedRowContent[columnIndex] = updatedColumn;

    const updatedRow = {
      ...row,
      content: updatedRowContent,
    };

    handleContentUpdate(rowIndex, updatedRow);
  };

  // Update column content
  const handleColumnContentChange = (
    rowIndex: number,
    columnIndex: number,
    contentIndex: number,
    field: string,
    value: string
  ) => {
    const row = story.content[rowIndex] as RowSection;
    if (row.type !== 'row') return;

    const column = row.content[columnIndex] as ColumnSection;
    if (!column) return;

    const contentItem = column.content[contentIndex];
    if (!contentItem) return;

    let updatedContentItem;

    if (contentItem.type === 'text' || contentItem.type === 'title') {
      updatedContentItem = {
        ...contentItem,
        content: value,
      };
    } else if (contentItem.type === 'image') {
      updatedContentItem = {
        ...contentItem,
        [field]: value,
      };
    } else {
      return;
    }

    const updatedColumnContent = [...column.content];
    updatedColumnContent[contentIndex] = updatedContentItem;

    const updatedColumn = {
      ...column,
      content: updatedColumnContent,
    };

    const updatedRowContent = [...row.content];
    updatedRowContent[columnIndex] = updatedColumn;

    const updatedRow = {
      ...row,
      content: updatedRowContent,
    };

    handleContentUpdate(rowIndex, updatedRow);
  };

  // Remove a column from a row
  const removeColumnFromRow = (rowIndex: number, columnIndex: number) => {
    const row = story.content[rowIndex] as RowSection;
    if (row.type !== 'row') return;

    // Don't remove if there's only one column left
    if (row.content.length <= 1) return;

    const updatedRowContent = [...row.content];
    updatedRowContent.splice(columnIndex, 1);

    const updatedRow = {
      ...row,
      content: updatedRowContent,
    };

    handleContentUpdate(rowIndex, updatedRow);
  };

  // Remove a content item from a column
  const removeContentFromColumn = (rowIndex: number, columnIndex: number, contentIndex: number) => {
    const row = story.content[rowIndex] as RowSection;
    if (row.type !== 'row') return;

    const column = row.content[columnIndex] as ColumnSection;
    if (!column) return;

    const updatedColumnContent = [...column.content];
    updatedColumnContent.splice(contentIndex, 1);

    const updatedColumn = {
      ...column,
      content: updatedColumnContent,
    };

    const updatedRowContent = [...row.content];
    updatedRowContent[columnIndex] = updatedColumn;

    const updatedRow = {
      ...row,
      content: updatedRowContent,
    };

    handleContentUpdate(rowIndex, updatedRow);
  };

  // Remove a content section
  const removeContentSection = (index: number) => {
    const newContent = [...story.content];
    newContent.splice(index, 1);
    setStory((prev) => ({
      ...prev,
      content: newContent,
    }));
  };

  // Move a section up or down
  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === story.content.length - 1)
    ) {
      return;
    }

    const newContent = [...story.content];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    [newContent[index], newContent[newIndex]] = [newContent[newIndex], newContent[index]];

    setStory((prev) => ({
      ...prev,
      content: newContent,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await onSubmit(story);
      setSuccess(true);

      // If it's a new story, reset the form
      if (!initialStory) {
        setStory(defaultStory);
      }
    } catch (err) {
      setError('Failed to save the story. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      <GloriaTitle as="h2" size="3xl" color="black" className="mb-4">
        {initialStory ? 'Edit Story' : 'Create New Story'}
      </GloriaTitle>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}

      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded">
          Story {initialStory ? 'updated' : 'created'} successfully!
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
              value={story.title}
              onChange={handleBasicInfoChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              value={story.category}
              onChange={handleBasicInfoChange}
              className="w-full p-2 border rounded"
            >
              <option value="Latest News">Latest News</option>
              <option value="News">News</option>
              <option value="Events">Events</option>
              <option value="Updates">Updates</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={story.date
                .split('/')
                .reverse()
                .join('-')} /* Format MM/DD/YYYY to YYYY-MM-DD for date input */
              onChange={handleBasicInfoChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Read Time (minutes)</label>
            <input
              type="number"
              name="readTime"
              value={story.readTime}
              onChange={handleBasicInfoChange}
              className="w-full p-2 border rounded"
              min="1"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Excerpt</label>
            <textarea
              name="excerpt"
              value={story.excerpt}
              onChange={handleBasicInfoChange}
              className="w-full p-2 border rounded"
              rows={2}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Featured Image</label>
            <ImageUploader
              initialImageUrl={story.image}
              onImageUpload={handleFeaturedImageUpload}
            />
            <p className="text-sm text-gray-500 mt-1">
              Upload an image for this story, or provide a URL below
            </p>
            <input
              type="text"
              name="image"
              value={story.image}
              onChange={handleBasicInfoChange}
              className="w-full p-2 border rounded mt-2"
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <GloriaTitle as="h3" size="2xl" color="black">
            Content Sections
          </GloriaTitle>
          <div className="space-x-2">
            <button
              type="button"
              onClick={() => addContentSection('title')}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded"
            >
              Add Title
            </button>
            <button
              type="button"
              onClick={() => addContentSection('text')}
              className="px-3 py-1 bg-green-100 text-green-700 rounded"
            >
              Add Text
            </button>
            <button
              type="button"
              onClick={() => addContentSection('image')}
              className="px-3 py-1 bg-purple-100 text-purple-700 rounded"
            >
              Add Image
            </button>
            <button
              type="button"
              onClick={() => addContentSection('row')}
              className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded"
            >
              Add Row
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {story.content.map((section, index) => (
            <div key={section.id} className="border p-4 rounded relative">
              <div className="absolute right-2 top-2 space-x-1">
                <button
                  type="button"
                  onClick={() => moveSection(index, 'up')}
                  disabled={index === 0}
                  className="px-2 py-1 bg-gray-200 rounded text-sm disabled:opacity-50"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveSection(index, 'down')}
                  disabled={index === story.content.length - 1}
                  className="px-2 py-1 bg-gray-200 rounded text-sm disabled:opacity-50"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeContentSection(index)}
                  className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm"
                >
                  Remove
                </button>
              </div>

              <div className="mt-6">
                {section.type === 'title' && (
                  <div>
                    <h4 className="font-medium mb-2">Title Section</h4>
                    <input
                      type="text"
                      value={(section as TitleSection).content}
                      onChange={(e) => handleContentTextChange(index, e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Enter title text"
                    />
                  </div>
                )}

                {section.type === 'text' && (
                  <div>
                    <h4 className="font-medium mb-2">Text Section</h4>
                    <textarea
                      value={(section as TextSection).content}
                      onChange={(e) => handleContentTextChange(index, e.target.value)}
                      className="w-full p-2 border rounded"
                      rows={4}
                      placeholder="Enter paragraph text"
                    />
                  </div>
                )}

                {section.type === 'image' && (
                  <div>
                    <h4 className="font-medium mb-2">Image Section</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <ImageUploader
                        initialImageUrl={(section as ImageSection).src}
                        onImageUpload={(imagePath) => handleSectionImageUpload(index, imagePath)}
                      />
                      <div>
                        <label className="block mb-1 text-sm">Image URL</label>
                        <input
                          type="text"
                          value={(section as ImageSection).src}
                          onChange={(e) => handleImageChange(index, 'src', e.target.value)}
                          className="w-full p-2 border rounded"
                          placeholder="/images/example.jpg"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm">Alt Text</label>
                        <input
                          type="text"
                          value={(section as ImageSection).alt || ''}
                          onChange={(e) => handleImageChange(index, 'alt', e.target.value)}
                          className="w-full p-2 border rounded"
                          placeholder="Description of the image"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {section.type === 'row' && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Row Section (max 2 columns)</h4>
                      <button
                        type="button"
                        onClick={() => addColumnToRow(index)}
                        className={`px-2 py-1 rounded text-sm ${
                          (section as RowSection).content.length >= 2
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                        disabled={(section as RowSection).content.length >= 2}
                      >
                        Add Column
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(section as RowSection).content.map((column, colIndex) => (
                        <div
                          key={column.id}
                          className={`border p-3 rounded ${(section as RowSection).content.length === 1 ? 'md:col-span-2' : ''}`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="font-medium text-sm">
                              Column {colIndex + 1}{' '}
                              {(section as RowSection).content.length === 1
                                ? '(Full Width)'
                                : '(Half Width)'}
                            </h5>
                            <button
                              type="button"
                              onClick={() => removeColumnFromRow(index, colIndex)}
                              className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs"
                              disabled={(section as RowSection).content.length <= 1}
                            >
                              Remove
                            </button>
                          </div>

                          <div className="space-y-3">
                            {(column as ColumnSection).content.map((item, itemIndex) => (
                              <div key={item.id} className="border-t pt-2">
                                {item.type === 'text' && (
                                  <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <label className="text-xs font-medium">Text</label>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          removeContentFromColumn(index, colIndex, itemIndex)
                                        }
                                        className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                    <textarea
                                      value={(item as TextSection).content}
                                      onChange={(e) =>
                                        handleColumnContentChange(
                                          index,
                                          colIndex,
                                          itemIndex,
                                          'content',
                                          e.target.value
                                        )
                                      }
                                      className="w-full p-2 border rounded text-sm"
                                      rows={3}
                                    />
                                  </div>
                                )}

                                {item.type === 'title' && (
                                  <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <label className="text-xs font-medium">Title</label>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          removeContentFromColumn(index, colIndex, itemIndex)
                                        }
                                        className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                    <input
                                      type="text"
                                      value={(item as TitleSection).content}
                                      onChange={(e) =>
                                        handleColumnContentChange(
                                          index,
                                          colIndex,
                                          itemIndex,
                                          'content',
                                          e.target.value
                                        )
                                      }
                                      className="w-full p-2 border rounded text-sm"
                                    />
                                  </div>
                                )}

                                {item.type === 'image' && (
                                  <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <label className="text-xs font-medium">Image</label>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          removeContentFromColumn(index, colIndex, itemIndex)
                                        }
                                        className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                    <ImageUploader
                                      initialImageUrl={(item as ImageSection).src}
                                      onImageUpload={(imagePath) =>
                                        handleColumnImageUpload(
                                          index,
                                          colIndex,
                                          itemIndex,
                                          imagePath
                                        )
                                      }
                                      className="mb-2"
                                    />
                                    <input
                                      type="text"
                                      value={(item as ImageSection).src}
                                      onChange={(e) =>
                                        handleColumnContentChange(
                                          index,
                                          colIndex,
                                          itemIndex,
                                          'src',
                                          e.target.value
                                        )
                                      }
                                      className="w-full p-2 border rounded text-sm mb-1"
                                      placeholder="Image URL"
                                    />
                                    <input
                                      type="text"
                                      value={(item as ImageSection).alt || ''}
                                      onChange={(e) =>
                                        handleColumnContentChange(
                                          index,
                                          colIndex,
                                          itemIndex,
                                          'alt',
                                          e.target.value
                                        )
                                      }
                                      className="w-full p-2 border rounded text-sm"
                                      placeholder="Alt text"
                                    />
                                  </div>
                                )}
                              </div>
                            ))}

                            <div className="flex space-x-2 mt-2">
                              <button
                                type="button"
                                onClick={() => addContentToColumn(index, colIndex, 'text')}
                                className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs flex-1"
                              >
                                + Text
                              </button>
                              <button
                                type="button"
                                onClick={() => addContentToColumn(index, colIndex, 'title')}
                                className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs flex-1"
                              >
                                + Title
                              </button>
                              <button
                                type="button"
                                onClick={() => addContentToColumn(index, colIndex, 'image')}
                                className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs flex-1"
                              >
                                + Image
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {story.content.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              No content sections yet. Add some using the buttons above.
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => setStory(initialStory || defaultStory)}
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
          {loading ? 'Saving...' : initialStory ? 'Update Story' : 'Create Story'}
        </button>
      </div>
    </form>
  );
};

export default AdminStoryForm;
