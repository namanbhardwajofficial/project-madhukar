import React from "react";

const StatCard = ({ title, value, change, trend, icon, iconBg }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="text-gray-500 text-sm">{title}</div>
      <div className="text-indigo-900 text-2xl font-bold">{value}</div>

      <div className="flex justify-between items-center mt-2">
        {change && (
          <div
            className={`flex items-center ${
              trend === "up" ? "text-green-500" : "text-red-500"
            }`}
          >
            {trend === "up" ? (
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span className="ml-1">{change}</span>
          </div>
        )}

        <div className={`${iconBg} p-2 rounded-lg`}>{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;
