import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { Skeleton } from "primereact/skeleton";

const CategoryChart = ({ dataSet = [], loading }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["Thiết bị", "Thuốc"],
      datasets: [
        {
          data: dataSet,
          backgroundColor: [
            documentStyle.getPropertyValue("--cyan-500"),
            documentStyle.getPropertyValue("--orange-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--cyan-400"),
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
  }, [dataSet]);

  if (loading) {
    return <Skeleton height={250}></Skeleton>;
  }

  return (
    <Chart
      type="pie"
      data={chartData}
      options={chartOptions}
      className={`rounded-md border border-gray-200 py-5 bg-white shadow-sm flex items-center justify-center h-[250px]`}
    />
  );
};

export default CategoryChart;
