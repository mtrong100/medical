import React, { useMemo } from "react";
import { Chart } from "primereact/chart";
import { Skeleton } from "primereact/skeleton";

const CategoryChart = ({ dataSet = [], loading }) => {
  const documentStyle = getComputedStyle(document.documentElement);

  const chartData = useMemo(
    () => ({
      labels: ["Vật tư", "Thuốc"],
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

export default CategoryChart;
