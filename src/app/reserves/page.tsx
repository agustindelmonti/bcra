"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ResponseData, TimeSeriesData } from "@/types/bcra";
import ReservasChart from "@/components/ReservasChart";
import { format, subMonths } from "date-fns";
import { DateRangePicker, DateRangePickerValue } from "@tremor/react";

const BCRA_API_CONFIG = {
  baseUrl: "https://api.bcra.gob.ar/estadisticas/v3.0",
  defaultStartDate: format(subMonths(new Date(), 12), "yyyy-MM-dd"),
  defaultEndDate: format(new Date(), "yyyy-MM-dd"),
} as const;

export default function ReservasPage() {
  const [exchangeRate, setExchangeRate] = useState<TimeSeriesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: new Date(BCRA_API_CONFIG.defaultStartDate),
    to: new Date(BCRA_API_CONFIG.defaultEndDate),
  });

  const fetchData = async (startDate: string, endDate: string) => {
    try {
      setLoading(true);
      const response = await axios.get<ResponseData>(
        `${BCRA_API_CONFIG.baseUrl}/monetarias/1?desde=${startDate}&hasta=${endDate}`,
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
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(BCRA_API_CONFIG.defaultStartDate, BCRA_API_CONFIG.defaultEndDate);
  }, []);

  const handleDateRangeChange = (value: DateRangePickerValue) => {
    setDateRange(value);
    if (value.from && value.to) {
      const startDate = format(value.from, "yyyy-MM-dd");
      const endDate = format(value.to, "yyyy-MM-dd");
      fetchData(startDate, endDate);
    }
  };

  return (
    <div className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="mt-6">
        <div className="mb-6">
          <DateRangePicker
            className="max-w-md"
            value={dateRange}
            onValueChange={handleDateRangeChange}
            placeholder="Select date range"
          />
        </div>
        <ReservasChart data={exchangeRate} loading={loading} />
      </div>
    </div>
  );
}
