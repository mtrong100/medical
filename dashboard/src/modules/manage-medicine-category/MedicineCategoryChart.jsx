import React, { useMemo } from "react";
import { Chart } from "primereact/chart";
import { Skeleton } from "primereact/skeleton";

const MedicineCategoryChart = ({ loading, dataSet = [], labels }) => {
  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Danh mục thuốc",
          data: dataSet,
          backgroundColor: [
            "rgba(255, 159, 64, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
          ],
          borderColor: [
            "rgb(255, 159, 64)",
            "rgb(153, 102, 255)",
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 206, 86)",
            "rgb(75, 192, 192)",
            "rgb(153, 102, 255)",
            "rgb(255, 159, 64)",
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 206, 86)",
          ],
          borderWidth: 1,
        },
      ],
    }),
    [dataSet, labels]
  );

  const chartOptions = useMemo(
    () => ({
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    }),
    []
  );

  if (loading) {
    return <Skeleton height={570}></Skeleton>;
  }

  return (
    <Chart
      type="bar"
      data={chartData}
      options={chartOptions}
      className="rounded-md border w-full border-gray-200 p-5 bg-white shadow-sm h-[570px]"
    />
  );
};

export default MedicineCategoryChart;
