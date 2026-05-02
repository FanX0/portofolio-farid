import gsap, { ScrollTrigger, useGSAP } from "@/shared/lib/gsap";
import { useRef, type RefObject } from "react";

export type SectionRefs = {
  heroRef: RefObject<HTMLElement | null>;
  aboutRef: RefObject<HTMLElement | null>;
  projectRef: RefObject<HTMLElement | null>;
  contactRef: RefObject<HTMLElement | null>;
};

type UseNavbarAnimationParams = {
  isOpen: boolean;
  isLoading: boolean;
  sectionRefs: SectionRefs;
};

export function useNavbarAnimation({
  isOpen,
  isLoading,
  sectionRefs,
}: UseNavbarAnimationParams) {
  const container = useRef<HTMLDivElement>(null);
  const toggleIconRef = useRef<SVGSVGElement>(null);
  const rotation = useRef(0);
  const lastIsOpen = useRef(isOpen);

  // ─── Progress Bars ──────────────────────────────────────────────────────────
  // Runs once when isLoading → false. By that time all section useGSAP hooks
  // have run and all pins (About, Avatar, ProjectScroll) are fully registered.
  // Using dependencies:[isLoading] is the only reliable way to guarantee
  // correct scroll positions without a race condition.
  useGSAP(
    () => {
      if (isLoading) return;
      if (!container.current) return;

      const { heroRef, aboutRef, projectRef, contactRef } = sectionRefs;
      if (
        !heroRef.current ||
        !aboutRef.current ||
        !projectRef.current ||
        !contactRef.current
      )
        return;

      const q = gsap.utils.selector(container.current);
      const mm = gsap.matchMedia();

      mm.add("(max-width: 64rem)", () => {
        gsap.fromTo(
          q(".progressbar-mobile-fill"),
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "max",
              scrub: 1,
            },
          },
        );
      });

      mm.add("(min-width: 64rem)", () => {
        gsap.fromTo(
          q(".progressbar-desktop-fill-name"),
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              endTrigger: aboutRef.current,
              end: "top top",
              scrub: true,
            },
          },
        );

        gsap.fromTo(
          q(".progressbar-desktop-fill-about"),
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: aboutRef.current,
              start: "top top",
              endTrigger: projectRef.current,
              end: "top top",
              scrub: true,
            },
          },
        );

        gsap.fromTo(
          q(".progressbar-desktop-fill-project"),
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: projectRef.current,
              start: "top top",
              endTrigger: contactRef.current,
              end: "top top",
              scrub: true,
            },
          },
        );

        gsap.fromTo(
          q(".progressbar-desktop-fill-contact"),
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top top",
              end: "max",
              scrub: true,
            },
          },
        );

        // Refresh so the newly-created triggers use accurate pinned positions.
        ScrollTrigger.refresh();
      });
    },
    { scope: container, dependencies: [isLoading] },
  );

  // ─── Toggle Icon ─────────────────────────────────────────────────────────────
  useGSAP(
    () => {
      if (!toggleIconRef.current) return;
      if (isOpen === lastIsOpen.current) return;

      rotation.current += 90;

      const q = gsap.utils.selector(toggleIconRef.current);

      gsap.to(toggleIconRef.current, {
        rotation: rotation.current,
        duration: 0.3,
        ease: "power2.inOut",
      });

      gsap.to(q(".toggle-bg"), {
        fill: isOpen ? "#ffffff" : "transparent",
        stroke: isOpen ? "#ffffff" : "#ffffff",
        duration: 0.3,
        ease: "power2.inOut",
      });

      gsap.to(q(".toggle-dot"), {
        fill: isOpen ? "#000000" : "#ffffff",
        duration: 0.3,
        ease: "power2.inOut",
      });

      lastIsOpen.current = isOpen;
    },
    { scope: container, dependencies: [isOpen] },
  );

  // ─── Scroll helpers ───────────────────────────────────────────────────────────
  const scrollToHome = () => {
    const lenis = window.lenis;
    if (lenis) {
      lenis.scrollTo("#hero", { duration: 1.2 });
    } else {
      gsap.to(window, {
        scrollTo: "#hero",
        duration: 1.2,
        ease: "power2.inOut",
      } as any);
    }
  };

  const scrollToAbout = () => {
    const lenis = window.lenis;
    if (lenis) {
      // We use an offset of 800 because the About section is pinned,
      // so we need to scroll 800px into the pin to see the text start animating.
      lenis.scrollTo("#about", { duration: 1.2, offset: 1200 });
    } else {
      gsap.to(window, {
        scrollTo: { y: "#about", offsetY: -1200 },
        duration: 1.2,
        ease: "power2.inOut",
      } as any);
    }
  };

  const scrollToProject = () => {
    const lenis = window.lenis;
    if (lenis) {
      lenis.scrollTo("#project-list", { duration: 1.2 });
    } else {
      gsap.to(window, {
        scrollTo: "#project-list",
        duration: 1.2,
        ease: "power2.inOut",
      } as any);
    }
  };

  const scrollToContact = () => {
    const lenis = window.lenis;
    if (lenis) {
      lenis.scrollTo("#contact-form", { duration: 1.2 });
    } else {
      gsap.to(window, {
        scrollTo: "#contact-form",
        duration: 1.2,
        ease: "power2.inOut",
      } as any);
    }
  };

  return {
    container,
    toggleIconRef,
    scrollToHome,
    scrollToAbout,
    scrollToProject,
    scrollToContact,
  };
}
