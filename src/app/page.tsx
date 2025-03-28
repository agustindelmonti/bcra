"use client";

import { Card, Title, LineChart } from "@tremor/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

interface TimeSeriesData {
  d: string; // date
  v: number; // value
}

export default function Home() {
  const [exchangeRate, setExchangeRate] = useState<TimeSeriesData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.bcra.gov.ar/series/v1/series/usd_of/datos/2023-01-01/2024-03-28",
          {
            headers: {
              Authorization: process.env.NEXT_PUBLIC_BCRA_TOKEN,
            },
          }
        );

        const formattedData = response.data.map((item: TimeSeriesData) => ({
          date: format(new Date(item.d), "MMM dd, yyyy"),
          "USD/ARS": item.v,
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
      <Title>BCRA Dashboard</Title>
      <div className="mt-6">
        <Card>
          <Title>USD/ARS Exchange Rate</Title>
          {loading ? (
            <div className="h-72 flex items-center justify-center">
              <p>Loading...</p>
            </div>
          ) : (
            <LineChart
              className="h-72 mt-4"
              data={exchangeRate}
              index="date"
              categories={["USD/ARS"]}
              colors={["blue"]}
              yAxisWidth={48}
              showAnimation
            />
          )}
        </Card>
      </div>
    </div>
  );
}
