import { useRef } from "react";
import gsap, { useGSAP } from "@/app/lib/gsap";

export default function useNavCircleHover() {
  const navRef = useRef<HTMLButtonElement>(null);
  const navDot = useRef<HTMLDivElement>(null);
  const navCircle = useRef<HTMLDivElement>(null);
  const navArrow = useRef<SVGSVGElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (navCircle.current) {
        gsap.set(navCircle.current, { scale: 0 });
      }
    },
    { scope: navRef }
  );

  const onEnter = () => {
    if (!navRef.current || !navDot.current || !navCircle.current) return;

    // Kill any ongoing animation
    tlRef.current?.kill();

    gsap.to(navDot.current, {
      scale: 0,
      width: 0,
      autoAlpha: 0,
      duration: 0.3,
      ease: "power3.out",
      overwrite: true,
    });

    tlRef.current = gsap.timeline();

    tlRef.current.to(navCircle.current, {
      scale: 1,
      duration: 0.3,
      ease: "power3.out",
    });
    tlRef.current.fromTo(
      navArrow.current,
      { xPercent: -150, yPercent: 150 },
      {
        xPercent: 0,
        yPercent: 0,
        duration: 0.3,
        ease: "power3.out",
      },
      "<"
    );
  };

  const onLeave = () => {
    if (!navRef.current || !navDot.current || !navCircle.current) return;

    // Kill ongoing animation immediately
    tlRef.current?.kill();
    gsap.killTweensOf([navDot.current, navCircle.current, navArrow.current]);

    gsap.to(navDot.current, {
      scale: 1,
      width: "0.5rem",
      autoAlpha: 1,
      duration: 0.3,
      ease: "power3.out",
      overwrite: true,
    });

    const tlCircle = gsap.timeline();

    tlCircle.to(navArrow.current, {
      xPercent: 150,
      yPercent: -150,
      duration: 0.3,
      ease: "power3.out",
    });
    tlCircle.to(navCircle.current, {
      scale: 0,
      duration: 0.3,
      ease: "power3.out",
    });

    // Reset arrow position immediately (or maybe just keep it hidden/reset?)
    // User said "reset animation like kill animation".
    // Usually means stopping the movement.
    // We will reset the arrow to center or initial state so it's ready for next hover.
    gsap.set(navArrow.current, { xPercent: 0, yPercent: 0 });
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
