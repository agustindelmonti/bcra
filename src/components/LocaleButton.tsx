"use client";

import { useLocale } from "@/contexts/LocaleContext";

export default function LocaleButton() {
  const { locale } = useLocale();

  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600 transition-colors"
      disabled
    >
      <span className="font-medium">🇦🇷 Argentina</span>
    </button>
  );
}
