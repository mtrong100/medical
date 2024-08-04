import TitleSection from "../../components/TitleSection";
import React from "react";
import FigureBlock from "./FigureBlock";
import VerticalBarChart from "../../components/charts/VerticalBarChart";
import useGetRevenueAndExpense from "./useGetRevenueAndExpense";
import RevenueAndExpenseChart from "./RevenueAndExpenseChart";
import { calculateAverage } from "../../utils/helper";

const Dashboard = () => {
  const { labelResults, revenueResults, expenseResults, isLoading } =
    useGetRevenueAndExpense();

  const a = calculateAverage(revenueResults);
  const b = calculateAverage(expenseResults);

  return (
    <div>
      <TitleSection>Quản lí chung</TitleSection>
      <FigureBlock />

      <div className="mt-10 grid grid-cols-[minmax(0,_1fr)_400px] gap-5">
        <VerticalBarChart
          loading={isLoading}
          labels={labelResults}
          dataSet1={revenueResults}
          dataSet2={expenseResults}
          labelDataSet1="Doanh thu"
          labelDataSet2="Chi tiêu"
          chartHeight="450px"
        />
        <RevenueAndExpenseChart number1={a} number2={b} />
      </div>
    </div>
  );
};

export default Dashboard;
