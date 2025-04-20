export interface CategoryItem {
  name: string;
  color: string;
}

// Base campaign interface
export interface Campaign {
  id: number;
  title: string;
  goal: number;
  raised: number;
  imageUrl: string;
  description: string;
  status: 'active' | 'completed';
  category: string;
  fundLink?: string;
}

// Active campaign interface
export interface ActiveCampaign extends Campaign {
  status: 'active';
}

// Completed campaign interface
export interface CompletedCampaign extends Campaign {
  status: 'completed';
  message?: string;
  bgColour?: string;
}
