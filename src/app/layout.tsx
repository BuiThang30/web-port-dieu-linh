import type { Metadata } from "next";
// Import cả 2 font từ thư viện Google Fonts của Next.js
import { Instrument_Serif, Instrument_Sans } from 'next/font/google';
import "./globals.css";
import Navbar from "../components/Navbar/Navbar";

// Cấu hình font Instrument Serif cho Navbar
const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

// Cấu hình font Instrument Sans cho trang About
const instrumentSans = Instrument_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

export const metadata: Metadata = {
  title: "Dieu-Linh Do Portfolio",
  description: "About me page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Đưa cả 2 biến font vào thẻ html
    <html lang="en" className={`${instrumentSerif.variable} ${instrumentSans.variable}`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}