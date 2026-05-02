"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const TextMaskScroll = ({
  children,
  className,
  startMobile,
  endMobile,
  startDesktop,
  endDesktop,
  trigger,
}: {
  children: ReactNode;
  className: string;
  startMobile?: string | number;
  endMobile?: string | number;
  startDesktop?: string | number;
  endDesktop?: string | number;
  trigger?: string | HTMLElement;
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const normalize = (value?: number | string) => {
    if (value === undefined) return undefined;
    if (typeof value === "number") return value;
    const num = Number(value);
    return Number.isNaN(num) ? value : Math.round(num);
  };

  const startM = normalize(startMobile);
  const endM = normalize(endMobile);
  const startD = normalize(startDesktop);
  const endD = normalize(endDesktop);

  useGSAP(
    (context) => {
      const container = containerRef.current;
      if (!container) return;

      const text = container.querySelector(".text-mask-inner");
      if (!text) return;

      const splitText = new SplitText(text as HTMLElement, { type: "chars" });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 80rem)", () => {
        gsap.from(splitText.chars, {
          yPercent: 100,
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: trigger || container,
            start: startD,
            end: endD,
            scrub: true,
          },
        });
      });
      mm.add("(max-width: 80rem)", () => {
        gsap.from(splitText.chars, {
          yPercent: 100,
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: trigger || text,
            start: startM,
            end: endM,
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <p ref={containerRef} className={className}>
      <span className="text-mask-inner block overflow-hidden">
        {children}
      </span>
    </p>
  );
};
export default TextMaskScroll;
