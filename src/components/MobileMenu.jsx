import React from "react";

const MobileMenu = ({ isOpen, onClose, locale }) => {
  return (
    <>
      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`fixed inset-y-0 left-0 flex flex-col z-40 max-w-xs w-full bg-indigo-900 transform transition-transform ease-in-out duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 pt-5 pb-2">
          <div className="flex items-center">
            <svg
              className="h-8 w-8 text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6L14 6L14 14L6 14L6 6Z"
                fill="currentColor"
                fillOpacity="0.5"
              />
              <path d="M14 6L22 6L22 14L14 14L14 6Z" fill="currentColor" />
              <path d="M6 14L14 14L14 22L6 22L6 14Z" fill="currentColor" />
            </svg>
            <span className="ml-3 text-xl font-bold text-white">Acme</span>
          </div>
          <button onClick={onClose} className="text-white focus:outline-none">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="mt-5 flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 bg-indigo-900">
            <a
              href="#"
              className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white focus:outline-none"
            >
              <svg
                className="mr-4 h-6 w-6 text-indigo-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7m-7-7v18"
                />
              </svg>
              Home
            </a>
            <a
              href="#"
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white focus:outline-none"
            >
              <svg
                className="mr-4 h-6 w-6 text-indigo-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Calendar
            </a>
            <a
              href="#"
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white focus:outline-none"
            >
              <svg
                className="mr-4 h-6 w-6 text-indigo-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Reports
            </a>
            <a
              href="#"
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white bg-indigo-800 focus:outline-none"
            >
              <svg
                className="mr-4 h-6 w-6 text-indigo-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              Dashboard
            </a>
            <a
              href="#"
              className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white focus:outline-none"
            >
              <svg
                className="mr-4 h-6 w-6 text-indigo-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Contacts
            </a>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
