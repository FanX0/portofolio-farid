import type { Metadata } from "next";
import { Poppins, Fraunces } from "next/font/google";
import "./globals.css";
import GlobalBreakpointReload from "@/components/common/GlobalBreakpointReload";
import Cursor from "@/components/common/cursor/Cursor";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Portfolio Farid Azhari Nurcahyo",
  description: "Portfolio Farid Azhari Nurcahyo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${fraunces.variable} antialiased`}>
        <GlobalBreakpointReload />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
