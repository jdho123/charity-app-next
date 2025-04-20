import { put } from '@vercel/blob';

// Get the Blob token from environment variables
const getBlobToken = () => {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error('BLOB_READ_WRITE_TOKEN environment variable is not set');
  }
  return token;
};

// Generate a unique filename
const generateUniqueFilename = (originalFilename: string): string => {
  const timestamp = Date.now();
  const fileExt = originalFilename.split('.').pop()?.toLowerCase() || 'jpg';
  const baseName = originalFilename
    .split('.')
    .slice(0, -1)
    .join('.')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-'); // Normalize and clean the filename

  return `${baseName}-${timestamp}.${fileExt}`;
};

// Validate file type
const isValidImageType = (mimetype: string): boolean => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  return validTypes.includes(mimetype);
};

// Save a file from a Form request to Vercel Blob Storage
export const saveImageFromFormData = async (
  formData: FormData
): Promise<{ success: boolean; filePath?: string; error?: string }> => {
  try {
    // Get the file from formData
    const file = formData.get('image') as File;

    if (!file) {
      return { success: false, error: 'No file provided' };
    }

    // Check file type
    if (!isValidImageType(file.type)) {
      return {
        success: false,
        error: 'Invalid file type. Only images (JPEG, PNG, GIF, WebP, SVG) are allowed.',
      };
    }

    // Generate filename with proper path
    const filename = generateUniqueFilename(file.name);

    // Upload to Vercel Blob Storage with token
    const blob = await put(filename, file, {
      access: 'public',
      contentType: file.type,
      addRandomSuffix: false,
      token: getBlobToken(),
    });

    // Return the URL to the uploaded blob
    return {
      success: true,
      filePath: blob.url,
    };
  } catch (error) {
    console.error('Error saving image:', error);
    return {
      success: false,
      error: `Failed to save image: ${(error as Error).message}`,
    };
  }
};
