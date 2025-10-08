import React, { useState } from 'react';
import { Lock, MousePointerClick, Shield, Grid3x3, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AuthMethod } from '../types/auth';

interface LandingProps {
  onNavigate: (page: 'register' | 'login') => void;
}

export const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  const { authMethod, setAuthMethod } = useAuth();
  const [showMethodSelector, setShowMethodSelector] = useState(false);

  const handleMethodSelect = (method: AuthMethod) => {
    setAuthMethod(method);
    setShowMethodSelector(false);
  };

  const getMethodDisplay = () => {
    return authMethod === 'cued-click-points' ? 'Cued Click Points' : 'Image Sequence';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-16 h-16 text-blue-400" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Graphical Password Authentication
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              Secure Authentication Through Visual Memory
            </p>
            <p className="text-sm text-gray-400">
              Choose your preferred authentication method
            </p>
          </div>

          <div className="mb-12">
            <label className="block text-sm font-medium mb-3 text-center text-gray-300">
              Authentication Method
            </label>
            <div className="relative max-w-md mx-auto">
              <button
                onClick={() => setShowMethodSelector(!showMethodSelector)}
                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-blue-500 transition-colors"
              >
                <span className="flex items-center gap-3">
                  {authMethod === 'cued-click-points' ? (
                    <MousePointerClick className="w-5 h-5 text-blue-400" />
                  ) : (
                    <Grid3x3 className="w-5 h-5 text-blue-400" />
                  )}
                  <span className="font-medium">{getMethodDisplay()}</span>
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showMethodSelector ? 'rotate-180' : ''}`} />
              </button>

              {showMethodSelector && (
                <div className="absolute w-full mt-2 bg-slate-800 border border-slate-600 rounded-lg overflow-hidden shadow-xl z-10">
                  <button
                    onClick={() => handleMethodSelect('cued-click-points')}
                    className={`w-full px-4 py-3 text-left hover:bg-slate-700 transition-colors flex items-center gap-3 ${
                      authMethod === 'cued-click-points' ? 'bg-slate-700' : ''
                    }`}
                  >
                    <MousePointerClick className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="font-medium">Cued Click Points</div>
                      <div className="text-xs text-gray-400">Click specific points on an image</div>
                    </div>
                  </button>
                  <button
                    onClick={() => handleMethodSelect('image-sequence')}
                    className={`w-full px-4 py-3 text-left hover:bg-slate-700 transition-colors flex items-center gap-3 ${
                      authMethod === 'image-sequence' ? 'bg-slate-700' : ''
                    }`}
                  >
                    <Grid3x3 className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="font-medium">Image Sequence</div>
                      <div className="text-xs text-gray-400">Select images in a specific order</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors">
              <MousePointerClick className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visual Security</h3>
              <p className="text-gray-400">
                Create passwords using visual elements instead of typing characters.
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors">
              <Lock className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Enhanced Memory</h3>
              <p className="text-gray-400">
                Visual cues make it easier to remember complex passwords using spatial memory.
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors">
              <Shield className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Shoulder Surfing Resistant</h3>
              <p className="text-gray-400">
                Difficult for observers to capture your password by watching you login.
              </p>
            </div>
          </div>

          <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 mb-12">
            <h2 className="text-2xl font-bold mb-4">
              {authMethod === 'cued-click-points' ? 'Cued Click Points' : 'Image Sequence Password'}
            </h2>
            {authMethod === 'cued-click-points' ? (
              <ol className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</span>
                  <span><strong>Registration:</strong> Click 5 specific points on an image to create your graphical password.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</span>
                  <span><strong>Authentication:</strong> Reproduce the same click sequence on the same image.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</span>
                  <span><strong>Tolerance:</strong> Clicks within a small radius of the original points are accepted.</span>
                </li>
              </ol>
            ) : (
              <ol className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</span>
                  <span><strong>Registration:</strong> Select 4 images from a grid in a specific order.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</span>
                  <span><strong>Authentication:</strong> Select the same images in the same sequence.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</span>
                  <span><strong>Randomization:</strong> Image positions are shuffled during login for enhanced security.</span>
                </li>
              </ol>
            )}
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => onNavigate('register')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg hover:shadow-blue-500/50"
            >
              Create Account
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors border border-slate-600"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
