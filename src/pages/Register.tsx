import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { ImageClickArea } from '../components/ImageClickArea';
import { ClickPoint, REQUIRED_POINTS } from '../types/auth';
import { storageUtils } from '../utils/storage';

interface RegisterProps {
  onNavigate: (page: 'landing' | 'login' | 'success') => void;
}

const IMAGES = [
  'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1200',
];

export const Register: React.FC<RegisterProps> = ({ onNavigate }) => {
  const [username, setUsername] = useState('');
  const [clickPoints, setClickPoints] = useState<ClickPoint[]>([]);
  const [currentStep, setCurrentStep] = useState<'username' | 'points'>('username');
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

    setCurrentStep('points');
  };

  const handlePointClick = (point: ClickPoint) => {
    if (clickPoints.length < REQUIRED_POINTS) {
      setClickPoints([...clickPoints, point]);
    }
  };

  const handleRegister = () => {
    if (clickPoints.length !== REQUIRED_POINTS) {
      setError(`Please select exactly ${REQUIRED_POINTS} points`);
      return;
    }

    const user = {
      username,
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
  };

  const handleReset = () => {
    setClickPoints([]);
    setError('');
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
          <p className="text-center text-gray-400 mb-8">
            Register with a graphical password
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

          {currentStep === 'points' && (
            <div>
              <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 mb-6">
                <h2 className="text-2xl font-semibold mb-4">Create Your Graphical Password</h2>
                <p className="text-gray-400 mb-6">
                  Click {REQUIRED_POINTS} points on the image below. Remember the sequence and locations - you'll need them to login.
                </p>

                <ImageClickArea
                  imageUrl={IMAGES[0]}
                  onPointClick={handlePointClick}
                  clickedPoints={clickPoints}
                  maxPoints={REQUIRED_POINTS}
                  showFeedback={true}
                  imageIndex={0}
                />

                {error && (
                  <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-red-200">{error}</span>
                  </div>
                )}

                {success && (
                  <div className="mt-4 p-3 bg-green-900/50 border border-green-700 rounded-lg flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-green-200">Registration successful! Redirecting to login...</span>
                  </div>
                )}

                <div className="mt-6 flex gap-4">
                  <button
                    onClick={handleReset}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-colors"
                    disabled={clickPoints.length === 0 || success}
                  >
                    Reset Points
                  </button>
                  <button
                    onClick={handleRegister}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={clickPoints.length !== REQUIRED_POINTS || success}
                  >
                    Register
                  </button>
                </div>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
