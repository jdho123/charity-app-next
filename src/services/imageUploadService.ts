import fs from 'fs';
import path from 'path';
import { NextRequest } from 'next/server';

// Base path for images
const PUBLIC_IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

// Ensure the images directory exists
const ensureImagesDirectory = () => {
  if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
    fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });
  }
};

// Generate a unique filename
const generateUniqueFilename = (originalFilename: string): string => {
  const timestamp = Date.now();
  const fileExt = path.extname(originalFilename).toLowerCase();
  const baseName = path
    .basename(originalFilename, fileExt)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-'); // Normalize and clean the filename

  return `${baseName}-${timestamp}${fileExt}`;
};

// Validate file type
const isValidImageType = (mimetype: string): boolean => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  return validTypes.includes(mimetype);
};

// Save a file from a Form request
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

    // Make sure the directory exists
    ensureImagesDirectory();

    // Create unique filename
    const filename = generateUniqueFilename(file.name);
    const filePath = path.join(PUBLIC_IMAGES_DIR, filename);

    // Get file buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Write file to disk
    fs.writeFileSync(filePath, buffer);

    // Return the path relative to /public
    return {
      success: true,
      filePath: `/images/${filename}`,
    };
  } catch (error) {
    console.error('Error saving image:', error);
    return {
      success: false,
      error: `Failed to save image: ${(error as Error).message}`,
    };
  }
};

// Delete an image
export const deleteImage = (imagePath: string): { success: boolean; error?: string } => {
  try {
    // Make sure the path is within our images directory and doesn't contain ../ etc.
    if (!imagePath.startsWith('/images/')) {
      return { success: false, error: 'Invalid image path' };
    }

    const filename = path.basename(imagePath);
    const filePath = path.join(PUBLIC_IMAGES_DIR, filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return { success: false, error: 'Image not found' };
    }

    // Delete the file
    fs.unlinkSync(filePath);

    return { success: true };
  } catch (error) {
    console.error('Error deleting image:', error);
    return {
      success: false,
      error: `Failed to delete image: ${(error as Error).message}`,
    };
  }
};
