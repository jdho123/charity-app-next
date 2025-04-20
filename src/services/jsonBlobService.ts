// jsonBlobService.ts
import { put, list, del } from '@vercel/blob';

// Generate a unique filename for JSON data
const generateUniqueFilename = (name: string): string => {
  const timestamp = Date.now();
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return `${cleanName}-${timestamp}.json`;
};

// Save JSON data to Vercel Blob Storage with better typing
export const saveJsonToBlob = async <T>(
  data: T,
  name: string
): Promise<{ success: boolean; url?: string; error?: string }> => {
  try {
    // Convert the data to JSON string
    const jsonString = JSON.stringify(data, null, 2);

    // Create a Blob with the JSON data
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Generate filename
    const filename = generateUniqueFilename(name);

    // Upload to Vercel Blob Storage
    const result = await put(filename, blob, {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
    });

    // Return the URL to the uploaded blob
    return {
      success: true,
      url: result.url,
    };
  } catch (error) {
    console.error('Error saving JSON to blob:', error);
    return {
      success: false,
      error: `Failed to save JSON data: ${(error as Error).message}`,
    };
  }
};
// Get JSON data from Vercel Blob Storage
export const getJsonFromBlob = async <T = Record<string, unknown>>(
  url: string
): Promise<{
  success: boolean;
  data?: T;
  error?: string;
}> => {
  try {
    // Fetch the JSON data from the URL
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch blob: ${response.status} ${response.statusText}`);
    }

    // Parse the JSON data
    const data = await response.json();

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Error getting JSON from blob:', error);
    return {
      success: false,
      error: `Failed to get JSON data: ${(error as Error).message}`,
    };
  }
};

// List all JSON blobs with optional prefix
export const listJsonBlobs = async (
  prefix?: string
): Promise<{
  success: boolean;
  blobs?: Array<{ url: string; pathname: string }>;
  error?: string;
}> => {
  try {
    const { blobs } = await list({
      prefix: prefix || '',
      limit: 1000,
    });

    // Filter for only JSON files
    const jsonBlobs = blobs.filter((blob) => blob.pathname.endsWith('.json'));

    return {
      success: true,
      blobs: jsonBlobs.map((blob) => ({
        url: blob.url,
        pathname: blob.pathname,
      })),
    };
  } catch (error) {
    console.error('Error listing JSON blobs:', error);
    return {
      success: false,
      error: `Failed to list JSON blobs: ${(error as Error).message}`,
    };
  }
};

// Delete a JSON blob by URL
export const deleteJsonBlob = async (
  url: string
): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    await del(url);

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error deleting JSON blob:', error);
    return {
      success: false,
      error: `Failed to delete JSON blob: ${(error as Error).message}`,
    };
  }
};

// Update an existing JSON blob (delete and recreate)
export const updateJsonBlob = async <T>(
  url: string,
  newData: T
): Promise<{
  success: boolean;
  url?: string;
  error?: string;
}> => {
  try {
    // Extract the filename from the URL
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const filename = pathname.split('/').pop() || '';
    const nameWithoutTimestamp = filename.split('-').slice(0, -1).join('-').replace('.json', '');

    // Delete the old blob
    await del(url);

    // Create a new blob with the updated data
    return await saveJsonToBlob(newData, nameWithoutTimestamp);
  } catch (error) {
    console.error('Error updating JSON blob:', error);
    return {
      success: false,
      error: `Failed to update JSON blob: ${(error as Error).message}`,
    };
  }
};
