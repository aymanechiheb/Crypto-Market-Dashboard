/* eslint-disable no-unused-vars */
import React from 'react';

const DashboardHeader = () => {
  return (
    <div className="mb-12 text-center">
      {/* Title */}
      <h1 className="text-6xl font-extrabold bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent tracking-tight">
         Crypto Market Dashboard
      </h1>
      
      {/* Subline */}
      <p className="mt-4 text-2xl text-gray-600">
        Track real-time crypto prices and trends effortlessly.
      </p>
      
      {/* Divider */}
      <div className="mt-6 flex justify-center">
        <div className="h-1 w-36 bg-gradient-to-r from-green-400 via-blue-500 to-indigo-600 rounded-full shadow-md"></div>
      </div>
    </div>
  );
};

export default DashboardHeader;
