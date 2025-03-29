"use client";

import Link from "next/link";
import LocaleButton from "./LocaleButton";
import { navigationLinks } from "@/config/navigation";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-3 text-white font-bold text-xl transition-transform hover:scale-105"
            >
              <span className="text-2xl">📊</span>
              <span className="tracking-wide">BCRA Dashboard</span>
            </Link>
            <div className="hidden md:flex ml-12 space-x-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-md transition-colors duration-200 font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-white/10 rounded-lg p-1">
              <LocaleButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
