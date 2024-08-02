import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF4563",
  "#FF9F1C",
  "#2E2B5F",
  "#00BFFF",
  "#7FDBFF",
];

const PostByCategoryChart = ({ data = [] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx={270}
          cy={130}
          labelLine={false}
          label={({ category, postCount }) => `${category}: ${postCount}`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="postCount"
          nameKey="category"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="vertical" align="right" verticalAlign="right" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PostByCategoryChart;
