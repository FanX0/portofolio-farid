import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import GlobalBreakpointReload from "@/app/components/common/GlobalBreakpointReload";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
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
      <body className={`${poppins.variable} antialiased`}>
        <GlobalBreakpointReload />
        {children}
      </body>
    </html>
  );
}
