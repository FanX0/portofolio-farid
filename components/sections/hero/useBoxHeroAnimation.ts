import { useRef } from "react";
import gsap, { useGSAP } from "@/shared/lib/gsap";

export function useBoxHeroAnimation() {
  const circleArrowRef = useRef<HTMLDivElement>(null);
  const arrowContainerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const tlHoverRef = useRef<GSAPTimeline>(null);
  const loopTweenRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (!circleArrowRef.current || !arrowRef.current) return;

      gsap.set(circleArrowRef.current, { scale: 0 });

      tlHoverRef.current = gsap
        .timeline({ paused: true })
        .fromTo(
          circleArrowRef.current,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
          },
        );
    },
    { scope: circleArrowRef }, // Expanding scope if needed, or keeping tight
  );

  const onMouseEnter = () => {
    tlHoverRef.current?.play();
    loopTweenRef.current?.kill();

    if (arrowRef.current) {
      // Change arrow color to black
      gsap.to(arrowRef.current, {
        color: "#000000",
        duration: 0.3,
        overwrite: "auto",
      });

      // Snap to top, then loop top → bottom endlessly
      gsap.set(arrowRef.current, { y: -20, opacity: 0 });

      loopTweenRef.current = gsap
        .timeline({ repeat: -1 })
        .to(arrowRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        })
        .to(arrowRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
        })
        .set(arrowRef.current, { y: -20, opacity: 0 });
    }
  };

  const onMouseLeave = () => {
    tlHoverRef.current?.reverse();
    loopTweenRef.current?.kill();

    if (arrowContainerRef.current) {
      gsap.to(arrowContainerRef.current, {
        y: 0,
        x: 0,
        duration: 0.6,
        ease: "power3.out",
        overwrite: true,
      });
    }

    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        y: 0,
        opacity: 1,
        color: "currentColor",
        duration: 0.6,
        ease: "power3.out",
        overwrite: true,
      });
    }

    if (circleArrowRef.current) {
      gsap.to(circleArrowRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!circleArrowRef.current || !arrowContainerRef.current) return;

    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Magnetic effect for the circle/arrow area
    const centerX = rect.width - 40; 
    const centerY = rect.height / 2;

    const deltaX = (x - centerX) * 0.4;
    const deltaY = (y - centerY) * 0.4;

    // Circle follows quickly
    gsap.to(circleArrowRef.current, {
      x: deltaX,
      y: deltaY,
      duration: 0.6,
      ease: "power2.out",
    });

    // Arrow container follows with a slight lag/smoothness
    // This moves the whole masked area so the arrow doesn't get clipped
    gsap.to(arrowContainerRef.current, {
      x: deltaX,
      y: deltaY,
      duration: 1,
      ease: "power3.out",
    });
  };

  return {
    circleArrowRef,
    arrowContainerRef,
    arrowRef,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
  };
}
