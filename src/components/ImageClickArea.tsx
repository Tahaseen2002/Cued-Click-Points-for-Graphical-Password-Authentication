import React, { useRef, useState, useEffect } from 'react';
import { ClickPoint } from '../types/auth';

interface ImageClickAreaProps {
  imageUrl: string;
  onPointClick: (point: ClickPoint) => void;
  clickedPoints: ClickPoint[];
  maxPoints: number;
  showFeedback?: boolean;
  imageIndex: number;
}

export const ImageClickArea: React.FC<ImageClickAreaProps> = ({
  imageUrl,
  onPointClick,
  clickedPoints,
  maxPoints,
  showFeedback = true,
  imageIndex,
}) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (imageRef.current) {
        setImageDimensions({
          width: imageRef.current.offsetWidth,
          height: imageRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (clickedPoints.length >= maxPoints) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    onPointClick({ x, y, imageIndex });
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div
        ref={imageRef}
        className="relative w-full aspect-video bg-cover bg-center rounded-lg shadow-lg cursor-crosshair overflow-hidden"
        style={{ backgroundImage: `url(${imageUrl})` }}
        onClick={handleClick}
      >
        {clickedPoints.map((point, index) => (
          <div
            key={index}
            className="absolute w-10 h-10 -ml-5 -mt-5 pointer-events-none"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
            }}
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-blue-500 rounded-full opacity-30 animate-ping"></div>
              <div className="absolute inset-0 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                {showFeedback && (
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Points selected: {clickedPoints.length} / {maxPoints}
        </p>
      </div>
    </div>
  );
};
