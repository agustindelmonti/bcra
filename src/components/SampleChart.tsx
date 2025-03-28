"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SampleChartProps {
  data: Array<{
    fecha: string;
    sales: number;
    profit: number;
  }>;
}

export default function SampleChart({ data }: SampleChartProps) {
  const chartData = {
    labels: data.map((item) => item.fecha),
    datasets: [
      {
        label: "Sales",
        data: data.map((item) => item.sales),
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.5)",
      },
      {
        label: "Profit",
        data: data.map((item) => item.profit),
        borderColor: "rgb(79, 70, 229)",
        backgroundColor: "rgba(79, 70, 229, 0.5)",
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

  return <Line options={options} data={chartData} />;
}
