import React from "react";
import { translations } from "../constants/translations";

const SalesAnalyticsChart = ({ locale }) => {
  const t = translations[locale].dashboard || {};

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">
          {t.salesAnalytics || "Sales Analytics"}
        </h2>
      </div>

      {/* Simplified area chart */}
      <div className="h-64 relative overflow-hidden rounded-lg">
        {/* Background gradient for area chart */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-100 to-blue-50 opacity-80"></div>

        {/* Chart line - simplified representation */}
        <svg
          className="absolute inset-0"
          viewBox="0 0 100 50"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 L10,45 L20,48 L30,40 L40,45 L50,35 L60,40 L70,30 L80,35 L90,25 L100,30 L100,50 L0,50 Z"
            fill="rgba(147, 197, 253, 0.5)"
            stroke="rgb(96, 165, 250)"
            strokeWidth="1"
          />
        </svg>

        {/* Data point marker */}
        <div className="absolute top-1/3 right-1/3 w-4 h-4 rounded-full border-2 border-red-500 bg-white"></div>

        {/* Data point value */}
        <div className="absolute top-5 right-5 bg-indigo-900 text-white text-xs px-2 py-1 rounded">
          87
        </div>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 px-4 py-2">
          <span>M</span>
          <span>T</span>
          <span>W</span>
          <span>T</span>
          <span>F</span>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalyticsChart;
