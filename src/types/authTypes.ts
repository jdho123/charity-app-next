export interface AdminCredentials {
  username: string;
  password: string;
}

export interface Session {
  isAuthenticated: boolean;
  expiresAt: number; // Timestamp in milliseconds
}
