import React, { useMemo } from "react";
import { Chart } from "primereact/chart";
import { Skeleton } from "primereact/skeleton";

const ExpenseChart = ({ dataSet = [], loading }) => {
  const chartData = useMemo(
    () => ({
      labels: ["Vật tư", "Thuốc"],
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
    }),
    [dataSet]
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
    return <Skeleton height={250}></Skeleton>;
  }

  return (
    <Chart
      type="bar"
      data={chartData}
      options={chartOptions}
      className="rounded-md border border-gray-200 py-5 bg-white shadow-sm flex items-center justify-center h-[250px]"
    />
  );
};

export default ExpenseChart;
