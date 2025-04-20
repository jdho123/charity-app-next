// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateCredentials, createSession } from '@/services/authService';
import { AdminCredentials } from '@/types/authTypes';

export async function POST(request: NextRequest) {
  try {
    const credentials: AdminCredentials = await request.json();

    // Validate credentials
    if (!validateCredentials(credentials)) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // Create a new session
    const session = createSession();

    // Store session in a cookie
    (
      await // Store session in a cookie
      cookies()
    ).set({
      name: 'admin_session',
      value: JSON.stringify(session),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours in seconds
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'An error occurred during login' }, { status: 500 });
  }
}
