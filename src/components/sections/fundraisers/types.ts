export interface CategoryItem {
  name: string;
  color: string;
}

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

export interface ActiveCampaign extends Campaign {
  status: 'active';
}

export interface CompletedCampaign extends Campaign {
  status: 'completed';
}
