import gsap, { ScrollTrigger } from "@/app/lib/gsap";

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
      q(".nav-name"),
      {
        fontSize: "6rem",
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
