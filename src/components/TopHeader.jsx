import React from "react";

const TopHeader = ({ onMenuToggle, locale }) => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between px-4 py-4">
        <button
          onClick={onMenuToggle}
          className="md:hidden text-gray-500 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className="flex items-center">
          <span className="text-gray-700 mr-2">Marcus White</span>
          <img
            className="h-8 w-8 rounded-full"
            src="/api/placeholder/40/40"
            alt="User avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
