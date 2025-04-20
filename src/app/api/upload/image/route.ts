import { NextRequest, NextResponse } from 'next/server';
import { saveImageFromFormData } from '@/services/imageUploadService';

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData();

    // Process image upload
    const result = await saveImageFromFormData(formData);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // Return success response with file path
    return NextResponse.json({
      success: true,
      imagePath: result.filePath,
    });
  } catch (error) {
    console.error('Error in image upload API:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}

// For handling CORS preflight requests
export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
