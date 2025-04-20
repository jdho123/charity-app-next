import { AdminCredentials, Session } from '@/types/authTypes';
import { adminCredentials, SESSION_DURATION } from '@/config/admin';

// Check if the provided credentials match the admin credentials
export function validateCredentials(credentials: AdminCredentials): boolean {
  return (
    credentials.username === adminCredentials.username &&
    credentials.password === adminCredentials.password
  );
}

// Create a new session
export function createSession(): Session {
  return {
    isAuthenticated: true,
    expiresAt: Date.now() + SESSION_DURATION,
  };
}

// Verify if a session is valid
export function isSessionValid(session: Session | null): boolean {
  if (!session) return false;

  return session.isAuthenticated && session.expiresAt > Date.now();
}
