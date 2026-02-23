"use client";

import type { ReactNode } from "react";
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
}: {
  children: ReactNode;
  className: string;
  start?: string;
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const splitText = new SplitText(container, { type: "chars" });

      gsap.from(splitText.chars, {
        y: "100%",
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <p ref={containerRef} className={`${className} overflow-hidden`}>
      {children}
    </p>
  );
};
export default TextMask;
