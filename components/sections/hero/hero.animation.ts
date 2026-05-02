import { useRef } from "react";
import gsap, { useGSAP } from "@/shared/lib/gsap";
import type { SectionRefs } from "./hero.types";

type UseHeroAnimationParams = {
  sectionRefs?: SectionRefs;
  onIntroComplete?: () => void;
};

export function useHeroAnimation({
  sectionRefs,
  onIntroComplete,
}: UseHeroAnimationParams = {}) {
  const container = useRef<HTMLDivElement>(null);
  const heroText1 = useRef<HTMLSpanElement>(null);
  const heroText2 = useRef<HTMLSpanElement>(null);
  const heroText3 = useRef<HTMLSpanElement>(null);
  const heroText4 = useRef<HTMLSpanElement>(null);
  const heroText5 = useRef<HTMLSpanElement>(null);
  const heroText6 = useRef<HTMLSpanElement>(null);
  const heroText7 = useRef<HTMLSpanElement>(null);
  const heroText8 = useRef<HTMLSpanElement>(null);
  const heroText9 = useRef<HTMLSpanElement>(null);
  const heroText10 = useRef<HTMLSpanElement>(null);
  const leftColContentRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const heroHeadlineRef = useRef<HTMLDivElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 1023px)",
          isLG: "(min-width: 1024px) and (max-width: 1279px)",
          isXL: "(min-width: 1280px) and (max-width: 1535px)",
          is2XL: "(min-width: 1536px)",
        },
        (context) => {
          const conditions = context.conditions as {
            isMobile: boolean;
            isLG: boolean;
            isXL: boolean;
            is2XL: boolean;
          };
          const { isMobile, isLG, isXL } = conditions;

          // Helper to pick values based on screen size
          const getVal = (
            mobile: number,
            lg: number,
            xl: number,
            xxl: number,
          ) => {
            if (isMobile) return mobile;
            if (isLG) return lg;
            if (isXL) return xl;
            return xxl;
          };

          const xOffset3 = getVal(-130, -250, -350, -430);
          const xOffset4 = getVal(150, 320, 450, 500);
          const yOffsetStart1 = getVal(200, 200, 300, 400);
          const yOffsetStart3 = getVal(200, 200, 300, 400);
          const yOffsetStart4 = getVal(100, 200, 300, 400);
          const yOffsetMid1 = getVal(60, 90, 120, 150);
          const yOffsetMid3 = getVal(63, 100, 130, 160);
          const yOffsetMid4 = getVal(32, 40, 40, 60);
          const xOffsetSmallNeg = getVal(-5, -20, -30, -40);
          const xOffsetSmallPos = getVal(5, 20, 30, 40);
          const yOffsetSmall = isMobile ? -100 : 0;

          const tl = gsap.timeline({
            onComplete: () => {
              // Signal to Home.client that the intro is done \u2014 it owns the scroll lock
              onIntroComplete?.();
            },
          });
          tl.set([heroText1.current], {
            y: yOffsetStart1,
            x: 0,
            opacity: 0,
            display: "block",
            willChange: "transform, opacity",
          });

          tl.set(heroText3.current, {
            y: yOffsetStart3,
            x: xOffset3,
            opacity: 0,
            display: "block",
            willChange: "transform, opacity",
          });
          tl.set(heroText4.current, {
            y: yOffsetStart4,
            x: xOffset4,
            opacity: 0,
            display: "block",
            willChange: "transform, opacity",
          });
          tl.set(
            [
              heroText2.current,
              heroText5.current,
              heroText6.current,
              heroText7.current,
              heroText8.current,
              heroText9.current,
              heroText10.current,
            ],
            {
              opacity: 0,
              display: "flex",
              willChange: "transform, opacity",
            },
          );
          
          // Pre-set columns for performance
          gsap.set([leftColContentRef.current, rightColRef.current], {
            willChange: "transform, opacity",
          });
          
          // Initial state for right col to help LCP - keep it mostly visible but scaled
          tl.set(rightColRef.current, {
            scale: 0.9,
            y: 30,
            opacity: 0.1, // Slight opacity to encourage LCP detection but still allow fade-in
          });

          tl.to(heroText1.current, {
            y: yOffsetMid1,
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
          });

          tl.to(heroText3.current, {
            y: yOffsetMid3,
            x: xOffset3,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
          });

          tl.to(heroText4.current, {
            y: yOffsetMid4,
            x: xOffset4,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
          });
          tl.to(
            heroText3.current,
            {
              y: 0,
              x: xOffset3,
              duration: 0.5,
              opacity: 1,
              display: "block",
              ease: "power2.out",
            },
            "-=0.15",
          );
          tl.to(
            heroText1.current,
            {
              y: 0,
              x: 0,
              duration: 0.5,
              opacity: 1,
              display: "block",
              ease: "power2.out",
            },
            "-=0.5",
          );
          tl.to(
            heroText4.current,
            {
              y: 0,
              x: 0,
              duration: 0.5,
              opacity: 1,
              display: "block",
              ease: "power2.out",
            },
            "-=0.25",
          );

          tl.to(
            heroText3.current,
            {
              y: 0,
              x: 0,
              duration: 0.5,
              opacity: 1,
              display: "block",
              ease: "power2.out",
            },
            "-=0.25",
          );
          tl.from(
            heroText2.current,
            {
              y: yOffsetSmall,
              x: xOffsetSmallNeg,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.25",
          );

          tl.from(
            [heroText5.current, heroText6.current],
            {
              y: yOffsetSmall,
              x: xOffsetSmallPos,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.5",
          );

          tl.from(
            [
              heroText7.current,
              heroText8.current,
              heroText9.current,
              heroText10.current,
            ],
            {
              y: yOffsetSmall,
              x: xOffsetSmallNeg,
              duration: 0.5,
              opacity: 1,

              ease: "power2.out",
            },
            "-=0.25",
          );
          tl.to(
            leftColContentRef.current,
            {
              y: 0,
              x: 0,
              duration: 0.6,
              opacity: 1,
              display: "flex",
              ease: "power2.out",
            },
            "-=0.4",
          );
          tl.to(
            rightColRef.current,
            {
              y: 0,
              x: 0,
              scale: 1,
              duration: 0.6,
              opacity: 1,
              ease: "power2.out",
            },
            "-=0.5",
          );

          // Play button entrance
          if (playButtonRef.current) {
            tl.fromTo(
              playButtonRef.current,
              { scale: 0, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" },
              "-=0.3",
            );
          }
        },
      );

      // Desktop-only: pin hero and scale video to fill viewport on scroll
      mm.add("(min-width: 1024px)", () => {
        if (!rightColRef.current || !container.current) return;

        gsap.set(rightColRef.current, {
          transformOrigin: "left bottom",
        });

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "+=80%",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Parallax: headline scales down and moves up
        scrollTl.to(
          heroHeadlineRef.current,
          { scale: 0.8, y: -500, opacity: 0, duration: 1, ease: "none" },
          0,
        );

        // Parallax: left column scales down and moves up
        scrollTl.to(
          leftColRef.current,
          { scale: 0.8, y: -500, opacity: 0, duration: 1, ease: "none" },
          0,
        );

        // Scale video to fill viewport with 2rem gap on all sides
        const gap = 32; // 2rem = 32px

        const targetScale = () => {
          const el = rightColRef.current!;
          const targetW = window.innerWidth - gap * 2;
          const targetH = window.innerHeight - gap * 2;
          const sX = targetW / el.offsetWidth;
          const sY = targetH / el.offsetHeight;
          return Math.max(sX, sY);
        };

        scrollTl.fromTo(
          rightColRef.current,
          { scale: 1, x: 0, y: 0, borderRadius: "1rem" },
          {
            scale: targetScale,
            x: () => {
              const el = rightColRef.current!;
              let left = 0;
              let cur: HTMLElement | null = el;
              while (cur) {
                left += cur.offsetLeft;
                cur = cur.offsetParent as HTMLElement | null;
              }
              return -left + gap;
            },
            y: () => {
              const el = rightColRef.current!;
              let top = 0;
              let cur: HTMLElement | null = el;
              while (cur) {
                top += cur.offsetTop;
                cur = cur.offsetParent as HTMLElement | null;
              }
              return window.innerHeight - (top + el.offsetHeight) - gap;
            },
            borderRadius: "1rem",
            zIndex: 10,
            duration: 1,
            ease: "none",
          },
          0,
        );

        // Allow play button to scale up, but only half as much as the video
        if (playButtonRef.current) {
          scrollTl.fromTo(
            playButtonRef.current,
            { scale: 1 },
            {
              scale: () => {
                const ts = targetScale();
                const halfScale = 1 + (ts - 1) * 0.5; // Grow 50% of the parent's growth
                return halfScale / ts; // Inverse the rest
              },
              ease: "none",
            },
            0,
          );
        }
      });
    },
    { scope: container },
  );

  const scrollToContact = () => {
    gsap.to(window, {
      scrollTo: "#contact-form",
      duration: 2,
      ease: "power2.out",
    });
  };

  const scrollToProject = () => {
    if (!sectionRefs?.projectRef.current) return;
    gsap.to(window, {
      scrollTo: sectionRefs.projectRef.current,
      duration: 2,
      ease: "power2.out",
    });
  };

  return {
    container,
    scrollToContact,
    scrollToProject,
    heroText1,
    heroText2,
    heroText3,
    heroText4,
    heroText5,
    heroText6,
    heroText7,
    heroText8,
    heroText9,
    heroText10,
    leftColContentRef,
    leftColRef,
    rightColRef,
    heroHeadlineRef,
    playButtonRef,
  };
}
