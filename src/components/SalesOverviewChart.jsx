import React from "react";
import { translations } from "../constants/translations";

const SalesOverviewChart = ({ locale, percentage = 71 }) => {
  const t = translations[locale].dashboard || {};

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">
          {t.salesOverview || "Sales Overview"}
        </h2>
        <div className="text-sm text-gray-500 flex items-center">
          {t.today || "Today"}
          <svg
            className="ml-1 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Circle Progress */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-40 h-40">
          {/* Background circle */}
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="3"
            />
            {/* Progress circle */}
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="3"
              strokeDasharray={`${percentage}, 100`}
            />
          </svg>
          {/* Percentage in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-indigo-900">
              {percentage}%
            </span>
          </div>
        </div>

        {/* System status */}
        <div className="mt-4 flex items-center">
          <div className="flex items-center px-3 py-1 rounded-full bg-teal-100">
            <div className="w-2 h-2 rounded-full bg-teal-500 mr-2"></div>
            <span className="text-sm">
              {t.systemStatus || "System status"}:{" "}
              <span className="font-medium text-teal-500">
                {t.optimum || "OPTIMUM"}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesOverviewChart;
