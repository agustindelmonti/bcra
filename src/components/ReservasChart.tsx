"use client";

import { Line } from "react-chartjs-2";
import { TimeSeriesData } from "@/types/bcra";
import ChartSkeleton from "./ChartSkeleton";

interface ReservasChartProps {
  data: TimeSeriesData[];
  loading: boolean;
}

export default function ReservasChart({ data, loading }: ReservasChartProps) {
  if (loading) return <ChartSkeleton />;

  const chartData = {
    labels: data.map((item) => item.fecha),
    datasets: [
      {
        label: "Reservas Internacionales",
        data: data.map((item) => item.valor),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Reservas Internacionales</h2>
      <div className="h-72">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
}
