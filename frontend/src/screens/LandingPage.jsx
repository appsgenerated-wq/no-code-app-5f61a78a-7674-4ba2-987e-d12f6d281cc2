import React from 'react';

const LandingPage = ({ onLogin }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        <img src="https://images.unsplash.com/photo-1596399770248-3e536760a561?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="Vineyard" className="w-full h-full object-cover"/>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          <span className="block">Welcome to</span>
          <span className="block text-purple-400">VinoLog</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Discover, track, and share your personal journey through the world of grapes. Log your tasting notes and build your own virtual cellar.
        </p>
        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
          <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
            <button
              onClick={() => onLogin('user@manifest.build', 'password')}
              className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 sm:px-8 transition-colors"
            >
              Login as Demo User
            </button>
            <a
              href="/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-purple-600 bg-white hover:bg-purple-50 sm:px-8 transition-colors"
            >
              Admin Panel
            </a>
          </div>
        </div>
         <p className="mt-6 text-xs text-gray-400">Admin: admin@manifest.build / admin | Demo User: user@manifest.build / password</p>
      </div>
    </div>
  );
};

export default LandingPage;
