export const PROTOCOL = process.env.NODE_ENV === 'production' ? 'https' : 'http';
export const HOST =
  process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL || 'localhost:3000';
export const BASE_URL = `${PROTOCOL}://${HOST}`;
export const API_URL = `${BASE_URL}/api`;
