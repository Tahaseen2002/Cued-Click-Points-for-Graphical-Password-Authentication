import React, { useState } from 'react';
import { ImageClickArea } from './ImageClickArea';
import { ClickPoint, REQUIRED_POINTS } from '../types/auth';
import { BACKGROUND_IMAGE } from '../data/images';
import { AlertCircle } from 'lucide-react';

interface CuedClickPointsProps {
  mode: 'register' | 'login';
  onComplete: (clickPoints: ClickPoint[]) => void;
  showFeedback?: boolean;
}

export const CuedClickPoints: React.FC<CuedClickPointsProps> = ({
  mode,
  onComplete,
  showFeedback = true,
}) => {
  const [clickPoints, setClickPoints] = useState<ClickPoint[]>([]);

  const handlePointClick = (point: ClickPoint) => {
    if (clickPoints.length < REQUIRED_POINTS) {
      const newPoints = [...clickPoints, point];
      setClickPoints(newPoints);

      if (newPoints.length === REQUIRED_POINTS) {
        onComplete(newPoints);
      }
    }
  };

  const handleReset = () => {
    setClickPoints([]);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          {mode === 'register' ? 'Create Your Graphical Password' : 'Enter Your Graphical Password'}
        </h2>
        <p className="text-gray-400 mb-2">
          {mode === 'register'
            ? `Click ${REQUIRED_POINTS} points on the image below. Remember the sequence and locations.`
            : `Click the ${REQUIRED_POINTS} points you selected during registration in the correct order.`}
        </p>
      </div>

      <ImageClickArea
        imageUrl={BACKGROUND_IMAGE}
        onPointClick={handlePointClick}
        clickedPoints={clickPoints}
        maxPoints={REQUIRED_POINTS}
        showFeedback={showFeedback}
        imageIndex={0}
      />

      {mode === 'register' && (
        <>
          <div className="mt-6">
            <button
              onClick={handleReset}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-colors"
              disabled={clickPoints.length === 0}
            >
              Reset Points
            </button>
          </div>

          <div className="mt-6 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <h3 className="font-semibold mb-2 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 text-yellow-400" />
              Important Tips
            </h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Remember the order and approximate locations of your clicks</li>
              <li>• Choose distinctive features or landmarks in the image</li>
              <li>• You'll need to click within a small radius of each original point</li>
            </ul>
          </div>
        </>
      )}

      {mode === 'login' && (
        <div className="mt-6">
          <button
            onClick={handleReset}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-colors"
            disabled={clickPoints.length === 0}
          >
            Reset Points
          </button>
        </div>
      )}
    </div>
  );
};
