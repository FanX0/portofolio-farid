import { useRef } from "react";
import gsap, { useGSAP } from "@/app/lib/gsap";

export function useBoxHeroAnimation() {
  const circleArrowRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const tlHoverRef = useRef<GSAPTimeline>(null);
  const loopTweenRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (!circleArrowRef.current || !arrowRef.current) return;

      gsap.set(circleArrowRef.current, { scale: 0 });

      tlHoverRef.current = gsap
        .timeline({ paused: true })
        .to(circleArrowRef.current, {
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.7)",
        })
        .to(
          arrowRef.current.querySelectorAll("path"),
          {
            stroke: "#000000",
            duration: 0.4,
            ease: "power2.out",
          },
          0
        );
    },
    { scope: circleArrowRef } // Expanding scope if needed, or keeping tight
  );

  const onMouseEnter = () => {
    tlHoverRef.current?.play();

    // Loop animation
    loopTweenRef.current?.kill();
    if (arrowRef.current) {
      loopTweenRef.current = gsap
        .timeline({ repeat: -1 })
        .fromTo(
          arrowRef.current,
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
        )
        .to(arrowRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
    }
  };

  const onMouseLeave = () => {
    tlHoverRef.current?.reverse();
    loopTweenRef.current?.kill();

    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.2,
        overwrite: true,
      });
    }
  };

  return {
    circleArrowRef,
    arrowRef,
    onMouseEnter,
    onMouseLeave,
  };
}
