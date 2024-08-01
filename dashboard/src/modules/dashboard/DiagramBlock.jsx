import React from "react";
import MonthlyRevenueChart from "./MonthlyRevenueChart";
import MonthlyExpenseChart from "./MonthlyExpenseChart";
import ChartSection from "../../components/ChartSection";

const DiagramBlock = () => {
  return (
    <div className="space-y-5">
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
