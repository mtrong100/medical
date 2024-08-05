import React, { useMemo } from "react";
import { Chart } from "primereact/chart";
import { Skeleton } from "primereact/skeleton";

const MedicineStatsLineChart = ({
  labels = [],
  dataSet1 = [],
  dataSet2 = [],
  loading,
}) => {
  // Memoize chartData to avoid unnecessary re-renders
  const chartData = useMemo(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    return {
      labels,
      datasets: [
        {
          label: "Số lượng thuốc",
          fill: false,
          borderColor: documentStyle.getPropertyValue("--cyan-500"),
          yAxisID: "y",
          tension: 0.4,
          data: dataSet1,
        },
        {
          label: "Giá trung bình",
          fill: false,
          borderColor: documentStyle.getPropertyValue("--green-500"),
          yAxisID: "y1",
          tension: 0.4,
          data: dataSet2,
        },
      ],
    };
  }, [dataSet1, dataSet2, labels]);

  // Memoize chartOptions to avoid unnecessary re-renders
  const chartOptions = useMemo(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    return {
      stacked: false,
      maintainAspectRatio: false,
      aspectRatio: 0.6,
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
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          type: "linear",
          display: true,
          position: "left",
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            drawOnChartArea: false,
            color: surfaceBorder,
          },
        },
      },
    };
  }, []);

  if (loading) {
    return <Skeleton height={400}></Skeleton>;
  }

  return (
    <Chart
      type="line"
      data={chartData}
      options={chartOptions}
      className="rounded-md border border-gray-200 p-5 bg-white shadow-sm flex items-center justify-center"
    />
  );
};

export default MedicineStatsLineChart;
