import React from "react";

const TransactionList = ({ transactions, date = "Today 22nd Jan, 2021" }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">{date}</h2>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition"
          >
            <div
              className={`p-2 rounded-lg ${
                transaction.direction === "up"
                  ? "bg-green-100 text-green-500"
                  : "bg-yellow-100 text-yellow-500"
              } mr-4`}
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d={
                    transaction.direction === "up"
                      ? "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      : "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  }
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{transaction.name}</h3>
              <p className="text-sm text-gray-500">{transaction.currency}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
