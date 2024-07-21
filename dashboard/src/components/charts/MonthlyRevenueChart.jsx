import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import useGetMonthlyRevenue from "../../modules/dashboard/useGetMonthlyRevenue";

const MonthlyRevenueChart = () => {
  const { monthlyRevenues } = useGetMonthlyRevenue();

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={monthlyRevenues}
        margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} interval={0} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlyRevenueChart;
