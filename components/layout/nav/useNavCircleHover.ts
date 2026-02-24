import { useRef } from "react";
import gsap, { useGSAP } from "@/shared/lib/gsap";

export default function useNavCircleHover() {
  const navRef = useRef<HTMLButtonElement>(null);
  const navDot = useRef<HTMLDivElement>(null);
  const navCircle = useRef<HTMLDivElement>(null);
  const navArrow = useRef<SVGSVGElement>(null);

  const arrowTlRef = useRef<gsap.core.Timeline | null>(null);
  const resetTweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      if (!navCircle.current) {
        return;
      }
      gsap.set(navCircle.current, { scale: 0 });

      // Build a looping arrow timeline (same as mobile sidebar)
      if (navArrow.current) {
        const tl = gsap.timeline({ paused: true, repeat: -1 });

        tl.to(navArrow.current, {
          yPercent: -150,
          xPercent: 150,
          duration: 0.3,
          ease: "power2.in",
        })
          .set(navArrow.current, { yPercent: 150, xPercent: -150 })
          .to(navArrow.current, {
            yPercent: 0,
            xPercent: 0,
            duration: 0.3,
            ease: "power2.out",
          })
          .to({}, { duration: 0.1 });

        arrowTlRef.current = tl;
      }
    },
    { scope: navRef },
  );

  const onEnter = () => {
    if (!navRef.current || !navDot.current || !navCircle.current) return;

    // Kill any reset tween
    resetTweenRef.current?.kill();

    // Hide dot
    gsap.to(navDot.current, {
      scale: 0,
      width: 0,
      autoAlpha: 0,
      duration: 0.3,
      ease: "power3.out",
      overwrite: true,
    });

    // Show circle
    gsap.to(navCircle.current, {
      scale: 1,
      duration: 0.3,
      ease: "power3.out",
    });

    // Start looping arrow animation
    arrowTlRef.current?.restart();
  };

  const onLeave = () => {
    if (!navRef.current || !navDot.current || !navCircle.current) return;

    // Pause the looping arrow animation
    arrowTlRef.current?.pause();

    // Smoothly reset arrow to center
    if (navArrow.current) {
      resetTweenRef.current = gsap.to(navArrow.current, {
        yPercent: 0,
        xPercent: 0,
        duration: 0.2,
        overwrite: false,
      });
    }

    // Show dot
    gsap.to(navDot.current, {
      scale: 1,
      width: "0.5rem",
      autoAlpha: 1,
      duration: 0.3,
      ease: "power3.out",
      overwrite: true,
    });

    // Hide circle
    gsap.to(navCircle.current, {
      scale: 0,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  return {
    navRef,
    navDot,
    navCircle,
    navArrow,
    onEnter,
    onLeave,
  };
}
