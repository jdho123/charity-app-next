export const PROTOCOL = process.env.NODE_ENV === 'production' ? 'https' : 'http';
export const HOST =
  process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL || 'localhost:3000';
export const BASE_URL = `${PROTOCOL}://${HOST}`;
export const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || `${BASE_URL}/api`;

export const RESEND_API_KEY = 're_SHR4YJ22_NzUNZi4ZeiAXYsAUuHtN8TGr';
export const EMAIL_TO = 'memebrowning11@gmail.com';
