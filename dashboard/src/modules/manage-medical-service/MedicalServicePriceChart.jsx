import React, { useMemo } from "react";
import { Chart } from "primereact/chart";
import { Skeleton } from "primereact/skeleton";

const MedicalServicePriceChart = ({ loading, dataSet = [], labels }) => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

  // Memoize chart data
  const chartData = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: "Giá tiền dịch vụ",
          backgroundColor: documentStyle.getPropertyValue("--teal-500"),
          borderColor: documentStyle.getPropertyValue("--teal-500"),
          data: dataSet,
        },
      ],
    };
  }, [labels, documentStyle, dataSet]);

  // Memoize chart options
  const chartOptions = useMemo(() => {
    return {
      indexAxis: "y",
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor,
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
  }, [textColor, textColorSecondary, surfaceBorder]);

  if (loading) {
    return <Skeleton height={400}></Skeleton>;
  }

  return (
    <Chart
      type="bar"
      data={chartData}
      options={chartOptions}
      className="rounded-md border border-gray-200 p-5 bg-white shadow-sm flex items-center justify-center h-[400px]"
    />
  );
};

export default MedicalServicePriceChart;
