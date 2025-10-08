import React, { useState, useEffect } from 'react';
import { IMAGE_POOL } from '../data/images';
import { REQUIRED_IMAGES } from '../types/auth';
import { shuffleArray } from '../utils/imageUtils';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface ImageSequenceAuthProps {
  mode: 'register' | 'login';
  onComplete: (imageIds: string[]) => void;
  registeredSequence?: string[];
}

export const ImageSequenceAuth: React.FC<ImageSequenceAuthProps> = ({
  mode,
  onComplete,
  registeredSequence,
}) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [shuffledImages, setShuffledImages] = useState(IMAGE_POOL);

  useEffect(() => {
    if (mode === 'login') {
      setShuffledImages(shuffleArray(IMAGE_POOL));
    }
  }, [mode]);

  const handleImageClick = (imageId: string) => {
    if (selectedImages.length >= REQUIRED_IMAGES) return;

    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      const newSelection = [...selectedImages, imageId];
      setSelectedImages(newSelection);

      if (newSelection.length === REQUIRED_IMAGES) {
        onComplete(newSelection);
      }
    }
  };

  const handleReset = () => {
    setSelectedImages([]);
  };

  const getImageOrder = (imageId: string): number | null => {
    const index = selectedImages.indexOf(imageId);
    return index !== -1 ? index + 1 : null;
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          {mode === 'register'
            ? 'Create Your Image Sequence Password'
            : 'Enter Your Image Sequence Password'}
        </h2>
        <p className="text-gray-400 mb-2">
          {mode === 'register'
            ? `Select ${REQUIRED_IMAGES} images in a specific order. Remember both the images and the sequence.`
            : `Select the same ${REQUIRED_IMAGES} images in the same order as during registration.`}
        </p>
        {mode === 'login' && (
          <p className="text-yellow-400 text-sm">
            Note: The images are displayed in a randomized order for security.
          </p>
        )}
      </div>

      <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mb-6">
        <div className="mb-4 text-center">
          <p className="text-sm text-gray-400">
            Images selected: {selectedImages.length} / {REQUIRED_IMAGES}
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {shuffledImages.map((image) => {
            const order = getImageOrder(image.id);
            const isSelected = order !== null;

            return (
              <button
                key={image.id}
                onClick={() => handleImageClick(image.id)}
                className={`relative aspect-square rounded-lg overflow-hidden transition-all transform hover:scale-105 ${
                  isSelected
                    ? 'ring-4 ring-blue-500 shadow-lg shadow-blue-500/50'
                    : 'ring-2 ring-slate-600 hover:ring-slate-500'
                }`}
                disabled={selectedImages.length >= REQUIRED_IMAGES && !isSelected}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className={`w-full h-full object-cover ${
                    selectedImages.length >= REQUIRED_IMAGES && !isSelected
                      ? 'opacity-30'
                      : isSelected
                      ? 'opacity-100'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                />
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center bg-blue-500/30">
                    <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-lg">
                      {order}
                    </div>
                  </div>
                )}
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="w-6 h-6 text-white drop-shadow-lg" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <button
          onClick={handleReset}
          className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-colors"
          disabled={selectedImages.length === 0}
        >
          Reset Selection
        </button>
      </div>

      {mode === 'register' && (
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <h3 className="font-semibold mb-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2 text-yellow-400" />
            Important Tips
          </h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Remember both the images and the order you select them</li>
            <li>• Choose memorable images that stand out to you</li>
            <li>• During login, images will be shown in random positions</li>
          </ul>
        </div>
      )}

      {mode === 'login' && (
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <h3 className="font-semibold mb-2 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2 text-blue-400" />
            Authentication Tips
          </h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Select images in the same order as registration</li>
            <li>• The grid layout is randomized for security</li>
            <li>• Numbers indicate your selection sequence</li>
          </ul>
        </div>
      )}
    </div>
  );
};
