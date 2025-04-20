import { NextRequest, NextResponse } from 'next/server';
import { isSessionValid } from './services/authService';
import { Session } from './types/authTypes';

export function middleware(request: NextRequest) {
  // Only run this middleware on admin routes
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Skip the middleware for the login page
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Get the session cookie
  const sessionCookie = request.cookies.get('admin_session');

  try {
    // Parse the session from the cookie
    const session: Session | null = sessionCookie ? JSON.parse(sessionCookie.value) : null;

    // Check if the session is valid
    if (!isSessionValid(session)) {
      // Redirect to login if not authenticated
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  } catch (error) {
    // If there's an error parsing the session, redirect to login
    console.error('Session parsing error:', error);
    const url = new URL('/admin/login', request.url);
    return NextResponse.redirect(url);
  }

  // Continue to the protected route if authenticated
  return NextResponse.next();
}

// Define which routes this middleware applies to
export const config = {
  matcher: ['/admin/:path*'],
};
