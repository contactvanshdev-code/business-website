import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";

import "./globals.css";

import FloatingNavbar from "@/components/layout/FloatingNavbar";
import Providers from "./providers";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-orbitron"
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "ONYX AUTO LAB | Surface Science Detailing",
  description:
    "High-end paint correction, ceramic coatings, and precision PPF driven by measurable surface science.",
  metadataBase: new URL("https://onyxautolab.com")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${inter.variable} text-slate-200 antialiased`}>
        <Providers>
          <div className="pointer-events-none fixed inset-0 -z-10 lab-grid opacity-[0.14]" />
          <FloatingNavbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
