import gsap, { ScrollTrigger, useGSAP } from "@/app/lib/gsap";
import { useRef } from "react";

type NavbarAnimationParams = {
  container: HTMLElement;
};

export default function initNavbarAnimation({
  container,
}: NavbarAnimationParams) {
  const q = gsap.utils.selector(container);

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
          start: 0,
          end: "max",
          scrub: true,
        },
      }
    );
  });

  mm.add("(min-width: 64rem)", () => {
    gsap.fromTo(
      q(".nav-name"),
      {
        fontSize: "17.5rem",
        fontWeight: 700,
        y: 100,
      },
      {
        y: 0,
        fontSize: "1.5625rem",
        fontWeight: 500,
        scrollTrigger: {
          start: 100,
          end: 500,
          scrub: true,
        },
      }
    );
  });

  gsap.fromTo(
    q(".progressbar-desktop-fill-name"),
    { scaleX: 0 },
    {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: 2850,
        scrub: true,
      },
    }
  );
  gsap.fromTo(
    q(".progressbar-desktop-fill-about"),
    { scaleX: 0 },
    {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        start: 2850,
        end: 11600,
        scrub: true,
      },
    }
  );
  gsap.fromTo(
    q(".progressbar-desktop-fill-project"),
    { scaleX: 0 },
    {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        start: 11600,
        end: 17500,
        scrub: true,
      },
    }
  );
  gsap.fromTo(
    q(".progressbar-desktop-fill-contact"),
    { scaleX: 0 },
    {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        start: 17500,
        end: 22550,
        scrub: true,
      },
    }
  );

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
}

type UseNavbarAnimationParams = {
  isOpen: boolean;
};

export function useNavbarAnimation({ isOpen }: UseNavbarAnimationParams) {
  const container = useRef<HTMLDivElement>(null);
  const toggleIconRef = useRef<SVGSVGElement>(null);
  const rotation = useRef(0);
  const lastIsOpen = useRef(isOpen);

  useGSAP(
    () => {
      if (!container.current) return;
      initNavbarAnimation({ container: container.current });
    },
    { scope: container }
  );

  useGSAP(
    () => {
      if (!toggleIconRef.current) return;
      if (isOpen === lastIsOpen.current) return;

      if (isOpen) {
        rotation.current += 90;
      } else {
        rotation.current += 90;
      }

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
    { scope: container, dependencies: [isOpen] }
  );

  const scrollToHome = () => {
    gsap.to(window, {
      scrollTo: 0,
      duration: 1,
      ease: "power2.inOut",
    });
  };

  const scrollToAbout = () => {
    gsap.to(window, {
      scrollTo: 2850,
      duration: 1,
      ease: "power2.inOut",
    });
  };

  const scrollToProject = () => {
    gsap.to(window, {
      scrollTo: 16300,
      duration: 1,
      ease: "power2.inOut",
    });
  };

  const scrollToContact = () => {
    gsap.to(window, {
      scrollTo: 22150,
      duration: 1,
      ease: "power2.inOut",
    });
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
