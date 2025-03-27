import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MobileMenu from "./MobileMenu";
import TopHeader from "./TopHeader";
import DashboardContent from "./DashboardContent";
import { translations } from "../constants/translations";

const DashboardLayout = ({ locale = "en", onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[locale].dashboard || {};

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <Sidebar locale={locale} />

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={toggleMobileMenu}
        locale={locale}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader onMenuToggle={toggleMobileMenu} locale={locale} />

        <DashboardContent locale={locale} onLogout={onLogout} />
      </div>
    </div>
  );
};

export default DashboardLayout;
