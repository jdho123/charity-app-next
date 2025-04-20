// storyService.ts
import { StoryListing, StoryDetail, StoryContentSection } from '@/types/newsTypes';
import {
  saveJsonToBlob,
  getJsonFromBlob,
  listJsonBlobs,
  deleteJsonBlob,
  updateJsonBlob,
} from './jsonBlobService';

// Prefix keys for different types of data
const STORY_LISTINGS_KEY = 'story-listings';
const STORY_DETAIL_PREFIX = 'story-detail-';

// Function to get all story listings
export async function getAllStories(): Promise<StoryListing[]> {
  try {
    // Try to fetch the listings blob
    const { blobs } = await listJsonBlobs(STORY_LISTINGS_KEY);

    // If no listings blob exists yet, create an empty one
    if (!blobs || blobs.length === 0) {
      await saveJsonToBlob([] as StoryListing[], STORY_LISTINGS_KEY);
      return [];
    }

    // Get the latest listings blob (should only be one, but just in case)
    const latestBlob = blobs.sort((a, b) => b.pathname.localeCompare(a.pathname))[0];

    // Fetch the data
    const result = await getJsonFromBlob(latestBlob.url);

    if (!result.success || !result.data) {
      console.error('Failed to get story listings:', result.error);
      return [];
    }

    // Ensure we have an array
    if (!Array.isArray(result.data)) {
      console.error('Invalid data format for story listings');
      return [];
    }

    // Cast data to the correct type
    const stories = result.data as StoryListing[];

    // Sort by date (newest first)
    return stories.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading story listings:', error);
    return [];
  }
}

// Function to get a specific story by ID
export async function getStoryById(id: number): Promise<StoryDetail | null> {
  try {
    // First, get the basic info
    const allStories = await getAllStories();
    const basicInfo = allStories.find((story) => story.id === id);

    if (!basicInfo) {
      return null;
    }

    // Then get the detailed content
    const { blobs } = await listJsonBlobs(`${STORY_DETAIL_PREFIX}${id}`);

    if (!blobs || blobs.length === 0) {
      return null;
    }

    // Get the latest version of the content
    const latestBlob = blobs.sort((a, b) => b.pathname.localeCompare(a.pathname))[0];
    const result = await getJsonFromBlob<StoryContentSection[]>(latestBlob.url);

    if (!result.success || !result.data) {
      console.error(`Failed to get story content for ID ${id}:`, result.error);
      return null;
    }

    // Check if we have valid content data
    if (!Array.isArray(result.data)) {
      console.error(`Invalid content format for story ID ${id}`);
      return null;
    }

    // Combine basic info with content
    return {
      ...basicInfo,
      content: result.data,
    };
  } catch (error) {
    console.error(`Error reading story with ID ${id}:`, error);
    return null;
  }
}

// Function to save a new story
export async function saveStory(story: StoryDetail): Promise<boolean> {
  try {
    // Get all existing stories
    const stories = await getAllStories();

    // Determine the next available ID if not provided
    if (!story.id) {
      const maxId = stories.length > 0 ? Math.max(...stories.map((s) => s.id)) : 0;
      story.id = maxId + 1;
    }

    // Check if story already exists
    const existingIndex = stories.findIndex((s) => s.id === story.id);

    // Create basic story info
    const basicInfo: StoryListing = {
      id: story.id,
      title: story.title,
      excerpt: story.excerpt,
      date: story.date,
      image: story.image,
      category: story.category,
      readTime: story.readTime,
    };

    // Update or add to the stories array
    if (existingIndex >= 0) {
      stories[existingIndex] = basicInfo;
    } else {
      stories.push(basicInfo);
    }

    // Save the basic info
    const listingsResult = await updateOrCreateListings(stories);
    if (!listingsResult) {
      return false;
    }

    // Save the detailed content separately
    const contentResult = await saveJsonToBlob(story.content, `${STORY_DETAIL_PREFIX}${story.id}`);

    return contentResult.success;
  } catch (error) {
    console.error('Error saving story:', error);
    return false;
  }
}

