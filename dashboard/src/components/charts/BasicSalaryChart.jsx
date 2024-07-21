import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import useGetCollectionApi from "../../hooks/useGetCollectionApi";

const BasicSalaryChart = () => {
  const { results } = useGetCollectionApi("employee");

  // Chuẩn bị dữ liệu cho biểu đồ Line
  const prepareChartData = () => {
    const roleSalaries = {};

    // Tính tổng lương cơ bản cho mỗi vai trò
    results.forEach((employee) => {
      const role = employee.role;
      const salary = employee.salary;

      if (!roleSalaries[role]) {
        roleSalaries[role] = [];
      }

      roleSalaries[role].push(salary);
    });

    // Tính giá trị trung bình lương cơ bản cho mỗi vai trò
    const data = Object.keys(roleSalaries).map((role) => ({
      role: role,
      averageSalary:
        roleSalaries[role].reduce((acc, curr) => acc + curr, 0) /
        roleSalaries[role].length,
    }));

    return data;
  };

  // Dữ liệu cho biểu đồ Line Chart
  const chartData = prepareChartData();

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="role" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="averageSalary" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BasicSalaryChart;
