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
import { TimeSeriesData } from "@/types/bcra";
import ChartSkeleton from "./ChartSkeleton";
import { TRANSLATIONS, formatNumber, formatDate } from "@/utils/localization";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Chart configuration
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    tooltip: {
      callbacks: {
        label: (context: any) =>
          `${formatNumber(context.parsed.y)} ${
            TRANSLATIONS.dashboard.charts.reserves.tooltip
          }`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      grace: "5%",
      ticks: {
        callback: (value: number) => `${formatNumber(value)}M`,
      },
    },
  },
};

// Dataset styling
const datasetStyle = {
  borderColor: "rgb(59, 130, 246)",
  backgroundColor: "rgba(59, 130, 246, 0.5)",
  tension: 0.3,
};

interface ReservasChartProps {
  data: TimeSeriesData[];
  loading: boolean;
}

export default function ReservasChart({ data, loading }: ReservasChartProps) {
  if (loading) return <ChartSkeleton />;

  const sortedData = [...data].sort(
    (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
  );

  const chartData = {
    labels: sortedData.map((item) => formatDate(item.fecha)),
    datasets: [
      {
        label: `${TRANSLATIONS.dashboard.charts.reserves.title} (${TRANSLATIONS.dashboard.charts.reserves.yAxisLabel})`,
        data: sortedData.map((item) => item.valor),
        ...datasetStyle,
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">
        {TRANSLATIONS.dashboard.charts.reserves.title}
      </h2>
      <div style={{ height: "600px" }}>
        <Line options={chartOptions as any} data={chartData} />
      </div>
    </div>
  );
}
