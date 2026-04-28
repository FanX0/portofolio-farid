import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://faridazhari.com"
  ),
  title: {
    default: "Farid Azhari | Creative Developer & Frontend Specialist",
    template: "%s | Farid Azhari",
  },
  description:
    "Farid Azhari — Creative Developer specializing in turning digital interfaces into immersive experiences. Expert in GSAP, ScrollTrigger, Three.js, React, and Next.js for high-performance websites.",
  keywords: [
    "Farid Azhari",
    "Farid Azhari developer",
    "GSAP developer",
    "web animation",
    "scroll-based animation",
    "interactive landing page",
    "front-end developer",
    "React developer",
    "Next.js developer",
    "Framer Motion",
    "micro-interactions",
    "creative developer",
    "animated website",
    "Tailwind CSS",
    "responsive web design",
    "landing page expert",
    "Figma to code",
    "motion design",
    "JavaScript animation",
    "storytelling website",
    "UI/UX design",
    "ScrollTrigger",
    "creative coding",
  ],
  authors: [{ name: "Farid Azhari" }],
  creator: "Farid Azhari",
  publisher: "Farid Azhari",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Farid Azhari | Creative Developer & Frontend Specialist",
    description:
      "Farid Azhari — Turning digital interfaces into immersive experiences. Specializing in GSAP, ScrollTrigger, and Three.js to craft websites that come alive through performance and storytelling.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://faridazhari.com",
    siteName: "Farid Azhari Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Farid Azhari Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Farid Azhari | Creative Developer & Frontend Specialist",
    description:
      "Farid Azhari — Turning digital interfaces into immersive experiences. Specializing in GSAP, ScrollTrigger, and Three.js.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