// Helper function to update or create listings blob
async function updateOrCreateListings(stories: StoryListing[]): Promise<boolean> {
  try {
    const { blobs } = await listJsonBlobs(STORY_LISTINGS_KEY);

    if (!blobs || blobs.length === 0) {
      // Create new listings blob
      const result = await saveJsonToBlob<StoryListing[]>(stories, STORY_LISTINGS_KEY);
      return result.success;
    } else {
      // Update existing listings blob
      const latestBlob = blobs.sort((a, b) => b.pathname.localeCompare(a.pathname))[0];
      const result = await updateJsonBlob<StoryListing[]>(latestBlob.url, stories);
      return result.success;
    }
  } catch (error) {
    console.error('Error updating story listings:', error);
    return false;
  }
}

// Function to update an existing story
export async function updateStory(id: number, updatedStory: StoryDetail): Promise<boolean> {
  // Ensure the ID in the updated story matches
  updatedStory.id = id;
  return saveStory(updatedStory); // Reuse the save function since it handles updates
}

// Function to delete a story
export async function deleteStory(id: number): Promise<boolean> {
  try {
    // Get all stories
    const stories = await getAllStories();
    const filteredStories = stories.filter((story) => story.id !== id);

    // If no stories were removed, the ID didn't exist
    if (filteredStories.length === stories.length) {
      return false;
    }

    // Update the listings
    const listingsResult = await updateOrCreateListings(filteredStories);
    if (!listingsResult) {
      return false;
    }

    // Delete the detail blob if it exists
    const { blobs } = await listJsonBlobs(`${STORY_DETAIL_PREFIX}${id}`);
    if (blobs && blobs.length > 0) {
      // Delete all versions of this story's content
      const deletePromises = blobs.map((blob) => deleteJsonBlob(blob.url));
      await Promise.all(deletePromises);
    }

    return true;
  } catch (error) {
    console.error(`Error deleting story with ID ${id}:`, error);
    return false;
  }
}

// Initialize with example data if no data exists
export async function initializeExampleData(): Promise<void> {
  try {
    // Only initialize if no data exists
    const stories = await getAllStories();
    if (stories.length > 0) {
      return;
    }

    // Example basic story data
    const exampleStories = [
      {
        id: 1,
        title: 'Solar Panels Installed at Impact Schools',
        excerpt: 'Bringing sustainable energy solutions to our partner schools...',
        date: '09/01/2025',
        image: '/images/solarPanels.jpeg',
        category: 'Latest News',
        readTime: 5,
      },
      {
        id: 2,
        title: 'New Teaching Program Launches',
        excerpt: 'Expanding our reach with innovative teaching methods...',
        date: '08/15/2025',
        image: '/images/teaching.jpeg',
        category: 'News',
        readTime: 4,
      },
    ];

    // Save basic info
    await saveJsonToBlob(exampleStories, STORY_LISTINGS_KEY);

    // Example detailed content for story 1
    const story1Content = [
      {
        type: 'image',
        id: 'main-image',
        src: '/images/solarPanels.jpeg',
        alt: 'Solar panels being installed at an impact school',
      },
      {
        type: 'title',
        id: 'main-title',
        content: 'Solar Panels Installed at Impact Schools',
      },
      {
        type: 'text',
        id: 'intro-text',
        content:
          "We're proud to announce the successful installation of solar panels across five of our impact schools, providing clean, renewable energy and reducing operational costs that can be redirected to educational resources.",
      },
      {
        type: 'row',
        id: 'image-text-row',
        content: [
          {
            type: 'column',
            id: 'image-column',
            content: [
              {
                type: 'image',
                id: 'detail-image',
                src: '/images/solar-installation.jpeg',
                alt: 'Close-up of solar panel installation',
              },
            ],
          },
          {
            type: 'column',
            id: 'text-column',
            content: [
              {
                type: 'text',
                id: 'detail-text',
                content:
                  'The solar panel project was completed in partnership with GreenEnergy Solutions, who provided technical expertise and installation services.',
              },
            ],
          },
        ],
      },
      {
        type: 'row',
        id: 'single-column-row',
        content: [
          {
            type: 'column',
            id: 'full-width-column',
            content: [
              {
                type: 'text',
                id: 'full-width-text',
                content:
                  'This is an example of a full-width single column within a row layout. It spans the entire width of the content area.',
              },
            ],
          },
        ],
      },
    ];

    // Save detailed content
    await saveJsonToBlob(story1Content, `${STORY_DETAIL_PREFIX}1`);

    console.log('Example story data initialized in Vercel Blob storage');
  } catch (error) {
    console.error('Error initializing example data:', error);
  }
}
