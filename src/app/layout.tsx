import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/contexts/LocaleContext";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BCRA Dashboard",
  description:
    "Dashboard for visualizing time series data from Banco Central de la República Argentina",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR">
      <body className={inter.className}>
        <LocaleProvider>
          <Navbar />
          <main className="min-h-screen bg-background">{children}</main>
        </LocaleProvider>
      </body>
    </html>
  );
}
