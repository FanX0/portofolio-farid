"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/shared/lib/gsap";
import gsap from "@/shared/lib/gsap";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    // @ts-expect-error - Expose lenis globally for easy access
    window.lenis = lenis;

    // If we have a pre-paint scroll lock, start Lenis in stopped state
    if (document.getElementById("pre-paint-scroll-lock")) {
      lenis.stop();
    }

    // Keep ScrollTrigger in sync with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame to GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP's built-in lag smoothing to avoid conflicts with Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Cleanup
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return <>{children}</>;
}
