import React, { useMemo } from "react";
import { Chart } from "primereact/chart";
import { Skeleton } from "primereact/skeleton";

const PatientGenderPieChart = ({ loading, dataSet = [], labels = [] }) => {
  const documentStyle = getComputedStyle(document.documentElement);

  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data: dataSet,
          backgroundColor: [
            documentStyle.getPropertyValue("--orange-500"),
            documentStyle.getPropertyValue("--purple-500"),
            documentStyle.getPropertyValue("--pink-500"),
            documentStyle.getPropertyValue("--cyan-500"),
            documentStyle.getPropertyValue("--indigo-500"),
            documentStyle.getPropertyValue("--teal-500"),
            documentStyle.getPropertyValue("--red-500"),
            documentStyle.getPropertyValue("--bluegray-500"),
            documentStyle.getPropertyValue("--green-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--pink-500"),
            documentStyle.getPropertyValue("--indigo-500"),
          ],
        },
      ],
    }),
    [dataSet, documentStyle, labels]
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
    return <Skeleton height={350}></Skeleton>;
  }

  return (
    <Chart
      type="pie"
      data={chartData}
      options={chartOptions}
      className="rounded-md border border-gray-200 p-5 bg-white shadow-sm flex items-center justify-center h-[350px]"
    />
  );
};

export default PatientGenderPieChart;
