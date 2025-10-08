import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { ImageClickArea } from '../components/ImageClickArea';
import { ClickPoint, REQUIRED_POINTS } from '../types/auth';
import { storageUtils } from '../utils/storage';
import { validateClickPoints } from '../utils/validation';

interface LoginProps {
  onNavigate: (page: 'landing' | 'register' | 'success') => void;
  onLogin: (username: string) => void;
}

const IMAGES = [
  'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1200',
];

export const Login: React.FC<LoginProps> = ({ onNavigate, onLogin }) => {
  const [username, setUsername] = useState('');
  const [clickPoints, setClickPoints] = useState<ClickPoint[]>([]);
  const [currentStep, setCurrentStep] = useState<'username' | 'points'>('username');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const MAX_ATTEMPTS = 3;

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    if (!storageUtils.userExists(username)) {
      setError('Username not found');
      return;
    }

    setCurrentStep('points');
  };

  const handlePointClick = (point: ClickPoint) => {
    if (clickPoints.length < REQUIRED_POINTS) {
      setClickPoints([...clickPoints, point]);
    }
  };

  const handleLogin = () => {
    if (clickPoints.length !== REQUIRED_POINTS) {
      setError(`Please select exactly ${REQUIRED_POINTS} points`);
      return;
    }

    const user = storageUtils.getUser(username);
    if (!user) {
      setError('User not found');
      return;
    }

    const isValid = validateClickPoints(clickPoints, user.clickPoints);

    if (isValid) {
      onLogin(username);
      onNavigate('success');
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= MAX_ATTEMPTS) {
        setError(`Authentication failed. Maximum attempts (${MAX_ATTEMPTS}) reached. Please try again later.`);
        setClickPoints([]);
        setTimeout(() => {
          onNavigate('landing');
        }, 3000);
      } else {
        setError(`Authentication failed. Click points do not match. Attempts remaining: ${MAX_ATTEMPTS - newAttempts}`);
        setClickPoints([]);
      }
    }
  };

  const handleReset = () => {
    setClickPoints([]);
    setError('');
  };

  const handleBack = () => {
    if (currentStep === 'points') {
      setCurrentStep('username');
      setClickPoints([]);
      setError('');
      setAttempts(0);
    } else {
      onNavigate('landing');
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

          {currentStep === 'points' && (
            <div>
              <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 mb-6">
                <h2 className="text-2xl font-semibold mb-4">Enter Your Graphical Password</h2>
                <p className="text-gray-400 mb-2">
                  Click the {REQUIRED_POINTS} points you selected during registration in the correct order.
                </p>
                {attempts > 0 && (
                  <p className="text-yellow-400 text-sm mb-6">
                    Attempts used: {attempts} / {MAX_ATTEMPTS}
                  </p>
                )}

                <ImageClickArea
                  imageUrl={IMAGES[0]}
                  onPointClick={handlePointClick}
                  clickedPoints={clickPoints}
                  maxPoints={REQUIRED_POINTS}
                  showFeedback={false}
                  imageIndex={0}
                />

                {error && (
                  <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg flex items-start">
                    <XCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-red-200">{error}</span>
                  </div>
                )}

                <div className="mt-6 flex gap-4">
                  <button
                    onClick={handleReset}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={clickPoints.length === 0 || attempts >= MAX_ATTEMPTS}
                  >
                    Reset Points
                  </button>
                  <button
                    onClick={handleLogin}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={clickPoints.length !== REQUIRED_POINTS || attempts >= MAX_ATTEMPTS}
                  >
                    Login
                  </button>
                </div>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                <h3 className="font-semibold mb-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 text-blue-400" />
                  Authentication Tips
                </h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Click points in the same order as during registration</li>
                  <li>• Clicks must be within the tolerance radius of original points</li>
                  <li>• Point numbers are hidden for security</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
