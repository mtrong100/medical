import React, { useMemo } from "react";
import { Chart } from "primereact/chart";
import { Skeleton } from "primereact/skeleton";

const PatientGenderPieChart = ({ loading, dataSet = [] }) => {
  const documentStyle = getComputedStyle(document.documentElement);

  const chartData = useMemo(
    () => ({
      labels: ["Nam", "Nữ"],
      datasets: [
        {
          data: dataSet,
          backgroundColor: [
            documentStyle.getPropertyValue("--orange-500"),
            documentStyle.getPropertyValue("--purple-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--orange-400"),
            documentStyle.getPropertyValue("--purple-400"),
          ],
        },
      ],
    }),
    [dataSet, documentStyle]
  );

  const chartOptions = useMemo(
    () => ({
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
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
      type="pie"
      data={chartData}
      options={chartOptions}
      className="rounded-md border border-gray-200 py-5 bg-white shadow-sm flex items-center justify-center h-[250px]"
    />
  );
};

export default PatientGenderPieChart;
