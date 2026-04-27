"use client";

import { useRef, useCallback, forwardRef, useImperativeHandle } from "react";
import gsap, { useGSAP } from "@/shared/lib/gsap";

type FlairButtonProps = {
  label: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  hasBorder?: boolean;
};

const FlairButton = forwardRef<HTMLButtonElement, FlairButtonProps>(
  ({ label, onClick, className = "", icon, hasBorder = true }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const flairRef = useRef<HTMLSpanElement>(null);
    const firstRef = useRef<HTMLSpanElement>(null);
    const secondRef = useRef<HTMLSpanElement>(null);

    useImperativeHandle(ref, () => buttonRef.current!);

    useGSAP(() => {
      if (!secondRef.current) return;
      gsap.set(secondRef.current, { yPercent: 120, opacity: 0 });
    }, { scope: buttonRef });

    const getXY = useCallback((e: React.MouseEvent) => {
      if (!buttonRef.current) return { x: 50, y: 50 };
      const { left, top, width, height } =
        buttonRef.current.getBoundingClientRect();
      return {
        x: gsap.utils.clamp(0, 100, ((e.clientX - left) / width) * 100),
        y: gsap.utils.clamp(0, 100, ((e.clientY - top) / height) * 100),
      };
    }, []);

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent) => {
        const { x, y } = getXY(e);
        if (flairRef.current) {
          gsap.set(flairRef.current, { xPercent: x, yPercent: y });
          gsap.killTweensOf(flairRef.current);
          gsap.to(flairRef.current, {
            scale: 1,
            duration: 0.7,
            ease: "expo.out",
          });
        }
        gsap.killTweensOf([firstRef.current, secondRef.current]);
        gsap
          .timeline()
          .to(
            firstRef.current,
            { yPercent: -120, opacity: 0, duration: 0.8, ease: "expo.out" },
            0,
          )
          .to(
            secondRef.current,
            { yPercent: 0, opacity: 1, duration: 0.8, ease: "expo.out" },
            0.05,
          );
      },
      [getXY],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent) => {
        const { x, y } = getXY(e);
        gsap.killTweensOf([
          firstRef.current,
          secondRef.current,
          flairRef.current,
        ]);
        gsap.to(flairRef.current, {
          xPercent: x,
          yPercent: y,
          scale: 0,
          duration: 0.6,
          ease: "expo.out",
        });
        gsap
          .timeline()
          .to(
            firstRef.current,
            { yPercent: 0, opacity: 1, duration: 1.2, ease: "expo.out" },
            0,
          )
          .to(
            secondRef.current,
            { yPercent: 120, opacity: 0, duration: 1.2, ease: "expo.out" },
            0.05,
          );
      },
      [getXY],
    );

    const handleMouseMove = useCallback(
      (e: React.MouseEvent) => {
        const { x, y } = getXY(e);
        gsap.to(flairRef.current, {
          xPercent: x,
          yPercent: y,
          duration: 0.5,
          ease: "power2.out",
        });
      },
      [getXY],
    );

    return (
      <button
        ref={buttonRef}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className={`group relative overflow-hidden rounded-full inline-flex items-center justify-center gap-2 text-white hover:text-black cursor-pointer transition-colors duration-300 ${className}`}
      >
        {/* Stroke border */}
        {hasBorder && (
          <span className="absolute inset-0 border-2 border-white rounded-full pointer-events-none" />
        )}

        {/* Flair blob */}
        <span
          ref={flairRef}
          className="absolute inset-0 scale-0 origin-[0_0] pointer-events-none"
        >
          <span className="absolute w-[170%] aspect-square bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        </span>

        {/* Icon */}
        {icon && <span className="relative z-[2]">{icon}</span>}

        {/* Text with flip effect */}
        <span className="relative h-[1.2em] overflow-hidden z-[2]">
          <span ref={firstRef} className="block leading-[1.2em]">
            {label}
          </span>
          <span
            ref={secondRef}
            className="absolute left-0 top-0 block leading-[1.2em]"
          >
            {label}
          </span>
        </span>
      </button>
    );
  },
);

FlairButton.displayName = "FlairButton";

export default FlairButton;
