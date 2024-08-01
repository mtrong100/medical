import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MonthlyPostChart = ({ data = [] }) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="postCount"
          stroke="#4caf50"
          fill="#d0f0d0"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default MonthlyPostChart;
