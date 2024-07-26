import TitleSection from "../../components/TitleSection";
import React from "react";
import MonthlyRevenueChart from "../../components/charts/MonthlyRevenueChart";
import MedicineCategoryPieChart from "../../components/charts/MedicineCategoryPieChart";
import GenderDistributionChart from "../../components/charts/GenderDistributionChart";
import FigureBlock from "./FigureBlock";
import EmployeeRolesChart from "../../components/charts/EmployeeChart";
import BasicSalaryChart from "../../components/charts/BasicSalaryChart";

const Dashboard = () => {
  return (
    <div>
      <TitleSection>Quản lí và thống kê</TitleSection>

      <FigureBlock />

      <div className="mt-10 space-y-5">
        <div className="space-y-5">
          <h1 className="text-2xl font-bold text-blue-gray-700">
            Thống kê doanh thu theo tháng
          </h1>
          <MonthlyRevenueChart />
        </div>

        <div className="space-y-5">
          <h1 className="text-2xl font-bold text-blue-gray-700">
            Thống kê số lượng thuốc trong kho
          </h1>
          <MedicineCategoryPieChart />
        </div>

        <div className="space-y-5">
          <h1 className="text-2xl font-bold text-blue-gray-700">
            Biểu đồ thống kê nhân viên
          </h1>
          <EmployeeRolesChart />
          <GenderDistributionChart />
          <BasicSalaryChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
