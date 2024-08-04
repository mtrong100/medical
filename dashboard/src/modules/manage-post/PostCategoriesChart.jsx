import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { Skeleton } from "primereact/skeleton";

const PostCategoriesChart = ({ loading, dataSet = [], labels = [] }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);

    const data = {
      labels,
      datasets: [
        {
          data: dataSet,
          backgroundColor: [
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--green-500"),
            documentStyle.getPropertyValue("--pink-500"),
            documentStyle.getPropertyValue("--cyan-500"),
            documentStyle.getPropertyValue("--indigo-500"),
            documentStyle.getPropertyValue("--teal-500"),
            documentStyle.getPropertyValue("--orange-500"),
            documentStyle.getPropertyValue("--purple-500"),
            documentStyle.getPropertyValue("--red-500"),
            documentStyle.getPropertyValue("--bluegray-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--green-400"),
            documentStyle.getPropertyValue("--pink-400"),
            documentStyle.getPropertyValue("--cyan-400"),
            documentStyle.getPropertyValue("--indigo-400"),
            documentStyle.getPropertyValue("--teal-400"),
            documentStyle.getPropertyValue("--orange-400"),
            documentStyle.getPropertyValue("--purple-400"),
            documentStyle.getPropertyValue("--red-400"),
            documentStyle.getPropertyValue("--bluegray-400"),
          ],
        },
      ],
    };
    const options = {
      cutout: "50%",
    };

    setChartData(data);
    setChartOptions(options);
  }, [dataSet, labels]);

  if (loading) {
    return <Skeleton height={300}></Skeleton>;
  }

  return (
    <Chart
      type="doughnut"
      data={chartData}
      options={chartOptions}
      className={`rounded-md border border-gray-200 py-5 bg-white shadow-sm flex items-center justify-center h-[300px]`}
    />
  );
};

export default PostCategoriesChart;
