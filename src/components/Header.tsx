import React from 'react';
import { TrendingUpIcon, FileLineChart,  } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md rounded-full m-10 backdrop-brightness-125">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 animate-fade-in">
            <div className="relative">
              <TrendingUpIcon className="h-8 w-8 text-blue-400" />
              <FileLineChart className="h-4 w-4 text-blue-400 absolute -top-1" />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                CSV Predict
              </h1>
              <p className="text-xs text-gray-400">Professional Data Prediction</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/auth" className="text-sm text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full border border-gray-700/50 hover:text-gray-200 hover:scale-105 transition-transform duration-300">
              Register
            </Link>
            <Link to="/auth" className="text-sm text-gray-300 bg-green-400/45 px-3 py-1 rounded-full border border-gray-700/50 hover:bg-green-500 hover:scale-105 transition-transform duration-300">
              Login
            </Link>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;