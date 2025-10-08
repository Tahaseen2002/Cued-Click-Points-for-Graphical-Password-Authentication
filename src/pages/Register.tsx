import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { CuedClickPoints } from '../components/CuedClickPoints';
import { ImageSequenceAuth } from '../components/ImageSequenceAuth';
import { ClickPoint, REQUIRED_POINTS, REQUIRED_IMAGES } from '../types/auth';
import { storageUtils } from '../utils/storage';
import { useAuth } from '../context/AuthContext';

interface RegisterProps {
  onNavigate: (page: 'landing' | 'login' | 'success') => void;
}

export const Register: React.FC<RegisterProps> = ({ onNavigate }) => {
  const { authMethod } = useAuth();
  const [username, setUsername] = useState('');
  const [clickPoints, setClickPoints] = useState<ClickPoint[]>([]);
  const [imageSequence, setImageSequence] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<'username' | 'auth'>('username');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    if (storageUtils.userExists(username)) {
      setError('Username already exists');
      return;
    }

    setCurrentStep('auth');
  };

  const handleClickPointsComplete = (points: ClickPoint[]) => {
    setClickPoints(points);
  };

  const handleImageSequenceComplete = (imageIds: string[]) => {
    setImageSequence(imageIds);
  };

  const handleRegister = () => {
    if (authMethod === 'cued-click-points') {
      if (clickPoints.length !== REQUIRED_POINTS) {
        setError(`Please select exactly ${REQUIRED_POINTS} points`);
        return;
      }

      const user = {
        username,
        authMethod,
        clickPoints,
        createdAt: new Date().toISOString(),
      };

      const saved = storageUtils.saveUser(user);

      if (saved) {
        setSuccess(true);
        setTimeout(() => {
          onNavigate('login');
        }, 2000);
      } else {
        setError('Failed to register. Please try again.');
      }
    } else {
      if (imageSequence.length !== REQUIRED_IMAGES) {
        setError(`Please select exactly ${REQUIRED_IMAGES} images`);
        return;
      }

      const user = {
        username,
        authMethod,
        imageSequence: imageSequence.map((id, index) => ({
          imageId: id,
          order: index,
        })),
        createdAt: new Date().toISOString(),
      };

      const saved = storageUtils.saveUser(user);

      if (saved) {
        setSuccess(true);
        setTimeout(() => {
          onNavigate('login');
        }, 2000);
      } else {
        setError('Failed to register. Please try again.');
      }
    }
  };

  const isReadyToRegister = () => {
    if (authMethod === 'cued-click-points') {
      return clickPoints.length === REQUIRED_POINTS;
    } else {
      return imageSequence.length === REQUIRED_IMAGES;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-2">Create Account</h1>
          <p className="text-center text-gray-400 mb-2">
            Register with{' '}
            {authMethod === 'cued-click-points' ? 'Cued Click Points' : 'Image Sequence'}
          </p>
          <p className="text-center text-sm text-gray-500 mb-8">
            Authentication Method: {authMethod === 'cued-click-points' ? 'Click Points' : 'Image Sequence'}
          </p>

          {currentStep === 'username' && (
            <div className="max-w-md mx-auto bg-slate-800 p-8 rounded-lg border border-slate-700">
              <form onSubmit={handleUsernameSubmit}>
                <div className="mb-6">
                  <label htmlFor="username" className="block text-sm font-medium mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="Choose a username"
                    autoFocus
                  />
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-red-200">{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Continue
                </button>
              </form>
            </div>
          )}

          {currentStep === 'auth' && (
            <div>
              <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 mb-6">
                {authMethod === 'cued-click-points' ? (
                  <CuedClickPoints
                    mode="register"
                    onComplete={handleClickPointsComplete}
                    showFeedback={true}
                  />
                ) : (
                  <ImageSequenceAuth
                    mode="register"
                    onComplete={handleImageSequenceComplete}
                  />
                )}

                {error && (
                  <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-red-200">{error}</span>
                  </div>
                )}

                {success && (
                  <div className="mt-4 p-3 bg-green-900/50 border border-green-700 rounded-lg flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-green-200">
                      Registration successful! Redirecting to login...
                    </span>
                  </div>
                )}

                <div className="mt-6">
                  <button
                    onClick={handleRegister}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isReadyToRegister() || success}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
