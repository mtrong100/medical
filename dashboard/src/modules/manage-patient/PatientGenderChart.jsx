import React, { useMemo } from "react";
import { Chart } from "primereact/chart";
import { Skeleton } from "primereact/skeleton";

const PatientGenderChart = ({ loading, dataSet = [] }) => {
  const chartData = useMemo(
    () => ({
      labels: ["Nam", "Nữ"],
      datasets: [
        {
          label: "Giới tính",
          data: dataSet,
          backgroundColor: [
            "rgba(255, 159, 64, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: ["rgb(255, 159, 64)", "rgb(153, 102, 255)"],
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

export default PatientGenderChart;
