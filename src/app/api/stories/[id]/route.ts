// app/api/stories/[id]/route.ts
import { corsHeaders } from '@/utils/cors';
import { NextRequest, NextResponse } from 'next/server';
import { getStoryById, updateStory, deleteStory } from '@/services/storyService';
import { StoryDetail } from '@/types/newsTypes';

// Get a specific story by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);

    if (isNaN(id)) {
      return corsHeaders(NextResponse.json({ error: 'Invalid story ID' }, { status: 400 }));
    }

    const story = await getStoryById(id);

    if (!story) {
      return corsHeaders(NextResponse.json({ error: 'Story not found' }, { status: 404 }));
    }

    return corsHeaders(NextResponse.json(story));
  } catch (error) {
    console.error('Error in GET story:', error);
    return corsHeaders(NextResponse.json({ error: 'Failed to fetch story' }, { status: 500 }));
  }
}

// Update a specific story
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);

    if (isNaN(id)) {
      return corsHeaders(NextResponse.json({ error: 'Invalid story ID' }, { status: 400 }));
    }

    const updatedStory: StoryDetail = await request.json();
    const success = await updateStory(id, updatedStory);

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

// Delete a specific story
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);

    if (isNaN(id)) {
      return corsHeaders(NextResponse.json({ error: 'Invalid story ID' }, { status: 400 }));
    }

    const success = await deleteStory(id);

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
