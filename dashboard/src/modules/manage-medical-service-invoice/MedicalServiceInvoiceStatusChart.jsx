import React, { useMemo } from "react";
import { Chart } from "primereact/chart";
import { Skeleton } from "primereact/skeleton";

const MedicalServiceInvoiceStatusChart = ({ loading, dataSet = [] }) => {
  const documentStyle = getComputedStyle(document.documentElement);

  const chartData = useMemo(
    () => ({
      labels: ["Thanh toán", "Chưa thanh toán"],
      datasets: [
        {
          data: dataSet,
          backgroundColor: [
            documentStyle.getPropertyValue("--green-500"),
            documentStyle.getPropertyValue("--red-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--green-400"),
            documentStyle.getPropertyValue("--red-400"),
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
    return <Skeleton height={350}></Skeleton>;
  }

  return (
    <Chart
      type="pie"
      data={chartData}
      options={chartOptions}
      className="rounded-md border border-gray-200 py-5 bg-white shadow-sm flex items-center justify-center h-[350px]"
    />
  );
};

export default MedicalServiceInvoiceStatusChart;
