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

const ViewAndCommentChart = ({ data = [] }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="totalViews"
          stackId="1"
          stroke="#FFBB28"
          fill="#FFBB28"
        />
        <Area
          type="monotone"
          dataKey="totalComments"
          stackId="1"
          stroke="#AF19FF"
          fill="#AF19FF"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ViewAndCommentChart;
