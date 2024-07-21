import useGetRevenue from "./useGetRevenue";
import useGetFirgures from "./useGetFigures";
import TitleSection from "../../components/TitleSection";
import React from "react";
import MonthlyRevenueChart from "../../components/charts/MonthlyRevenueChart";
import MedicineCategoryPieChart from "../../components/charts/MedicineCategoryPieChart";
import GenderDistributionChart from "../../components/charts/GenderDistributionChart";
import EmployeeRolesChart from "../../components/charts/EmployeeChart";
import Box from "../../components/Box";
import BasicSalaryChart from "../../components/charts/BasicSalaryChart";
import { MdOutlineAttachMoney } from "react-icons/md";
import { formatCurrencyVND } from "../../utils/helper";
import { FaUsers, FaCalendarAlt } from "react-icons/fa";

const Dashboard = () => {
  const { revenue } = useGetRevenue();
  const { figures } = useGetFirgures();

  return (
    <div>
      <TitleSection>Quản lí và thống kê</TitleSection>

      {/* Figures */}
      <div className="mt-5 grid grid-cols-4 gap-3">
        <Box
          color="blue"
          heading="Doanh thu"
          number={formatCurrencyVND(revenue || 0)}
          icon={<MdOutlineAttachMoney size={30} color="white" />}
        />
        <Box
          color="red"
          heading="Lịch khám"
          number={figures?.appointmentCount || 0}
          icon={<FaCalendarAlt size={30} color="white" />}
        />
        <Box
          color="green"
          heading="Nhân viên"
          number={figures?.employeeCount || 0}
          icon={<FaUsers size={30} color="white" />}
        />
        <Box
          color="amber"
          heading="Bệnh nhân"
          number={figures?.patientCount || 0}
          icon={<FaUsers size={30} color="white" />}
        />
      </div>

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
