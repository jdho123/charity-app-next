import { NextResponse } from 'next/server'

const activeCampaigns: never[] = [];
const completedCampaigns: never[] = [];

export async function GET() {
  // Fetch your campaign data here
  return NextResponse.json({
    active: activeCampaigns,
    completed: completedCampaigns
  })
}