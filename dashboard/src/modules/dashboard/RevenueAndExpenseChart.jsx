import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

const RevenueAndExpenseChart = ({ number1, number2 }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["Doanh thu", "Chi tiêu"],
      datasets: [
        {
          data: [number1, number2],
          backgroundColor: [
            documentStyle.getPropertyValue("--green-500"),
            documentStyle.getPropertyValue("--orange-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--green-400"),
            documentStyle.getPropertyValue("--orange-400"),
          ],
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [number1, number2]);

  return (
    <Chart
      type="pie"
      data={chartData}
      options={chartOptions}
      className="rounded-md border flex items-center justify-center p-5 bg-white shadow-md"
    />
  );
};

export default RevenueAndExpenseChart;
