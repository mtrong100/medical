import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { Skeleton } from "primereact/skeleton";

const ExpenseChart = ({ dataSet = [], loading }) => {
  console.log(dataSet);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const data = {
      labels: ["Thiết bị", "Thuốc"],
      datasets: [
        {
          label: "Tổng chi phí",
          data: dataSet,
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: ["rgb(54, 162, 235)", "rgb(255, 159, 64)"],
          borderWidth: 1,
        },
      ],
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [dataSet]);

  if (loading) {
    return <Skeleton height={250}></Skeleton>;
  }

  return (
    <Chart
      type="bar"
      data={chartData}
      options={chartOptions}
      className={`rounded-md border border-gray-200 py-5 bg-white shadow-sm flex items-center justify-center h-[250px]`}
    />
  );
};

export default ExpenseChart;
