import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { Skeleton } from "primereact/skeleton";

export default function StackedBarChart({
  labels = [],
  dataSet1 = [],
  dataSet2 = [],
  dataSet3 = [],
  labelDataSet1 = "",
  labelDataSet2 = "",
  labelDataSet3 = "",
  loading,
  chartHeight = "400px",
}) {
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
          label: labelDataSet1,
          backgroundColor: documentStyle.getPropertyValue("--orange-500"),
          data: dataSet1,
        },
        {
          type: "bar",
          label: labelDataSet2,
          backgroundColor: documentStyle.getPropertyValue("--teal-500"),
          data: dataSet2,
        },
        {
          type: "bar",
          label: labelDataSet3,
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
  }, [
    dataSet1,
    dataSet2,
    dataSet3,
    labelDataSet1,
    labelDataSet2,
    labelDataSet3,
    labels,
  ]);

  if (loading) {
    return <Skeleton height={chartHeight}></Skeleton>;
  }

  return (
    <Chart
      type="bar"
      data={chartData}
      options={chartOptions}
      style={{ height: chartHeight }}
      className={`rounded-md border p-5 bg-white shadow-md flex items-center justify-center `}
    />
  );
}
