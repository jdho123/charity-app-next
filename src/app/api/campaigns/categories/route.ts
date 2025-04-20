import { corsHeaders } from '@/utils/cors';
import { NextRequest, NextResponse } from 'next/server';
import { getCategories, saveCategory, deleteCategory } from '@/services/campaignService';
import { CategoryItem } from '@/types/campaignTypes';

// Get all categories
export async function GET() {
  try {
    const categories = await getCategories();
    const response = NextResponse.json(categories);
    return corsHeaders(response);
  } catch (error) {
    console.error('Error in GET categories:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
    return corsHeaders(errorResponse);
  }
}

// Create or update a category
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.name || !data.color) {
      const errorResponse = NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
      return corsHeaders(errorResponse);
    }

    const category: CategoryItem = {
      name: data.name,
      color: data.color,
    };

    const success = await saveCategory(category);

    if (!success) {
      const errorResponse = NextResponse.json(
        { error: 'Failed to save category' },
        { status: 500 }
      );
      return corsHeaders(errorResponse);
    }

    const response = NextResponse.json({ message: 'Category saved successfully' }, { status: 201 });
    return corsHeaders(response);
  } catch (error) {
    console.error('Error in POST category:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
    return corsHeaders(errorResponse);
  }
}

// Delete a category
export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');

    if (!name) {
      const errorResponse = NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
      return corsHeaders(errorResponse);
    }

    const success = await deleteCategory(name);

    if (!success) {
      const errorResponse = NextResponse.json(
        { error: 'Category not found or deletion failed' },
        { status: 404 }
      );
      return corsHeaders(errorResponse);
    }

    const response = NextResponse.json({ message: 'Category deleted successfully' });
    return corsHeaders(response);
  } catch (error) {
    console.error('Error in DELETE category:', error);
    const errorResponse = NextResponse.json(
      { error: 'Failed to delete category' },
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
