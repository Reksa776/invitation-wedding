// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* SVG Icon */}
        <div className="mb-8">
          <svg
            className="mx-auto h-32 w-32 text-purple-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl text-gray-300 mb-4">Halaman Tidak Ditemukan</h2>

        {/* Description */}
        <p className="text-gray-400 mb-6">
          Ups! Halaman yang kamu cari sepertinya tidak ada atau telah dipindahkan.
        </p>

        {/* Button */}
      </div>
    </div>
  );
};

export default NotFound;

