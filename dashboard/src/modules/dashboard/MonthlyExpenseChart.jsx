import React, { useEffect, useState } from "react";
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
import { getMonthlyExpenseApi } from "../../api/stastisticApi";
import toast from "react-hot-toast";

const MonthlyExpenseChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getMonthlyExpenseApi();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(error.message);
    }
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="expense"
          stroke="#4caf50"
          fill="#d0f0d0"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default MonthlyExpenseChart;
