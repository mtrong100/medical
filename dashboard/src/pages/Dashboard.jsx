import React, { useMemo } from "react";
import TitleSection from "../components/TitleSection";
import useGetCollectionApi from "../hooks/useGetCollectionApi";
import { formatCurrencyVND } from "../utils/helper";
import { FaUsers, FaCalendarAlt } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import MonthlyRevenueChart from "../components/charts/MonthlyRevenueChart";
import { monthsArray } from "../utils/constants";
import MedicineCategoryPieChart from "../components/charts/MedicineCategoryPieChart";
import EmployeeRolesChart from "../components/charts/EmployeeChart";
import GenderDistributionChart from "../components/charts/GenderDistributionChart";
import Box from "../components/Box";
import BasicSalaryChart from "../components/charts/BasicSalaryChart";

const Dashboard = () => {
  const { results: employees } = useGetCollectionApi("employee");
  const { results: patients } = useGetCollectionApi("patient");
  const { results: appointments } = useGetCollectionApi("appointment");
  const { results: medicalServiceInvoices } = useGetCollectionApi(
    "medical-service-invoice"
  );
  const { results: prescriptions } = useGetCollectionApi("prescription");
  const { results: invoices } = useGetCollectionApi("invoice");

  // Calculate total revenue
  const totalRevenue = useMemo(() => {
    const invoiceTotal = invoices
      .map((invoice) => invoice.total)
      .reduce((a, b) => a + b, 0);
    const medicalServiceInvoiceTotal = medicalServiceInvoices
      .map((medicalServiceInvoice) => medicalServiceInvoice.total)
      .reduce((a, b) => a + b, 0);
    const prescriptionTotal = prescriptions
      .map((prescription) => prescription.total)
      .reduce((a, b) => a + b, 0);

    return invoiceTotal + medicalServiceInvoiceTotal + prescriptionTotal;
  }, [invoices, medicalServiceInvoices, prescriptions]);

  // Calculate monthly revenue
  const monthlyRevenueData = useMemo(() => {
    // Combine all data into one array
    const allData = [...medicalServiceInvoices, ...prescriptions, ...invoices];

    // Initialize monthly revenue map for all months
    const monthlyRevenueMap = {};
    for (let i = 0; i < 12; i++) {
      monthlyRevenueMap[i] = {
        month: monthsArray[i], // Assuming monthsArray is defined with month names
        revenue: 0,
      };
    }

    // Map data to monthly revenue format
    allData.forEach((item) => {
      const createdAt = new Date(item.createdAt);
      const month = createdAt.getMonth();
      monthlyRevenueMap[month].revenue += item.total; // Assuming total field exists
    });

    // Convert map to array of objects
    const monthlyRevenueData = Object.values(monthlyRevenueMap);

    return monthlyRevenueData;
  }, [medicalServiceInvoices, prescriptions, invoices]);

  return (
    <div>
      <TitleSection>Quản lí chung</TitleSection>

      <div className="mt-5 grid grid-cols-4 gap-3">
        <Box
          color="blue"
          heading="Doanh thu"
          number={formatCurrencyVND(totalRevenue || 0)}
          icon={<MdOutlineAttachMoney size={30} color="white" />}
        />
        <Box
          color="red"
          heading="Lịch khám"
          number={appointments.length || 0}
          icon={<FaCalendarAlt size={30} color="white" />}
        />
        <Box
          color="green"
          heading="Nhân viên"
          number={employees?.length || 0}
          icon={<FaUsers size={30} color="white" />}
        />
        <Box
          color="amber"
          heading="Bệnh nhân"
          number={patients.length || 0}
          icon={<FaUsers size={30} color="white" />}
        />
      </div>

      <div className="mt-10 space-y-5">
        <div className="space-y-5">
          <h1 className="text-2xl font-bold text-blue-gray-700">
            Thống kê doanh thu theo tháng
          </h1>
          <MonthlyRevenueChart monthlyRevenueData={monthlyRevenueData} />
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
          <EmployeeRolesChart employees={employees} />
          <GenderDistributionChart employees={employees} />
          <BasicSalaryChart employees={employees} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
