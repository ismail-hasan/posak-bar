import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
      return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
                  <div className="text-center">
                        <h1 className="text-7xl font-extrabold text-purple-900 tracking-wider">404</h1>
                        <h2 className="text-2xl font-bold text-gray-800 mt-4">Page Not Found</h2>
                        <p className="text-gray-500 text-sm mt-2 max-w-sm mx-auto">
                              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                        </p>

                        <Link
                              to="/"
                              className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-lg shadow-md hover:from-purple-600 hover:to-purple-700 transition"
                        >
                              Back To Home
                        </Link>
                  </div>
            </div>
      );
};

export default NotFound;