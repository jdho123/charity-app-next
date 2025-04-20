import { corsHeaders } from '@/utils/cors';
import { NextRequest, NextResponse } from 'next/server';
import {
  getAllStories,
  getStoryById,
  saveStory,
  updateStory,
  deleteStory,
  initializeExampleData,
} from '@/services/storyService';
import { StoryDetail } from '@/types/newsTypes';

// Initialize example data if needed (this will run on server startup)
initializeExampleData().catch(console.error);

// Get all stories or a specific story by ID
export async function GET(request: NextRequest) {
  try {
    // Check if we're requesting a specific story by ID
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (id) {
      const story = await getStoryById(Number(id));
      if (!story) {
        return corsHeaders(NextResponse.json({ error: 'Story not found' }, { status: 404 }));
      }
      return corsHeaders(NextResponse.json(story));
    }

    const stories = await getAllStories();
    return corsHeaders(NextResponse.json(stories));
  } catch (error) {
    console.error('Error in GET stories:', error);
    return corsHeaders(NextResponse.json({ error: 'Failed to fetch stories' }, { status: 500 }));
  }
}

// Create new story
export async function POST(request: NextRequest) {
  try {
    const newStory: StoryDetail = await request.json();

    // Basic validation
    if (!newStory.title || !newStory.excerpt || !newStory.date) {
      return corsHeaders(NextResponse.json({ error: 'Missing required fields' }, { status: 400 }));
    }

    const success = await saveStory(newStory);

    if (success) {
      return corsHeaders(
        NextResponse.json(
          { message: 'Story created successfully', id: newStory.id },
          { status: 201 }
        )
      );
    } else {
      return corsHeaders(NextResponse.json({ error: 'Failed to create story' }, { status: 500 }));
    }
  } catch (error) {
    console.error('Error in POST story:', error);
    return corsHeaders(NextResponse.json({ error: 'Failed to create story' }, { status: 500 }));
  }
}

// Update existing story
export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return corsHeaders(NextResponse.json({ error: 'Story ID is required' }, { status: 400 }));
    }

    const updatedStory: StoryDetail = await request.json();
    const success = await updateStory(Number(id), updatedStory);

    if (success) {
      return corsHeaders(NextResponse.json({ message: 'Story updated successfully' }));
    } else {
      return corsHeaders(
        NextResponse.json({ error: 'Story not found or update failed' }, { status: 404 })
      );
    }
  } catch (error) {
    console.error('Error in PUT story:', error);
    return corsHeaders(NextResponse.json({ error: 'Failed to update story' }, { status: 500 }));
  }
}

// Delete a story
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return corsHeaders(NextResponse.json({ error: 'Story ID is required' }, { status: 400 }));
    }

    const success = await deleteStory(Number(id));

    if (success) {
      return corsHeaders(NextResponse.json({ message: 'Story deleted successfully' }));
    } else {
      return corsHeaders(
        NextResponse.json({ error: 'Story not found or delete failed' }, { status: 404 })
      );
    }
  } catch (error) {
    console.error('Error in DELETE story:', error);
    return corsHeaders(NextResponse.json({ error: 'Failed to delete story' }, { status: 500 }));
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return corsHeaders(response);
}
