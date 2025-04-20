import fs from 'fs';
import path from 'path';
import { StoryListing, StoryDetail } from '@/types/newsTypes';

// Path to the stories data directory
const STORIES_DIR = path.join(process.cwd(), 'data', 'stories');
const STORIES_BASIC_FILE = path.join(STORIES_DIR, 'basic.json');
const STORIES_DETAILS_DIR = path.join(STORIES_DIR, 'details');

// Ensure directories exist
function ensureDirectoriesExist() {
  if (!fs.existsSync(STORIES_DIR)) {
    fs.mkdirSync(STORIES_DIR, { recursive: true });
  }

  if (!fs.existsSync(STORIES_DETAILS_DIR)) {
    fs.mkdirSync(STORIES_DETAILS_DIR, { recursive: true });
  }
}

// Function to get all story listings
export async function getAllStories(): Promise<StoryListing[]> {
  ensureDirectoriesExist();

  try {
    // Check if basic.json exists
    if (!fs.existsSync(STORIES_BASIC_FILE)) {
      // Create empty basic file if it doesn't exist
      fs.writeFileSync(STORIES_BASIC_FILE, JSON.stringify([], null, 2), 'utf8');
      return [];
    }

    // Read the basic listings file
    const fileContents = fs.readFileSync(STORIES_BASIC_FILE, 'utf8');
    const stories: StoryListing[] = JSON.parse(fileContents);

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
    const detailPath = path.join(STORIES_DETAILS_DIR, `story-${id}.json`);

    if (!fs.existsSync(detailPath)) {
      return null;
    }

    const detailContents = fs.readFileSync(detailPath, 'utf8');
    const contentData = JSON.parse(detailContents);

    // Combine basic info with content
    return {
      ...basicInfo,
      content: contentData,
    };
  } catch (error) {
    console.error(`Error reading story with ID ${id}:`, error);
    return null;
  }
}

// Function to save a new story
export async function saveStory(story: StoryDetail): Promise<boolean> {
  ensureDirectoriesExist();

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
    fs.writeFileSync(STORIES_BASIC_FILE, JSON.stringify(stories, null, 2), 'utf8');

    // Save the detailed content separately
    const detailPath = path.join(STORIES_DETAILS_DIR, `story-${story.id}.json`);
    fs.writeFileSync(detailPath, JSON.stringify(story.content, null, 2), 'utf8');

    return true;
  } catch (error) {
    console.error('Error saving story:', error);
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

    // Update the basic.json file
    fs.writeFileSync(STORIES_BASIC_FILE, JSON.stringify(filteredStories, null, 2), 'utf8');

    // Delete the detail file if it exists
    const detailPath = path.join(STORIES_DETAILS_DIR, `story-${id}.json`);
    if (fs.existsSync(detailPath)) {
      fs.unlinkSync(detailPath);
    }

    return true;
  } catch (error) {
    console.error(`Error deleting story with ID ${id}:`, error);
    return false;
  }
}

// Initialize with example data if the files don't exist
export async function initializeExampleData(): Promise<void> {
  ensureDirectoriesExist();

  // Only initialize if no data exists
  const stories = await getAllStories();
  if (stories.length > 0) {
    return;
  }

  try {
    // Get example data from your current implementation
    // This is where you'd import your example data
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
      // Add more example stories as needed
    ];

    // Save basic info
    fs.writeFileSync(STORIES_BASIC_FILE, JSON.stringify(exampleStories, null, 2), 'utf8');

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
    fs.writeFileSync(
      path.join(STORIES_DETAILS_DIR, 'story-1.json'),
      JSON.stringify(story1Content, null, 2),
      'utf8'
    );

    // Add more example story details as needed
  } catch (error) {
    console.error('Error initializing example data:', error);
  }
}
