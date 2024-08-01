import React from "react";

const ChartSection = ({ children, title = "" }) => {
  return (
    <div className="space-y-3 border shadow-md rounded-md p-5">
      <h1 className="text-2xl font-bold text-blue-gray-700">{title}</h1>
      {children}
    </div>
  );
};

export default ChartSection;
