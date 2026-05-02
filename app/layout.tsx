import type { Metadata } from "next";
import { Poppins, Fraunces } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/common/Cursor/Cursor.client";
import GlobalBreakpointReload from "@/components/common/GlobalBreakpointReload/GlobalBreakpointReload.client";
import JsonLd from "@/components/common/JsonLd/JsonLd.client";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Farid Azhari | Portfolio",
  description: "Creative developer specializing in modern web experiences.",
};

import SmoothScroll from "@/components/common/SmoothScroll/SmoothScroll.client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style id="pre-paint-scroll-lock">
          {`
            html {
              overflow: hidden !important;
            }
          `}
        </style>
      </head>
      <body className={`${poppins.variable} ${fraunces.variable} antialiased`}>
        <JsonLd />
        <GlobalBreakpointReload />
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
