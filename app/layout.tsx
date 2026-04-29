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

import { siteMetadata } from "@/shared/config/metadata";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = siteMetadata;

import SmoothScroll from "@/components/common/SmoothScroll/SmoothScroll.client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${fraunces.variable} antialiased`}>
        <JsonLd />
        <GlobalBreakpointReload />
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
