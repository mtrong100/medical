import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { getAllMedicineCategoriesApi } from "../../api/medicineCategoryApi";

const MedicineCategoryPieChart = () => {
  const [medicineCategories, setMedicineCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMedicineCategories();
  }, []);

  const fetchMedicineCategories = async () => {
    setLoading(true);
    try {
      const res = await getAllMedicineCategoriesApi();
      if (res) setMedicineCategories(res);
    } catch (error) {
      console.log("Error fetching medicine categories:", error);
      setMedicineCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Mảng màu sắc cho từng danh mục thuốc
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7f50",
    "#8dd1e1",
    "#a4de6c",
  ];

  // Chuyển đổi dữ liệu thành dạng phù hợp cho PieChart và gán màu sắc
  const pieChartData = medicineCategories.map((item, index) => ({
    category: item.name,
    quantity: item.medicineCount,
    fill: colors[index % colors.length], // Sử dụng màu sắc từ mảng colors, lặp lại nếu cần
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
