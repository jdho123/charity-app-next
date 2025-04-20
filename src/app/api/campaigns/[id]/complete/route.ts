import { corsHeaders } from '@/utils/cors';
import { NextRequest, NextResponse } from 'next/server';
import { markCampaignCompleted } from '@/services/campaignService';

// Mark a campaign as completed
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = Number((await params).id);

    if (isNaN(id)) {
      const errorResponse = NextResponse.json({ error: 'Invalid campaign ID' }, { status: 400 });
      return corsHeaders(errorResponse);
    }

    // Get completion data from request
    const data = await request.json();
    const completionData = {
      message: data.message,
      bgColour: data.bgColour,
    };

    const success = await markCampaignCompleted(id, completionData);

    if (!success) {
      const errorResponse = NextResponse.json(
        { error: 'Campaign not found or completion failed' },
        { status: 404 }
      );
      return corsHeaders(errorResponse);
    }

    const response = NextResponse.json({ message: 'Campaign marked as completed successfully' });
    return corsHeaders(response);
  } catch (error) {
    console.error(`Error completing campaign:`, error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to complete campaign' },
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
