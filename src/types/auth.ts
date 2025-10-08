export interface ClickPoint {
  x: number;
  y: number;
  imageIndex: number;
}

export interface User {
  username: string;
  clickPoints: ClickPoint[];
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: string | null;
}

export const TOLERANCE_RADIUS = 5;
export const REQUIRED_POINTS = 5;
