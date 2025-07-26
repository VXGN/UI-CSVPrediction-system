import React, { useState, useEffect } from 'react';
import { 
  TrendingUpIcon, 
  FileLineChart, 
  MenuIcon, 
  XIcon, 
  BellIcon, 
  UserCircleIcon,
  LayoutDashboardIcon,
  LogOutIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  // State simulasi login
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Ganti ke `true` untuk melihat tampilan setelah login
  const userName = "John Doe"; // Contoh nama pengguna

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen || isUserMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isUserMenuOpen]);

  return (
    <>
      <header className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
        ${isScrolled 
          ? 'backdrop-blur-xl bg-gray-900/80 rounded-md m-2 border-none shadow-xl' 
          : 'backdrop-blur-lg bg-gray-900/50 rounded-full m-4 border border-gray-700/50 shadow-lg'}
        animate-fade-down
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo and Brand Name */}
            <Link to="/" className="flex items-center space-x-3 transition-transform duration-300 hover:scale-105 active:scale-95">
              <div className="relative">
                <TrendingUpIcon className="h-8 w-8 text-blue-400" />
                <FileLineChart className="h-4 w-4 text-blue-400 absolute -top-1 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
                  CSV Predict
                </h1>
                <p className="hidden sm:block text-xs text-gray-400 font-medium tracking-wide">Professional Data Prediction</p>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <div className="relative">
                    <button 
                      className="relative p-2 rounded-full text-gray-400 hover:text-white transition-colors duration-200"
                      aria-label="Notifications"
                    >
                      <BellIcon className="h-6 w-6" />
                      {/* Titik notifikasi */}
                      <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                    </button>
                  </div>
                  <div className="relative">
                    <button 
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-2 p-2 rounded-full text-gray-400 hover:text-white transition-colors duration-200"
                      aria-label="User menu"
                    >
                      <UserCircleIcon className="h-8 w-8" />
                      <span className="text-sm font-semibold hidden lg:block">Hi, {userName}</span>
                    </button>
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-2 border border-gray-700/50 animate-fade-in-up">
                        <Link to="/dashboard" onClick={() => setIsUserMenuOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-200">
                          <LayoutDashboardIcon className="h-4 w-4 mr-2" /> Dashboard
                        </Link>
                        <Link to="/profile" onClick={() => setIsUserMenuOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors duration-200">
                           <UserCircleIcon className="h-4 w-4 mr-2" /> Profile
                        </Link>
                        <hr className="my-2 border-gray-700" />
                        <button onClick={() => { setIsUserMenuOpen(false); setIsLoggedIn(false); }} className="flex items-center px-4 py-2 text-sm text-red-400 w-full text-left hover:bg-gray-700 transition-colors duration-200">
                          <LogOutIcon className="h-4 w-4 mr-2" /> Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    to="/auth" 
                    className="px-4 py-2 text-sm font-semibold text-gray-300 bg-gray-800/50 rounded-full border border-gray-700/50 transition-all duration-300 hover:bg-gray-700/50 hover:text-white hover:shadow-md active:scale-95"
                  >
                    Register
                  </Link>
                  <Link 
                    to="/auth" 
                    className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-full border border-transparent transition-all duration-300 hover:from-green-500 hover:to-blue-600 hover:scale-105 hover:shadow-lg active:scale-95"
                  >
                    Login
                  </Link>
                  <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-ping-slow"></div>
                </>
              )}
            </div>

            {/* Tombol Menu Mobile */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
                aria-label="Toggle mobile menu"
              >
                {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Mobile yang Muncul saat isMenuOpen true */}
      <div className={`
        md:hidden fixed inset-0 z-40 bg-gray-900/90 backdrop-blur-md
        transform transition-transform duration-300 ease-in-out
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-bold text-gray-300">Menu</h2>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-label="Close mobile menu"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col items-center space-y-8 mt-16 border-t border-gray-700/50 pt-8">
            {isLoggedIn ? (
                <>
                    <Link 
                        to="/dashboard" 
                        onClick={() => setIsMenuOpen(false)} 
                        className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-200"
                    >
                        Dashboard
                    </Link>
                    <Link 
                        to="/profile" 
                        onClick={() => setIsMenuOpen(false)} 
                        className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-200"
                    >
                        Profile
                    </Link>
                    <button 
                        onClick={() => { setIsMenuOpen(false); setIsLoggedIn(false); }} 
                        className="text-2xl font-bold text-red-400 hover:text-red-300 transition-colors duration-200"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <Link 
                        to="/auth" 
                        onClick={() => setIsMenuOpen(false)} 
                        className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-200"
                    >
                        Register
                    </Link>
                    <Link 
                        to="/auth" 
                        onClick={() => setIsMenuOpen(false)} 
                        className="text-2xl font-bold text-white hover:text-green-400 transition-colors duration-200"
                    >
                        Login
                    </Link>
                </>
            )}
        </nav>
      </div>
    </>
  );
};

export default Header;