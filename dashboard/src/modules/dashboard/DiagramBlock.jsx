import React from "react";
import MonthlyRevenueChart from "./MonthlyRevenueChart";
import MonthlyExpenseChart from "./MonthlyExpenseChart";

const DiagramBlock = () => {
  return (
    <div>
      <ChartSection title="Thống kê doanh thu theo tháng">
        <MonthlyRevenueChart />
      </ChartSection>

      <ChartSection title="Thống kê chi tiêu theo tháng">
        <MonthlyExpenseChart />
      </ChartSection>
    </div>
  );
};

export default DiagramBlock;

function ChartSection({ children, title = "" }) {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold text-blue-gray-700">{title}</h1>
      {children}
    </div>
  );
}
