// app/api/campaigns/route.ts

import { corsHeaders } from '@/utils/cors';
import { NextRequest, NextResponse } from 'next/server';
import {
  getActiveCampaigns,
  getCompletedCampaigns,
  getCategories,
  saveActiveCampaign,
  saveCompletedCampaign,
  deleteCampaign,
  initializeExampleData,
} from '@/services/campaignService';
import { ActiveCampaign, CompletedCampaign } from '@/types/campaignTypes';

// Initialize example data if needed
initializeExampleData().catch(console.error);

export async function GET() {
  try {
    // Get all data types
    const activeCampaigns = await getActiveCampaigns();
    const completedCampaigns = await getCompletedCampaigns();
    const categories = await getCategories();

    // Create response with all data
    const response = NextResponse.json({
      active: activeCampaigns,
      completed: completedCampaigns,
      categories: categories,
    });

    // Add CORS headers and return
    return corsHeaders(response);
  } catch (error) {
    console.error('Error in GET campaigns:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to fetch campaigns' },
      { status: 500 }
    );
    return corsHeaders(errorResponse);
  }
}

// Create a new campaign
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.title || !data.goal || !data.category) {
      const errorResponse = NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
      return corsHeaders(errorResponse);
    }

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
        { error: 'Failed to save campaign' },
        { status: 500 }
      );
      return corsHeaders(errorResponse);
    }

    const response = NextResponse.json(
      { message: 'Campaign created successfully', id: data.id },
      { status: 201 }
    );
    return corsHeaders(response);
  } catch (error) {
    console.error('Error in POST campaign:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to create campaign' },
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
