
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-amber-100 py-8 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-900 mb-2">
          Dahej Calculator
        </h1>
      </div>
    </header>
  );
};

export default Header;
