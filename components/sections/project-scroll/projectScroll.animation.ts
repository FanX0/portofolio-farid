import { useRef } from "react";
import gsap, { useGSAP } from "@/shared/lib/gsap";

export function useProjectScrollAnimation() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      const q = gsap.utils.selector(container.current);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=400%",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(q(".title-left"), {
        x: "-40%",
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
      });
      tl.to(
        q(".title-right"),
        {
          x: "40%",
          opacity: 0,
          duration: 1,
          ease: "power1.inOut",
        },
        0,
      );
      tl.to(container.current, {
        backgroundColor: "var(--black-color)",
        duration: 1,
        ease: "power1.inOut",
      });

      const slowMiddleEase = (x: number) =>
        0.7 * (4 * Math.pow(x - 0.5, 3) + 0.5) + 0.3 * x;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 80rem)", () => {
        tl.fromTo(
          q(".line-1"),
          {
            y: "150%",
          },
          {
            y: "10%",
            duration: 1,
            ease: "power1.inOut",
          },
          1,
        );
        tl.fromTo(
          q(".line-2"),
          {
            y: "-150%",
          },
          {
            y: "10%",
            duration: 1,
            ease: "power1.inOut",
          },
          1,
        );
        tl.fromTo(
          q(".line-3"),
          {
            y: "150%",
          },
          {
            y: "10%",
            duration: 1,
            ease: "power1.inOut",
          },
          1,
        );
        tl.to(
          q(".line-1"),
          {
            x: "-400%",
            opacity: 0,
            duration: 1,
            ease: slowMiddleEase,
          },
          2,
        );
        tl.to(
          q(".line-2"),
          {
            opacity: 0,
            duration: 1,
            ease: "power1.inOut",
          },
          2,
        );
        tl.to(
          q(".line-3"),
          {
            x: "400%",
            opacity: 0,
            duration: 1,
            ease: slowMiddleEase,
          },
          2,
        );
      });
      mm.add("(max-width: 80rem)", () => {
        tl.fromTo(
          q(".line-1"),
          { x: "100%" },
          {
            x: "-100%",
            duration: 1,
            ease: "power1.inOut",
          },
          1,
        );
        tl.fromTo(
          q(".line-2"),
          { x: "-100%" },
          {
            x: "100%",
            duration: 1,
            ease: "power1.inOut",
          },
          1,
        );
        tl.fromTo(
          q(".line-3"),
          { x: "100%" },
          {
            x: "-100%",
            duration: 1,
            ease: "power1.inOut",
          },
          1,
        );
        tl.to(
          q(".line-1"),
          {
            y: "-120%",
            duration: 1,
            ease: "power1.inOut",
            opacity: 0,
          },
          2,
        );
        tl.to(
          q(".line-2"),
          {
            opacity: 0,
            duration: 1,
            ease: "power1.inOut",
          },
          2,
        );
        tl.to(
          q(".line-3"),
          {
            y: "120%",
            duration: 1,
            ease: "power1.inOut",
            opacity: 0,
          },
          2,
        );
      });
    },
    { scope: container },
  );

  return { container };
}
