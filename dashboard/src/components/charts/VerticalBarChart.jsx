import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { Skeleton } from "primereact/skeleton";

export default function VerticalBarChart({
  labels = [],
  dataSet1 = [],
  dataSet2 = [],
  labelDataSet1 = "",
  labelDataSet2 = "",
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
          label: labelDataSet1,
          backgroundColor: documentStyle.getPropertyValue("--green-500"),
          borderColor: documentStyle.getPropertyValue("--green-500"),
          data: dataSet1,
        },
        {
          label: labelDataSet2,
          backgroundColor: documentStyle.getPropertyValue("--orange-500"),
          borderColor: documentStyle.getPropertyValue("--orange-500"),
          data: dataSet2,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            fontColor: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [dataSet1, dataSet2, labelDataSet1, labelDataSet2, labels]);

  if (loading) {
    return <Skeleton height={chartHeight}></Skeleton>;
  }

  return (
    <Chart
      type="bar"
      data={chartData}
      options={chartOptions}
      style={{ height: chartHeight }}
      className="rounded-md border p-5 bg-white shadow-md"
    />
  );
}
