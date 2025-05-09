
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© {new Date().getFullYear()} DiabetesMed Recommender</p>
            <p className="text-xs mt-1">A machine learning powered medication recommendation system</p>
          </div>
          
          <div className="text-xs">
            <p>Disclaimer: This tool is for educational purposes only.</p>
            <p>Always consult with healthcare professionals for medical decisions.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
