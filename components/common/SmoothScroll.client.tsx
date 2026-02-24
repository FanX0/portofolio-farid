"use client";

import { useGSAP, ScrollSmoother } from "@/shared/lib/gsap";
import { ReactNode } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useGSAP(() => {
    // Check if we are in a browser environment
    if (typeof window !== "undefined") {
      ScrollSmoother.create({
        smooth: 1.5, // How long (in seconds) it takes to "catch up" to the native scroll position
        effects: true, // Looks for data-speed and data-lag attributes on elements
        smoothTouch: 0.1, // enable for touch devices
      });
    }
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
