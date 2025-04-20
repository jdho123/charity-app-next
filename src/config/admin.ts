import { AdminCredentials } from '@/types/authTypes';

export const adminCredentials: AdminCredentials = {
  username: process.env.ADMIN_USERNAME || '',
  password: process.env.ADMIN_PASSWORD || '',
};

export const SESSION_DURATION = 24 * 60 * 60 * 1000;
