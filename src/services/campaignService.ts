import fs from 'fs';
import path from 'path';
import { Campaign, ActiveCampaign, CompletedCampaign, CategoryItem } from '@/types/campaignTypes';

// Path to the campaigns data directory
const DATA_DIR = path.join(process.cwd(), 'data');
const CAMPAIGNS_DIR = path.join(DATA_DIR, 'campaigns');
const ACTIVE_CAMPAIGNS_FILE = path.join(CAMPAIGNS_DIR, 'active.json');
const COMPLETED_CAMPAIGNS_FILE = path.join(CAMPAIGNS_DIR, 'completed.json');
const CATEGORIES_FILE = path.join(CAMPAIGNS_DIR, 'categories.json');

// Ensure directories exist
function ensureDirectoriesExist() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(CAMPAIGNS_DIR)) {
    fs.mkdirSync(CAMPAIGNS_DIR, { recursive: true });
  }
}

// Get all active campaigns
export async function getActiveCampaigns(): Promise<ActiveCampaign[]> {
  ensureDirectoriesExist();

  try {
    if (!fs.existsSync(ACTIVE_CAMPAIGNS_FILE)) {
      // Create empty file if it doesn't exist
      fs.writeFileSync(ACTIVE_CAMPAIGNS_FILE, JSON.stringify([], null, 2), 'utf8');
      return [];
    }

    const fileContents = fs.readFileSync(ACTIVE_CAMPAIGNS_FILE, 'utf8');
    return JSON.parse(fileContents) as ActiveCampaign[];
  } catch (error) {
    console.error('Error reading active campaigns:', error);
    return [];
  }
}

// Get all completed campaigns
export async function getCompletedCampaigns(): Promise<CompletedCampaign[]> {
  ensureDirectoriesExist();

  try {
    if (!fs.existsSync(COMPLETED_CAMPAIGNS_FILE)) {
      // Create empty file if it doesn't exist
      fs.writeFileSync(COMPLETED_CAMPAIGNS_FILE, JSON.stringify([], null, 2), 'utf8');
      return [];
    }

    const fileContents = fs.readFileSync(COMPLETED_CAMPAIGNS_FILE, 'utf8');
    return JSON.parse(fileContents) as CompletedCampaign[];
  } catch (error) {
    console.error('Error reading completed campaigns:', error);
    return [];
  }
}

// Get all categories
export async function getCategories(): Promise<CategoryItem[]> {
  ensureDirectoriesExist();

  try {
    if (!fs.existsSync(CATEGORIES_FILE)) {
      // Create empty file if it doesn't exist
      fs.writeFileSync(CATEGORIES_FILE, JSON.stringify([], null, 2), 'utf8');
      return [];
    }

    const fileContents = fs.readFileSync(CATEGORIES_FILE, 'utf8');
    return JSON.parse(fileContents) as CategoryItem[];
  } catch (error) {
    console.error('Error reading categories:', error);
    return [];
  }
}

// Get a specific campaign by ID
export async function getCampaignById(id: number): Promise<Campaign | null> {
  try {
    // Check active campaigns first
    const activeCampaigns = await getActiveCampaigns();
    const activeCampaign = activeCampaigns.find((campaign) => campaign.id === id);
    if (activeCampaign) return activeCampaign;

    // Then check completed campaigns
    const completedCampaigns = await getCompletedCampaigns();
    const completedCampaign = completedCampaigns.find((campaign) => campaign.id === id);
    if (completedCampaign) return completedCampaign;

    return null;
  } catch (error) {
    console.error(`Error getting campaign with ID ${id}:`, error);
    return null;
  }
}

