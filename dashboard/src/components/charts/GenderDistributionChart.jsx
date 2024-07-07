import React from "react";
import { PieChart, Pie, ResponsiveContainer, Legend } from "recharts";

const GenderDistributionChart = ({ employees = [] }) => {
  // Tính toán phân bố giới tính
  const calculateGenderPercentages = () => {
    const genderCounts = {
      male: 0,
      female: 0,
    };
    employees.forEach((employee) => {
      const gender = employee.gender;
      if (gender === "Nam") {
        genderCounts.male++;
      } else if (gender === "Nữ") {
        genderCounts.female++;
      }
    });
    const totalEmployees = employees.length;
    const malePercentage = (genderCounts.male / totalEmployees) * 100;
    const femalePercentage = (genderCounts.female / totalEmployees) * 100;
    return [
      { gender: "Nam", value: malePercentage },
      { gender: "Nữ", value: femalePercentage },
    ];
  };

  // Dữ liệu cho biểu đồ Pie Chart
  const pieChartData = calculateGenderPercentages();

  // Định dạng phần trăm trực tiếp trên Pie
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={pieChartData}
          dataKey="value"
          nameKey="gender"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#82ca9d"
          label={renderCustomizedLabel}
          labelLine={false}
          animationBegin={0}
          animationDuration={800}
          paddingAngle={5}
          innerRadius={50}
        />
        <Legend layout="vertical" align="right" verticalAlign="middle" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default GenderDistributionChart;
