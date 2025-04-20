import { corsHeaders } from '@/utils/cors';
import { NextRequest, NextResponse } from 'next/server';
import {
  getCampaignById,
  saveActiveCampaign,
  saveCompletedCampaign,
  deleteCampaign,
  markCampaignCompleted,
} from '@/services/campaignService';
import { ActiveCampaign, CompletedCampaign } from '@/types/campaignTypes';

// Get a campaign by ID
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = Number((await params).id);

    if (isNaN(id)) {
      const errorResponse = NextResponse.json({ error: 'Invalid campaign ID' }, { status: 400 });
      return corsHeaders(errorResponse);
    }

    const campaign = await getCampaignById(id);

    if (!campaign) {
      const errorResponse = NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
      return corsHeaders(errorResponse);
    }

    const response = NextResponse.json(campaign);
    return corsHeaders(response);
  } catch (error) {
    console.error(`Error getting campaign:`, error);
    const errorResponse = NextResponse.json({ error: 'Failed to fetch campaign' }, { status: 500 });
    return corsHeaders(errorResponse);
  }
}

// Update a campaign
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = Number((await params).id);

    if (isNaN(id)) {
      const errorResponse = NextResponse.json({ error: 'Invalid campaign ID' }, { status: 400 });
      return corsHeaders(errorResponse);
    }

    const data = await request.json();

    // Ensure ID in body matches URL
    data.id = id;

    let success = false;

    // Determine if it's an active or completed campaign
    if (data.status === 'active') {
      success = await saveActiveCampaign(data as ActiveCampaign);
    } else if (data.status === 'completed') {
      success = await saveCompletedCampaign(data as CompletedCampaign);
    } else {
      const errorResponse = NextResponse.json(
        { error: 'Invalid campaign status' },
        { status: 400 }
      );
      return corsHeaders(errorResponse);
    }

    if (!success) {
      const errorResponse = NextResponse.json(
        { error: 'Campaign not found or update failed' },
        { status: 404 }
      );
      return corsHeaders(errorResponse);
    }

    const response = NextResponse.json({ message: 'Campaign updated successfully' });
    return corsHeaders(response);
  } catch (error) {
    console.error(`Error updating campaign:`, error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to update campaign' },
      { status: 500 }
    );
    return corsHeaders(errorResponse);
  }
}

// Delete a campaign
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number((await params).id);

    if (isNaN(id)) {
      const errorResponse = NextResponse.json({ error: 'Invalid campaign ID' }, { status: 400 });
      return corsHeaders(errorResponse);
    }

    const success = await deleteCampaign(id);

    if (!success) {
      const errorResponse = NextResponse.json(
        { error: 'Campaign not found or deletion failed' },
        { status: 404 }
      );
      return corsHeaders(errorResponse);
    }

    const response = NextResponse.json({ message: 'Campaign deleted successfully' });
    return corsHeaders(response);
  } catch (error) {
    console.error(`Error deleting campaign:`, error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to delete campaign' },
      { status: 500 }
    );
    return corsHeaders(errorResponse);
  }
}

// Handle CORS preflight requests
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return corsHeaders(response);
}
