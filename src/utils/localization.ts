import { es } from "date-fns/locale";

export const LOCALE = "es-AR";

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat(LOCALE, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatDate = (date: Date | string) => {
  return new Intl.DateTimeFormat(LOCALE, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
};

export const dateLocale = es;

export const TRANSLATIONS = {
  dashboard: {
    title: "Panel de Control BCRA",
    dateRangePlaceholder: "Seleccionar rango de fechas",
    charts: {
      reserves: {
        title: "Reservas Internacionales",
        yAxisLabel: "Millones USD",
        tooltip: "M USD",
      },
    },
  },
};
