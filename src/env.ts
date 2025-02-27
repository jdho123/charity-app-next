
export const PROTOCOL = process.env.NODE_ENV === 'production' ? 'https' : 'http'
export const HOST = process.env.VERCEL_URL || 'localhost:3001'
export const BASE_URL = `${PROTOCOL}://${HOST}`
export const API_URL = `${BASE_URL}/api`