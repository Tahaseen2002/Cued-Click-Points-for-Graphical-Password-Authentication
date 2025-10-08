import React, { useState } from 'react';
import { ArrowLeft, AlertCircle, XCircle } from 'lucide-react';
import { CuedClickPoints } from '../components/CuedClickPoints';
import { ImageSequenceAuth } from '../components/ImageSequenceAuth';
import { ClickPoint, REQUIRED_POINTS, REQUIRED_IMAGES } from '../types/auth';
import { storageUtils } from '../utils/storage';
import { validateClickPoints } from '../utils/validation';
import { validateImageSequence } from '../utils/imageUtils';
import { useAuth } from '../context/AuthContext';

interface LoginProps {
  onNavigate: (page: 'landing' | 'register' | 'success') => void;
  onLogin: (username: string, authMethod: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onNavigate, onLogin }) => {
  const { setAuthMethod } = useAuth();
  const [username, setUsername] = useState('');
  const [clickPoints, setClickPoints] = useState<ClickPoint[]>([]);
  const [imageSequence, setImageSequence] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<'username' | 'auth'>('username');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [userAuthMethod, setUserAuthMethod] = useState<'cued-click-points' | 'image-sequence'>('cued-click-points');
  const MAX_ATTEMPTS = 3;

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    const user = storageUtils.getUser(username);
    if (!user) {
      setError('Username not found');
      return;
    }

    setUserAuthMethod(user.authMethod);
    setAuthMethod(user.authMethod);
    setCurrentStep('auth');
  };

  const handleClickPointsComplete = (points: ClickPoint[]) => {
    setClickPoints(points);
  };

  const handleImageSequenceComplete = (imageIds: string[]) => {
    setImageSequence(imageIds);
  };

  const handleLogin = () => {
    const user = storageUtils.getUser(username);
    if (!user) {
      setError('User not found');
      return;
    }

    let isValid = false;

    if (userAuthMethod === 'cued-click-points') {
      if (clickPoints.length !== REQUIRED_POINTS) {
        setError(`Please select exactly ${REQUIRED_POINTS} points`);
        return;
      }

      if (!user.clickPoints) {
        setError('Invalid user data');
        return;
      }

      isValid = validateClickPoints(clickPoints, user.clickPoints);
    } else {
      if (imageSequence.length !== REQUIRED_IMAGES) {
        setError(`Please select exactly ${REQUIRED_IMAGES} images`);
        return;
      }

      if (!user.imageSequence) {
        setError('Invalid user data');
        return;
      }

      const storedSequence = user.imageSequence
        .sort((a, b) => a.order - b.order)
        .map((item) => item.imageId);

      isValid = validateImageSequence(imageSequence, storedSequence);
    }

    if (isValid) {
      onLogin(username, userAuthMethod);
      onNavigate('success');
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= MAX_ATTEMPTS) {
        setError(
          `Authentication failed. Maximum attempts (${MAX_ATTEMPTS}) reached. Please try again later.`
        );
        setClickPoints([]);
        setImageSequence([]);
        setTimeout(() => {
          onNavigate('landing');
        }, 3000);
      } else {
        const methodName =
          userAuthMethod === 'cued-click-points' ? 'Click points' : 'Image sequence';
        setError(
          `Authentication failed. ${methodName} does not match. Attempts remaining: ${
            MAX_ATTEMPTS - newAttempts
          }`
        );
        setClickPoints([]);
        setImageSequence([]);
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 'auth') {
      setCurrentStep('username');
      setClickPoints([]);
      setImageSequence([]);
      setError('');
      setAttempts(0);
    } else {
      onNavigate('landing');
    }
  };

  const isReadyToLogin = () => {
    if (userAuthMethod === 'cued-click-points') {
      return clickPoints.length === REQUIRED_POINTS;
    } else {
      return imageSequence.length === REQUIRED_IMAGES;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
          disabled={attempts >= MAX_ATTEMPTS}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-2">Login</h1>
          <p className="text-center text-gray-400 mb-8">
            Authenticate with your graphical password
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
                    placeholder="Enter your username"
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

                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={() => onNavigate('register')}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Don't have an account? Register
                  </button>
                </div>
              </form>
            </div>
          )}

          {currentStep === 'auth' && (
            <div>
              <p className="text-center text-sm text-gray-400 mb-6">
                Authentication Method:{' '}
                {userAuthMethod === 'cued-click-points' ? 'Cued Click Points' : 'Image Sequence'}
              </p>
              {attempts > 0 && (
                <p className="text-yellow-400 text-sm mb-6 text-center">
                  Attempts used: {attempts} / {MAX_ATTEMPTS}
                </p>
              )}

              <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 mb-6">
                {userAuthMethod === 'cued-click-points' ? (
                  <CuedClickPoints
                    mode="login"
                    onComplete={handleClickPointsComplete}
                    showFeedback={false}
                  />
                ) : (
                  <ImageSequenceAuth
                    mode="login"
                    onComplete={handleImageSequenceComplete}
                  />
                )}

                {error && (
                  <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg flex items-start">
                    <XCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-red-200">{error}</span>
                  </div>
                )}

                <div className="mt-6">
                  <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isReadyToLogin() || attempts >= MAX_ATTEMPTS}
                  >
                    Login
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
