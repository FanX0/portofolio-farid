"use client";

import type { ReactNode, ElementType } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const TextMask = ({
  children,
  className,
  start,
  as: Component = "p",
}: {
  children: ReactNode;
  className?: string;
  start?: string;
  as?: ElementType;
}) => {
  const containerRef = useRef<any>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // Split by lines first, then words
      // We wrap lines to create a "mask" for each line
      const split = new SplitText(container, {
        type: "lines, words",
        linesClass: "overflow-hidden",
      });

      gsap.from(split.words, {
        y: "110%",
        stagger: 0.02,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: start || "top 90%",
        },
      });

      return () => {
        split.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <Component ref={containerRef} className={`${className || ""}`}>
      {children}
    </Component>
  );
};
export default TextMask;
