import { ImageData } from '../data/images';

export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const validateImageSequence = (
  attemptedSequence: string[],
  storedSequence: string[]
): boolean => {
  if (attemptedSequence.length !== storedSequence.length) {
    return false;
  }

  for (let i = 0; i < attemptedSequence.length; i++) {
    if (attemptedSequence[i] !== storedSequence[i]) {
      return false;
    }
  }

  return true;
};
