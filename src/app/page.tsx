"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ResponseData, TimeSeriesData } from "@/types/bcra";
import ReservasChart from "@/components/ReservasChart";
import { format } from "date-fns";
import SampleChart from "@/components/SampleChart";

export default function Home() {
  const [exchangeRate, setExchangeRate] = useState<TimeSeriesData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ResponseData>(
          "https://api.bcra.gob.ar/estadisticas/v3.0/monetarias/1",
          {
            headers: {
              Authorization: process.env.NEXT_PUBLIC_BCRA_TOKEN,
            },
          }
        );

        const formattedData = response.data.results.map((item) => ({
          fecha: format(new Date(item.fecha), "yyyy-MM-dd"),
          valor: item.valor,
        }));

        setExchangeRate(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="mt-6">
        <div className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Sample Chart</h2>
          <div className="h-72">
            <SampleChart
              data={[
                { fecha: "2023-01-01", sales: 100, profit: 80 },
                { fecha: "2023-02-01", sales: 120, profit: 90 },
                { fecha: "2023-03-01", sales: 150, profit: 110 },
              ]}
            />
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold mt-8">BCRA Dashboard</h1>
      <div className="mt-6">
        <ReservasChart data={exchangeRate} loading={loading} />
      </div>
    </div>
  );
}
