import React from "react";
import StatCard from "./StatCard";
import MarketOverviewChart from "./MarketOverviewChart";
import SalesOverviewChart from "./SalesOverviewChart";
import SalesAnalyticsChart from "./SalesAnalyticsChart";
import TransactionList from "./TransactionList";
import LogoutButton from "./LogoutButton";
import { translations } from "../constants/translations";

const DashboardContent = ({ locale, onLogout }) => {
  const t = translations[locale].dashboard || {};

  // Sample data for the dashboard
  const stats = [
    {
      id: 1,
      title: t.numberSales || "Number of Sales",
      value: "3450",
      change: "25%",
      trend: "up",
      icon: (
        <svg
          className="h-6 w-6 text-yellow-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1v-8zm6-8a1 1 0 011-1h2a1 1 0 011 1v16a1 1 0 01-1 1H9a1 1 0 01-1-1V3zm6 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V7z" />
        </svg>
      ),
      iconBg: "bg-yellow-100",
    },
    {
      id: 2,
      title: t.salesRevenue || "Sales Revenue",
      value: "$35,256",
      change: "15%",
      trend: "up",
      icon: (
        <svg
          className="h-6 w-6 text-cyan-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 13v-1h4v1c0 1.1-.9 2-2 2s-2-.9-2-2zm2-8c-3.3 0-6 2.7-6 6v6c0 1.1.9 2 2 2h2v2h4v-2h2c1.1 0 2-.9 2-2v-6c0-3.3-2.7-6-6-6zm0 2c2.2 0 4 1.8 4 4v6h-8v-6c0-2.2 1.8-4 4-4z" />
        </svg>
      ),
      iconBg: "bg-cyan-100",
    },
    {
      id: 3,
      title: t.averagePrice || "Average Price",
      value: "$35,256",
      change: "15%",
      trend: "down",
      icon: (
        <svg
          className="h-6 w-6 text-green-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-.77-.46-1.31-.81-1.31-1.44 0-.52.47-1.09 1.5-1.09.87 0 1.21.38 1.38.77l1.07-.58C14.65 8 13.89 7.5 13 7.5V6.5h-2v1.04c-1.17.2-2 1.14-2 2.18 0 1.25.99 1.91 2.07 2.47.8.39 1.93.88 1.93 1.72 0 .85-.86 1.28-1.5 1.28-.87 0-1.54-.37-1.79-1.09l-1.14.5c.35 1.1 1.33 1.69 2.36 1.84V18h2v-1c1.19-.12 2.07-1.05 2.07-2.31 0-1.44-1.24-2.13-2.69-2.55z" />
        </svg>
      ),
      iconBg: "bg-green-100",
    },
    {
      id: 4,
      title: t.operations || "Operations",
      value: "15,893",
      change: "",
      trend: null,
      icon: (
        <svg
          className="h-6 w-6 text-indigo-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
        </svg>
      ),
      iconBg: "bg-indigo-100",
    },
  ];

  // Sample data for market overview chart
  const marketData = [];
  for (let i = 1; i <= 10; i++) {
    marketData.push({
      day: i,
      activity: Math.floor(Math.random() * 50) + 30,
      goal: Math.floor(Math.random() * 70) + 40,
    });
  }

  // Sample data for transactions
  const transactions = [
    {
      id: 1,
      type: "incoming",
      name: "Incoming Transfer",
      currency: "Bitcoin",
      direction: "up",
    },
    {
      id: 2,
      type: "sales",
      name: "Sales Report",
      currency: "Ethereum",
      direction: "down",
    },
    {
      id: 3,
      type: "incoming",
      name: "Incoming Transfer",
      currency: "Binance",
      direction: "up",
    },
    {
      id: 4,
      type: "incoming",
      name: "Incoming Transfer",
      currency: "Bitcoin",
      direction: "down",
    },
    {
      id: 5,
      type: "incoming",
      name: "Incoming Transfer",
      currency: "Bitcoin",
      direction: "up",
    },
  ];

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={stat.icon}
            iconBg={stat.iconBg}
          />
        ))}
      </div>

      {/* Market Overview Chart */}
      <MarketOverviewChart locale={locale} data={marketData} />

      {/* Two-column layout for Sales Overview and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sales Overview with Progress Circle */}
        <SalesOverviewChart locale={locale} percentage={71} />

        {/* Sales Analytics with Area Chart */}
        <SalesAnalyticsChart locale={locale} />
      </div>

      {/* Transactions List */}
      <TransactionList transactions={transactions} />

      {/* Logout button */}
      <LogoutButton locale={locale} onLogout={onLogout} />
    </main>
  );
};

export default DashboardContent;
