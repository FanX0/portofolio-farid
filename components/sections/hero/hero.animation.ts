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
          // Immediate sets for performance and to ensure they aren't 'invisible' if the timeline hasn't started
          gsap.set([heroText1.current], {
            y: yOffsetStart1,
            x: 0,
            autoAlpha: 0,
            willChange: "transform, opacity",
          });

          gsap.set(heroText3.current, {
            y: yOffsetStart3,
            x: xOffset3,
            autoAlpha: 0,
            willChange: "transform, opacity",
          });
          gsap.set(heroText4.current, {
            y: yOffsetStart4,
            x: xOffset4,
            autoAlpha: 0,
            willChange: "transform, opacity",
          });
          gsap.set(
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
              autoAlpha: 0,
              willChange: "transform, opacity",
            },
          );
          
          gsap.set([leftColContentRef.current, rightColRef.current], {
            autoAlpha: 0,
            willChange: "transform, opacity",
          });

          // Stage 1: Reveal the main words
          tl.to(
            [
              heroText1.current,
              heroText3.current,
              heroText4.current,
            ],
            {
              y: (i) => [yOffsetMid1, yOffsetMid3, yOffsetMid4][i],
              x: (i) => [0, xOffset3, xOffset4][i],
              autoAlpha: 1,
              duration: 1.5,
              stagger: 0.15,
              ease: "power3.out",
            },
          );

          // Stage 2: Settle into final positions
          tl.to(
            [heroText1.current, heroText3.current, heroText4.current],
            {
              y: 0,
              x: (i) => [0, 0, 0][i], // All settle to 0
              duration: 1.2,
              autoAlpha: 1,
              stagger: 0.1,
              ease: "power3.out",
            },
            "-=0.6",
          );

          // Note: heroText2 is animated later below as part of the cinematic flow
          tl.fromTo(
            heroText2.current,
            {
              y: yOffsetSmall,
              x: xOffsetSmallNeg,
              autoAlpha: 0,
            },
            {
              y: 0,
              x: 0,
              autoAlpha: 1,
              duration: 1.2,
              ease: "power3.out",
            },
            "-=0.5",
          );

          tl.fromTo(
            [heroText5.current, heroText6.current],
            {
              y: yOffsetSmall,
              x: xOffsetSmallPos,
              autoAlpha: 0,
            },
            {
              y: 0,
              x: 0,
              autoAlpha: 1,
              duration: 1.2,
              ease: "power3.out",
            },
            "-=0.8",
          );

          tl.fromTo(
            [
              heroText7.current,
              heroText8.current,
              heroText9.current,
              heroText10.current,
            ],
            {
              y: yOffsetSmall,
              x: xOffsetSmallNeg,
              autoAlpha: 0,
            },
            {
              y: 0,
              x: 0,
              autoAlpha: 1,
              duration: 1.2,
              stagger: 0.05,
              ease: "power3.out",
            },
            "-=0.5",
          );
          tl.to(
            [leftColContentRef.current, rightColRef.current],
            {
              y: 0,
              x: 0,
              duration: 1.5,
              autoAlpha: 1,
              stagger: 0.2,
              ease: "power3.out",
            },
            "-=0.8",
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

        // Cache layout measurements to avoid forced reflows during scroll.
        // These are recalculated on ScrollTrigger refresh (resize, etc).
        const gap = 32; // 2rem = 32px
        let cachedScale = 1;
        let cachedX = 0;
        let cachedY = 0;
        let cachedButtonScale = 1;

        const recalcMeasurements = () => {
          const el = rightColRef.current;
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const targetW = window.innerWidth - gap * 2;
          const targetH = window.innerHeight - gap * 2;
          const sX = targetW / rect.width;
          const sY = targetH / rect.height;
          cachedScale = Math.max(sX, sY);
          cachedX = -rect.left + gap;
          cachedY = window.innerHeight - (rect.top + rect.height) - gap;

          // Button scale: grow 50% of the parent's growth
          const halfScale = 1 + (cachedScale - 1) * 0.5;
          cachedButtonScale = halfScale / cachedScale;
        };

        // Initial calculation
        recalcMeasurements();

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "+=80%",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onRefresh: recalcMeasurements,
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
        // Uses cached values — no layout queries during scroll frames
        scrollTl.fromTo(
          rightColRef.current,
          { scale: 1, x: 0, y: 0, borderRadius: "1rem" },
          {
            scale: () => cachedScale,
            x: () => cachedX,
            y: () => cachedY,
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
              scale: () => cachedButtonScale,
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo("#contact-form", { duration: 2 });
    } else {
      const el = document.querySelector("#contact-form");
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  };

  const scrollToProject = () => {
    if (!sectionRefs?.projectRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(sectionRefs.projectRef.current, { duration: 2 });
    } else {
      sectionRefs.projectRef.current.scrollIntoView({ behavior: "smooth" });
    }
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
