import React, { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import useAuth from "./hooks/useAuth";

function App() {
  const { isAuthenticated, restoreAuth, logout } = useAuth();
  const [locale, setLocale] = useState("en");

  // Restore authentication session on app load
  useEffect(() => {
    restoreAuth();
  }, [restoreAuth]);

  // Handle language change
  const handleLanguageChange = (event) => {
    setLocale(event.target.value);
  };

  return (
    <div className="app">
      {isAuthenticated ? (
        <div className="p-8 max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
            <p className="mb-4">You are successfully logged in.</p>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="absolute top-4 right-4 z-10">
            <select
              value={locale}
              onChange={handleLanguageChange}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
          <LoginPage locale={locale} />
        </div>
      )}
    </div>
  );
}

export default App;
