import React from "react";
import { translations } from "../constants/translations";

const MarketOverviewChart = ({ locale, data }) => {
  const t = translations[locale].dashboard || {};

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">
          {t.marketOverview || "Market Overview"}
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
            <span className="text-sm text-gray-500">
              {t.activity || "Activity"}
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-indigo-800 mr-2"></div>
            <span className="text-sm text-gray-500">{t.goal || "Goal"}</span>
          </div>
        </div>
      </div>

      {/* Simplified bar chart */}
      <div className="h-64 flex items-end space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full flex items-end justify-center space-x-1 mb-2">
              <div
                className="w-3 bg-blue-400 rounded-t"
                style={{ height: `${item.activity}%` }}
              ></div>
              <div
                className="w-3 bg-indigo-800 rounded-t"
                style={{ height: `${item.goal}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500">{item.day}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketOverviewChart;
