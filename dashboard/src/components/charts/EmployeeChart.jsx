import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

const EmployeeRolesChart = ({ employees = [] }) => {
  // Tính toán số lượng từng vai trò
  const calculateRoleCounts = () => {
    const roleCounts = {};
    employees.forEach((employee) => {
      const role = employee.role;
      if (roleCounts[role]) {
        roleCounts[role]++;
      } else {
        roleCounts[role] = 1;
      }
    });
    return roleCounts;
  };

  // Chuẩn bị dữ liệu cho biểu đồ Bar
  const prepareChartData = () => {
    const roleCounts = calculateRoleCounts();
    const data = Object.keys(roleCounts).map((role) => ({
      role: role,
      count: roleCounts[role],
    }));
    return data;
  };

  // Dữ liệu cho biểu đồ Bar
  const chartData = prepareChartData();

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="role" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8dd1e1" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EmployeeRolesChart;
