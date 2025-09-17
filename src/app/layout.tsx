import { ReactNode } from "react";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Salt and Light - A convocation of and for influence on world mountains" />
        <meta name="keywords" content="Salt and Light, influence, world mountains, convocation, purpose-driven" />
        <meta name="author" content="Salt and Light" />
        <link rel="icon" href="/main/sltlogo.png" type="image/png" />
        <title>Salt and Light</title>
      </head>
      <body className="bg-white text-gray-900">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
