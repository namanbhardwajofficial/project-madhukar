// src/components/Dashboard.jsx
import React from "react";
import DashboardLayout from "./DashboardLayout";

const Dashboard = ({ locale, onLogout }) => {
  return <DashboardLayout locale={locale} onLogout={onLogout} />;
};

export default Dashboard;