// Save an active campaign
export async function saveActiveCampaign(campaign: ActiveCampaign): Promise<boolean> {
  try {
    const activeCampaigns = await getActiveCampaigns();

    // Determine the next available ID if not provided
    if (!campaign.id) {
      const allCampaigns = [...activeCampaigns, ...(await getCompletedCampaigns())];
      const maxId = allCampaigns.length > 0 ? Math.max(...allCampaigns.map((c) => c.id)) : 0;
      campaign.id = maxId + 1;
    }

    // Check if campaign already exists
    const existingIndex = activeCampaigns.findIndex((c) => c.id === campaign.id);

    if (existingIndex >= 0) {
      // Update existing campaign
      activeCampaigns[existingIndex] = campaign;
    } else {
      // Add new campaign
      activeCampaigns.push(campaign);
    }

    // Save the updated list
    fs.writeFileSync(ACTIVE_CAMPAIGNS_FILE, JSON.stringify(activeCampaigns, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving active campaign:', error);
    return false;
  }
}

// Save a completed campaign
export async function saveCompletedCampaign(campaign: CompletedCampaign): Promise<boolean> {
  try {
    const completedCampaigns = await getCompletedCampaigns();

    // Determine the next available ID if not provided
    if (!campaign.id) {
      const allCampaigns = [...(await getActiveCampaigns()), ...completedCampaigns];
      const maxId = allCampaigns.length > 0 ? Math.max(...allCampaigns.map((c) => c.id)) : 0;
      campaign.id = maxId + 1;
    }

    // Check if campaign already exists
    const existingIndex = completedCampaigns.findIndex((c) => c.id === campaign.id);

    if (existingIndex >= 0) {
      // Update existing campaign
      completedCampaigns[existingIndex] = campaign;
    } else {
      // Add new campaign
      completedCampaigns.push(campaign);
    }

    // Save the updated list
    fs.writeFileSync(COMPLETED_CAMPAIGNS_FILE, JSON.stringify(completedCampaigns, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving completed campaign:', error);
    return false;
  }
}

// Delete a campaign
export async function deleteCampaign(id: number): Promise<boolean> {
  try {
    // Check active campaigns first
    const activeCampaigns = await getActiveCampaigns();
    const activeIndex = activeCampaigns.findIndex((c) => c.id === id);

    if (activeIndex >= 0) {
      // Remove from active campaigns
      activeCampaigns.splice(activeIndex, 1);
      fs.writeFileSync(ACTIVE_CAMPAIGNS_FILE, JSON.stringify(activeCampaigns, null, 2), 'utf8');
      return true;
    }

    // Then check completed campaigns
    const completedCampaigns = await getCompletedCampaigns();
    const completedIndex = completedCampaigns.findIndex((c) => c.id === id);

    if (completedIndex >= 0) {
      // Remove from completed campaigns
      completedCampaigns.splice(completedIndex, 1);
      fs.writeFileSync(
        COMPLETED_CAMPAIGNS_FILE,
        JSON.stringify(completedCampaigns, null, 2),
        'utf8'
      );
      return true;
    }

    return false; // Campaign not found
  } catch (error) {
    console.error(`Error deleting campaign with ID ${id}:`, error);
    return false;
  }
}

// Move a campaign from active to completed
export async function markCampaignCompleted(
  id: number,
  completionData: { message?: string; bgColour?: string }
): Promise<boolean> {
  try {
    // Get the active campaign
    const activeCampaigns = await getActiveCampaigns();
    const campaignIndex = activeCampaigns.findIndex((c) => c.id === id);

    if (campaignIndex < 0) {
      return false; // Campaign not found
    }

    // Get the campaign and remove it from active campaigns
    const campaign = activeCampaigns[campaignIndex];
    activeCampaigns.splice(campaignIndex, 1);

    // Save the updated active campaigns
    fs.writeFileSync(ACTIVE_CAMPAIGNS_FILE, JSON.stringify(activeCampaigns, null, 2), 'utf8');

    // Convert to completed campaign
    const completedCampaign: CompletedCampaign = {
      ...campaign,
      status: 'completed',
      raised: campaign.goal, // Automatically set raised to goal
      message: completionData.message || 'Thank you for your support!',
      bgColour: completionData.bgColour || 'bg-[#E8F4FF]',
    };

    // Save as completed campaign
    return await saveCompletedCampaign(completedCampaign);
  } catch (error) {
    console.error(`Error marking campaign ${id} as completed:`, error);
    return false;
  }
}

// Save a category
export async function saveCategory(category: CategoryItem): Promise<boolean> {
  try {
    const categories = await getCategories();

    // Check if category already exists
    const existingIndex = categories.findIndex((c) => c.name === category.name);

    if (existingIndex >= 0) {
      // Update existing category
      categories[existingIndex] = category;
    } else {
      // Add new category
      categories.push(category);
    }

    // Save the updated list
    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(categories, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving category:', error);
    return false;
  }
}

// Delete a category
export async function deleteCategory(name: string): Promise<boolean> {
  try {
    const categories = await getCategories();
    const filteredCategories = categories.filter((c) => c.name !== name);

    if (filteredCategories.length === categories.length) {
      return false; // Category not found
    }

    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(filteredCategories, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error deleting category ${name}:`, error);
    return false;
  }
}

// Initialize with example data if the files don't exist
export async function initializeExampleData(): Promise<void> {
  ensureDirectoriesExist();

  // Only initialize if no data exists
  const activeCampaigns = await getActiveCampaigns();
  const completedCampaigns = await getCompletedCampaigns();
  const categories = await getCategories();

  if (activeCampaigns.length > 0 || completedCampaigns.length > 0 || categories.length > 0) {
    return;
  }

  try {
    // Example active campaigns
    const exampleActiveCampaigns: ActiveCampaign[] = [
      {
        id: 1,
        title: 'Books',
        goal: 500,
        raised: 375,
        imageUrl: '/images/books.png',
        description:
          'Access to educational materials is essential for nurturing young minds and fostering creativity. This fundraiser will help provide books for children in remote areas, creating opportunities for growth and learning.',
        status: 'active',
        fundLink: 'https://google.com',
        category: 'Books',
      },
      {
        id: 2,
        title: 'Wi-Fi for Learning',
        goal: 1000,
        raised: 450,
        imageUrl: '/images/wifi-campaign.jpg',
        description:
          'Internet access is crucial for modern education. This campaign aims to provide reliable Wi-Fi connections for schools in underserved communities.',
        status: 'active',
        fundLink: 'https://google.com',
        category: 'Wi-Fi',
      },
      {
        id: 3,
        title: 'Sports Equipment',
        goal: 750,
        raised: 300,
        imageUrl: '/images/sport-campaign.jpg',
        description:
          'Physical education is an important part of child development. Help us provide sports equipment to schools that lack proper facilities.',
        status: 'active',
        fundLink: 'https://google.com',
        category: 'Sport',
      },
    ];

    // Example completed campaigns
    const exampleCompletedCampaigns: CompletedCampaign[] = [
      {
        id: 4,
        title: 'Books for Bright Minds',
        goal: 500,
        raised: 500,
        imageUrl: '/images/sunnyDayGroupPhoto.jpeg',
        description:
          'Thanks to your incredible support, we successfully provided a new collection of books to Impact Schools, inspiring a love for reading among children.',
        status: 'completed',
        message: 'Thank you for your support!',
        bgColour: 'bg-[#E8F4FF]',
        category: 'Books',
      },
      {
        id: 5,
        title: 'Music Program Funding',
        goal: 800,
        raised: 800,
        imageUrl: '/images/sunnyDayGroupPhoto.jpeg',
        description:
          "With your help, we've been able to start a music program in five schools, providing instruments and qualified teachers.",
        status: 'completed',
        message: 'Music brings joy to our schools!',
        bgColour: 'bg-[#FFF0DB]',
        category: 'Music',
      },
    ];

    // Example categories
    const exampleCategories: CategoryItem[] = [
      { name: 'Books', color: 'bg-[#C6F0A8]' },
      { name: 'Wi-Fi', color: 'bg-[#B9C0FA]' },
      { name: 'Sport', color: 'bg-[#FFEF9A]' },
      { name: 'Music', color: 'bg-[#FFBC92]' },
    ];

    // Save example data
    fs.writeFileSync(
      ACTIVE_CAMPAIGNS_FILE,
      JSON.stringify(exampleActiveCampaigns, null, 2),
      'utf8'
    );
    fs.writeFileSync(
      COMPLETED_CAMPAIGNS_FILE,
      JSON.stringify(exampleCompletedCampaigns, null, 2),
      'utf8'
    );
    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(exampleCategories, null, 2), 'utf8');

    console.log('Example campaign data initialized');
  } catch (error) {
    console.error('Error initializing example data:', error);
  }
}
