import { useRef } from "react";
import { ScrollTrigger, useGSAP } from "@/shared/lib/gsap";

export function useAboutAnimation() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      ScrollTrigger.create({
        trigger: container.current,
        start: "top top",
        end: "+=600%",
        scrub: true,
        pin: true,
      });
    },
    { scope: container },
  );

  return { container };
}
