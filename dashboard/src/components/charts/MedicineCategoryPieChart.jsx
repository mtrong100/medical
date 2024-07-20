import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { getMedicineCategoriesApi } from "../../api/medicineCategoryApi";

const MedicineCategoryPieChart = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);

      try {
        const res = await getMedicineCategoriesApi({ limit: 999999999 });
        if (res) setCategories(res?.results);
      } catch (error) {
        console.log("Lỗi fetch data danh mục thuốc: ", error);
        toast.error("Lỗi fetch data danh mục thuốc");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7f50",
    "#8dd1e1",
    "#a4de6c",
  ];

  const pieChartData = categories.map((item, index) => ({
    category: item.name,
    quantity: item.medicineCount,
    fill: colors[index % colors.length],
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={pieChartData}
          dataKey="quantity"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={150}
          label
          labelLine={false}
          animationBegin={0}
          animationDuration={800}
          paddingAngle={5}
          innerRadius={50}
        />
        <Tooltip />
        <Legend layout="vertical" align="right" verticalAlign="middle" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default MedicineCategoryPieChart;
