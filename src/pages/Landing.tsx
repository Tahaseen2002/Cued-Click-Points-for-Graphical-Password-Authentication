import React from 'react';
import { Lock, MousePointerClick, Shield } from 'lucide-react';

interface LandingProps {
  onNavigate: (page: 'register' | 'login') => void;
}

export const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
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
              Based on Cued Click Points methodology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors">
              <MousePointerClick className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Click-Based Security</h3>
              <p className="text-gray-400">
                Create passwords by clicking specific points on images instead of typing characters.
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
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <ol className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</span>
                <span><strong>Registration:</strong> Click 5 specific points on a series of images to create your graphical password.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</span>
                <span><strong>Authentication:</strong> Reproduce the same click sequence on the same images.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</span>
                <span><strong>Tolerance:</strong> Clicks within a small radius of the original points are accepted.</span>
              </li>
            </ol>
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
