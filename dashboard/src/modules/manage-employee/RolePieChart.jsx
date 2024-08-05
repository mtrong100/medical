import React, { useMemo } from "react";
import { Chart } from "primereact/chart";
import { Skeleton } from "primereact/skeleton";

const RolePieChart = ({ labels = [], dataSet = [], loading }) => {
  const documentStyle = getComputedStyle(document.documentElement);

  // Memoize chart data
  const chartData = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          data: dataSet,
          backgroundColor: [
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--green-500"),
            documentStyle.getPropertyValue("--pink-500"),
            documentStyle.getPropertyValue("--cyan-500"),
            documentStyle.getPropertyValue("--red-500"),
            documentStyle.getPropertyValue("--indigo-500"),
            documentStyle.getPropertyValue("--orange-500"),
            documentStyle.getPropertyValue("--purple-500"),
            documentStyle.getPropertyValue("--teal-500"),
            documentStyle.getPropertyValue("--bluegray-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--green-400"),
            documentStyle.getPropertyValue("--pink-400"),
            documentStyle.getPropertyValue("--cyan-400"),
            documentStyle.getPropertyValue("--red-400"),
            documentStyle.getPropertyValue("--indigo-400"),
            documentStyle.getPropertyValue("--orange-400"),
            documentStyle.getPropertyValue("--teal-400"),
            documentStyle.getPropertyValue("--purple-400"),
            documentStyle.getPropertyValue("--bluegray-400"),
          ],
        },
      ],
    };
  }, [labels, dataSet, documentStyle]);

  // Memoize chart options
  const chartOptions = useMemo(() => {
    return {
      cutout: "50%",
    };
  }, []);

  if (loading) {
    return <Skeleton height={350}></Skeleton>;
  }

  return (
    <Chart
      type="doughnut"
      data={chartData}
      options={chartOptions}
      className="rounded-md border p-5 bg-white shadow-md flex items-center justify-center h-[350px]"
    />
  );
};

export default RolePieChart;
