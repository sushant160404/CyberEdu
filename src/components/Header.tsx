import React from 'react';
import { Shield } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">CyberEdu</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Simulations</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">Resources</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;