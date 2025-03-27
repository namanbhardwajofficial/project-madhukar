import React from "react";
import { translations } from "../constants/translations";

const LogoutButton = ({ locale, onLogout }) => {
  const t = translations[locale].dashboard || {};

  return (
    <div className="text-center mt-6">
      <button
        onClick={onLogout}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        {t.logout || "Logout"}
      </button>
    </div>
  );
};

export default LogoutButton;
