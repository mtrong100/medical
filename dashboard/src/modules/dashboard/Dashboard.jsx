import TitleSection from "../../components/TitleSection";
import React from "react";
import FigureBlock from "./FigureBlock";
import VerticalBarChart from "../../components/charts/VerticalBarChart";
import useGetRevenueAndExpense from "./useGetRevenueAndExpense";

const Dashboard = () => {
  const { labelResults, revenueResults, expenseResults, isLoading } =
    useGetRevenueAndExpense();

  return (
    <div>
      <TitleSection>Quản lí chung</TitleSection>
      <FigureBlock />

      <div className="mt-10">
        <VerticalBarChart
          loading={isLoading}
          labels={labelResults}
          dataSet1={revenueResults}
          dataSet2={expenseResults}
          labelDataSet1="Doanh thu"
          labelDataSet2="Chi tiêu"
          chartHeight="500px"
        />
      </div>
    </div>
  );
};

export default Dashboard;
