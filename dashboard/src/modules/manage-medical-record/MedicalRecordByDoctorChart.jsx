import React, { useMemo } from "react";
import { Chart } from "primereact/chart";
import { Skeleton } from "primereact/skeleton";

const MedicalRecordByDoctorChart = ({ labels = [], dataSet = [], loading }) => {
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
          label: "số lượng hồ sơ bệnh án theo bác sĩ lập",
          backgroundColor: documentStyle.getPropertyValue("--teal-500"),
          borderColor: documentStyle.getPropertyValue("--teal-500"),
          data: dataSet,
        },
      ],
    };
  }, [dataSet, documentStyle, labels]);

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
    return <Skeleton height={350}></Skeleton>;
  }

  return (
    <Chart
      type="bar"
      data={chartData}
      options={chartOptions}
      className="rounded-md border border-gray-200 p-5 bg-white shadow-sm flex items-center justify-center h-[350px]"
    />
  );
};

export default MedicalRecordByDoctorChart;
