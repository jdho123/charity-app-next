// campaignService.ts
import { Campaign, ActiveCampaign, CompletedCampaign, CategoryItem } from '@/types/campaignTypes';
import { saveJsonToBlob, getJsonFromBlob, listJsonBlobs, updateJsonBlob } from './jsonBlobService';

// Prefix keys for different types of data
const ACTIVE_CAMPAIGNS_KEY = 'campaigns-active';
const COMPLETED_CAMPAIGNS_KEY = 'campaigns-completed';
const CATEGORIES_KEY = 'campaigns-categories';

// Get all active campaigns
export async function getActiveCampaigns(): Promise<ActiveCampaign[]> {
  try {
    const { blobs } = await listJsonBlobs(ACTIVE_CAMPAIGNS_KEY);

    if (!blobs || blobs.length === 0) {
      // Create empty file if it doesn't exist
      await saveJsonToBlob([] as ActiveCampaign[], ACTIVE_CAMPAIGNS_KEY);
      return [];
    }

    // Get the latest active campaigns blob
    const latestBlob = blobs.sort((a, b) => b.pathname.localeCompare(a.pathname))[0];
    const result = await getJsonFromBlob(latestBlob.url);

    if (!result.success || !result.data) {
      console.error('Failed to get active campaigns:', result.error);
      return [];
    }

    // Ensure we have an array
    if (!Array.isArray(result.data)) {
      console.error('Invalid data format for active campaigns');
      return [];
    }

    return result.data as ActiveCampaign[];
  } catch (error) {
    console.error('Error reading active campaigns:', error);
    return [];
  }
}

// Get all completed campaigns
export async function getCompletedCampaigns(): Promise<CompletedCampaign[]> {
  try {
    const { blobs } = await listJsonBlobs(COMPLETED_CAMPAIGNS_KEY);

    if (!blobs || blobs.length === 0) {
      // Create empty file if it doesn't exist
      await saveJsonToBlob([] as CompletedCampaign[], COMPLETED_CAMPAIGNS_KEY);
      return [];
    }

    // Get the latest completed campaigns blob
    const latestBlob = blobs.sort((a, b) => b.pathname.localeCompare(a.pathname))[0];
    const result = await getJsonFromBlob(latestBlob.url);

    if (!result.success || !result.data) {
      console.error('Failed to get completed campaigns:', result.error);
      return [];
    }

    // Ensure we have an array
    if (!Array.isArray(result.data)) {
      console.error('Invalid data format for completed campaigns');
      return [];
    }

    return result.data as CompletedCampaign[];
  } catch (error) {
    console.error('Error reading completed campaigns:', error);
    return [];
  }
}

// Get all categories
export async function getCategories(): Promise<CategoryItem[]> {
  try {
    const { blobs } = await listJsonBlobs(CATEGORIES_KEY);

    if (!blobs || blobs.length === 0) {
      // Create empty file if it doesn't exist
      await saveJsonToBlob([] as CategoryItem[], CATEGORIES_KEY);
      return [];
    }

    // Get the latest categories blob
    const latestBlob = blobs.sort((a, b) => b.pathname.localeCompare(a.pathname))[0];
    const result = await getJsonFromBlob(latestBlob.url);

    if (!result.success || !result.data) {
      console.error('Failed to get categories:', result.error);
      return [];
    }

    // Ensure we have an array
    if (!Array.isArray(result.data)) {
      console.error('Invalid data format for categories');
      return [];
    }

    return result.data as CategoryItem[];
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

// Helper function to update active campaigns
async function updateActiveCampaigns(campaigns: ActiveCampaign[]): Promise<boolean> {
  try {
    const { blobs } = await listJsonBlobs(ACTIVE_CAMPAIGNS_KEY);

    if (!blobs || blobs.length === 0) {
      // Create new blob
      const result = await saveJsonToBlob<ActiveCampaign[]>(campaigns, ACTIVE_CAMPAIGNS_KEY);
      return result.success;
    } else {
      // Update existing blob
      const latestBlob = blobs.sort((a, b) => b.pathname.localeCompare(a.pathname))[0];
      const result = await updateJsonBlob<ActiveCampaign[]>(latestBlob.url, campaigns);
      return result.success;
    }
  } catch (error) {
    console.error('Error updating active campaigns:', error);
    return false;
  }
}

// Helper function to update completed campaigns
async function updateCompletedCampaigns(campaigns: CompletedCampaign[]): Promise<boolean> {
  try {
    const { blobs } = await listJsonBlobs(COMPLETED_CAMPAIGNS_KEY);

    if (!blobs || blobs.length === 0) {
      // Create new blob
      const result = await saveJsonToBlob<CompletedCampaign[]>(campaigns, COMPLETED_CAMPAIGNS_KEY);
      return result.success;
    } else {
      // Update existing blob
      const latestBlob = blobs.sort((a, b) => b.pathname.localeCompare(a.pathname))[0];
      const result = await updateJsonBlob<CompletedCampaign[]>(latestBlob.url, campaigns);
      return result.success;
    }
  } catch (error) {
    console.error('Error updating completed campaigns:', error);
    return false;
  }
}

// Helper function to update categories
async function updateCategories(categories: CategoryItem[]): Promise<boolean> {
  try {
    const { blobs } = await listJsonBlobs(CATEGORIES_KEY);

    if (!blobs || blobs.length === 0) {
      // Create new blob
      const result = await saveJsonToBlob<CategoryItem[]>(categories, CATEGORIES_KEY);
      return result.success;
    } else {
      // Update existing blob
      const latestBlob = blobs.sort((a, b) => b.pathname.localeCompare(a.pathname))[0];
      const result = await updateJsonBlob<CategoryItem[]>(latestBlob.url, categories);
      return result.success;
    }
  } catch (error) {
    console.error('Error updating categories:', error);
    return false;
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
    return await updateActiveCampaigns(activeCampaigns);
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
    return await updateCompletedCampaigns(completedCampaigns);
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
      return await updateActiveCampaigns(activeCampaigns);
    }

    // Then check completed campaigns
    const completedCampaigns = await getCompletedCampaigns();
    const completedIndex = completedCampaigns.findIndex((c) => c.id === id);

    if (completedIndex >= 0) {
      // Remove from completed campaigns
      completedCampaigns.splice(completedIndex, 1);
      return await updateCompletedCampaigns(completedCampaigns);
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
    const activeSuccess = await updateActiveCampaigns(activeCampaigns);
    if (!activeSuccess) {
      return false;
    }

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
    return await updateCategories(categories);
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

    return await updateCategories(filteredCategories);
  } catch (error) {
    console.error(`Error deleting category ${name}:`, error);
    return false;
  }
}

// Initialize with example data if no data exists
export async function initializeExampleData(): Promise<void> {
  try {
    // Only initialize if no data exists
    const activeCampaigns = await getActiveCampaigns();
    const completedCampaigns = await getCompletedCampaigns();
    const categories = await getCategories();

    if (activeCampaigns.length > 0 || completedCampaigns.length > 0 || categories.length > 0) {
      return;
    }

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
    await saveJsonToBlob(exampleActiveCampaigns, ACTIVE_CAMPAIGNS_KEY);
    await saveJsonToBlob(exampleCompletedCampaigns, COMPLETED_CAMPAIGNS_KEY);
    await saveJsonToBlob(exampleCategories, CATEGORIES_KEY);

    console.log('Example campaign data initialized in Vercel Blob storage');
  } catch (error) {
    console.error('Error initializing example data:', error);
  }
}
