import React from 'react';
import { Heart, Zap } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 py-8 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-gray-400">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-400 animate-pulse" />
            <span>by our amazing team</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-400">
            <span>Powered by</span>
            <Zap className="h-4 w-4 text-yellow-400" />
            <span className="font-semibold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Vite
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;