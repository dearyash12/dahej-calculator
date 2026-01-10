
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-amber-100 py-6 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900">
          Dahej Calculator
        </h1>
        <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full"></div>
      </div>
    </header>
  );
};

export default Header;
