// app/layout.tsx or app/layout.ts

import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ✅ Metadata export
export const metadata: Metadata = {
  title: "Salt and Light",
  description: "Salt and Light - A convocation of and for influence on world mountains",
  keywords: [
    "Salt and Light",
    "influence",
    "world mountains",
    "convocation",
    "purpose-driven",
  ],
  authors: [{ name: "Salt and Light" }],
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
