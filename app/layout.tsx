import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skara Ceilidh Band",
  description:
    "Modern ceilidh band from Scotland. Check availability and request a booking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className={`${sans.variable} ${display.variable}`}>{children}</body>
    </html>
  );
}
