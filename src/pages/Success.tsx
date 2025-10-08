import React from 'react';
import { CheckCircle, LogOut, Home } from 'lucide-react';

interface SuccessProps {
  username: string;
  onNavigate: (page: 'landing') => void;
  onLogout: () => void;
}

export const Success: React.FC<SuccessProps> = ({ username, onNavigate, onLogout }) => {
  const handleLogout = () => {
    onLogout();
    onNavigate('landing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-ping"></div>
              <CheckCircle className="w-24 h-24 text-green-400 relative" />
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Authentication Successful!
          </h1>

          <p className="text-2xl text-gray-300 mb-8">
            Welcome back, <span className="font-semibold text-white">{username}</span>
          </p>

          <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 mb-8">
            <h2 className="text-xl font-semibold mb-4">Access Granted</h2>
            <p className="text-gray-400 mb-6">
              You have successfully authenticated using your graphical password. Your session is now active and secure.
            </p>

            <div className="grid gap-4 text-left">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-green-400">Secure Login</h3>
                <p className="text-sm text-gray-400">
                  Your graphical password provides enhanced security against keyloggers and shoulder surfing attacks.
                </p>
              </div>

              <div className="bg-slate-700/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-400">Visual Authentication</h3>
                <p className="text-sm text-gray-400">
                  By using spatial memory and visual cues, graphical passwords are easier to remember than complex text passwords.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-slate-600"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
            <button
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg hover:shadow-blue-500/50"
            >
              <Home className="w-5 h-5" />
              Home
            </button>
          </div>

          <div className="mt-12 text-sm text-gray-500">
            <p>Logged in at {new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
