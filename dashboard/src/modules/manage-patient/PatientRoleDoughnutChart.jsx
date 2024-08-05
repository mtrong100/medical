import React, { useMemo } from "react";
import { Chart } from "primereact/chart";
import { Skeleton } from "primereact/skeleton";

const PatientRoleDoughnutChart = ({ dataSet = [], loading }) => {
  const documentStyle = getComputedStyle(document.documentElement);

  // Memoize chart data
  const chartData = useMemo(() => {
    return {
      labels: ["Nam", "Nữ"],
      datasets: [
        {
          data: dataSet,
          backgroundColor: [
            documentStyle.getPropertyValue("--orange-500"),
            documentStyle.getPropertyValue("--purple-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--orange-400"),
            documentStyle.getPropertyValue("--purple-400"),
          ],
        },
      ],
    };
  }, [dataSet, documentStyle]);

  // Memoize chart options
  const chartOptions = useMemo(() => {
    return {
      cutout: "50%",
    };
  }, []);

  if (loading) {
    return <Skeleton height={250}></Skeleton>;
  }

  return (
    <Chart
      type="doughnut"
      data={chartData}
      options={chartOptions}
      className="rounded-md border p-5 bg-white shadow-md flex items-center justify-center h-[250px]"
    />
  );
};

export default PatientRoleDoughnutChart;
