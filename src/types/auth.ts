export type AuthMethod = 'cued-click-points' | 'image-sequence';

export interface ClickPoint {
  x: number;
  y: number;
  imageIndex: number;
}

export interface ImageSequence {
  imageId: string;
  order: number;
}

export interface User {
  username: string;
  authMethod: AuthMethod;
  clickPoints?: ClickPoint[];
  imageSequence?: ImageSequence[];
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: string | null;
}

export const TOLERANCE_RADIUS = 5;
export const REQUIRED_POINTS = 5;
export const REQUIRED_IMAGES = 4;
export const IMAGE_GRID_SIZE = 12;
