import React, { useMemo } from "react";
import { Chart } from "primereact/chart";
import { Skeleton } from "primereact/skeleton";

const DeviceByCategoryPieChart = ({ dataSet = [], labels = [], loading }) => {
  const documentStyle = getComputedStyle(document.documentElement);

  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data: dataSet,
          backgroundColor: [
            documentStyle.getPropertyValue("--cyan-500"),
            documentStyle.getPropertyValue("--indigo-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--orange-500"),
            documentStyle.getPropertyValue("--purple-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--cyan-400"),
            documentStyle.getPropertyValue("--indigo-400"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--orange-400"),
            documentStyle.getPropertyValue("--purple-400"),
          ],
        },
      ],
    }),
    [dataSet, documentStyle, labels]
  );

  const chartOptions = useMemo(
    () => ({
      cutout: "60%",
    }),
    []
  );

  if (loading) {
    return <Skeleton height={300}></Skeleton>;
  }

  return (
    <Chart
      type="doughnut"
      data={chartData}
      options={chartOptions}
      className="rounded-md border border-gray-200 py-5 bg-white shadow-sm flex items-center justify-center h-[300px]"
    />
  );
};

export default DeviceByCategoryPieChart;
