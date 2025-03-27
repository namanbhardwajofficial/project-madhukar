import React, { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import SignupPage from "./components/SignupPage";
import useAuth from "./hooks/useAuth";
import { translations } from "./constants/translations";

function App() {
  const { isAuthenticated, restoreAuth, logout } = useAuth();
  const [locale, setLocale] = useState(() => {
    return localStorage.getItem("locale") || "en";
  });
  const [currentPage, setCurrentPage] = useState("login");

  // Restore authentication session on app load
  useEffect(() => {
    restoreAuth();
  }, [restoreAuth]);

  // Save locale to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  // Handle language change
  const handleLanguageChange = (event) => {
    setLocale(event.target.value);
  };

  // Handle page navigation
  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const renderAuthenticatedContent = () => {
    return <Dashboard locale={locale} onLogout={logout} />;
  };

  const renderUnauthenticatedContent = () => {
    switch (currentPage) {
      case "forgot-password":
        return (
          <ForgotPasswordPage
            locale={locale}
            onBackToLogin={() => navigateTo("login")}
          />
        );
      case "signup":
        return (
          <SignupPage
            locale={locale}
            onBackToLogin={() => navigateTo("login")}
          />
        );
      default:
        return (
          <LoginPage
            locale={locale}
            onForgotPassword={() => navigateTo("forgot-password")}
            onSignup={() => navigateTo("signup")}
          />
        );
    }
  };

  const t = translations[locale];

  return (
    <div className="app font-sans">
      <div className="absolute top-4 right-4 z-10">
        <select
          value={locale}
          onChange={handleLanguageChange}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          style={{ backgroundColor: "white" }}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
      </div>

      {isAuthenticated
        ? renderAuthenticatedContent()
        : renderUnauthenticatedContent()}
    </div>
  );
}

export default App;
