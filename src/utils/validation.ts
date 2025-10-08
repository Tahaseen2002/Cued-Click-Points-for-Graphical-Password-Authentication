import { ClickPoint, TOLERANCE_RADIUS } from '../types/auth';

export const validateClickPoints = (
  attemptedPoints: ClickPoint[],
  storedPoints: ClickPoint[]
): boolean => {
  if (attemptedPoints.length !== storedPoints.length) {
    return false;
  }

  for (let i = 0; i < attemptedPoints.length; i++) {
    const attempted = attemptedPoints[i];
    const stored = storedPoints[i];

    if (attempted.imageIndex !== stored.imageIndex) {
      return false;
    }

    const distance = Math.sqrt(
      Math.pow(attempted.x - stored.x, 2) + Math.pow(attempted.y - stored.y, 2)
    );

    if (distance > TOLERANCE_RADIUS) {
      return false;
    }
  }

  return true;
};
