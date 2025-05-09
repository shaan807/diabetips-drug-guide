
import React from 'react';
import { Activity } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-medical-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity size={24} className="text-white animate-pulse-light" />
          <h1 className="text-xl font-bold">DiabetesMed Recommender</h1>
        </div>
        <div className="text-sm">
          ML-powered medication recommendations
        </div>
      </div>
    </header>
  );
};

export default Header;
