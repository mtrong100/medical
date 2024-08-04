import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { Skeleton } from "primereact/skeleton";

const PostStatsChart = ({
  loading,
  labels = [],
  dataSet1 = [],
  dataSet2 = [],
  dataSet3 = [],
}) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels,
      datasets: [
        {
          type: "bar",
          label: "Bài viết",
          backgroundColor: documentStyle.getPropertyValue("--orange-500"),
          data: dataSet1,
        },
        {
          type: "bar",
          label: "Lượt xem",
          backgroundColor: documentStyle.getPropertyValue("--teal-500"),
          data: dataSet2,
        },
        {
          type: "bar",
          label: "Bình luận",
          backgroundColor: documentStyle.getPropertyValue("--purple-500"),
          data: dataSet3,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltips: {
          mode: "index",
          intersect: false,
        },
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [dataSet1, dataSet2, dataSet3, labels]);

  if (loading) {
    return <Skeleton height={300}></Skeleton>;
  }

  return (
    <Chart
      type="bar"
      data={chartData}
      options={chartOptions}
      className={`rounded-md border border-gray-200 p-5 bg-white shadow-sm flex items-center justify-center h-[300px]`}
    />
  );
};

export default PostStatsChart;
