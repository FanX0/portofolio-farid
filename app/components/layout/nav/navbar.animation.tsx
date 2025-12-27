import gsap, { ScrollTrigger } from "@/app/lib/gsap";

type NavbarAnimationParams = {
  container: HTMLElement;
};

export default function initNavbarAnimation({
  container,
}: NavbarAnimationParams) {
  const mm = gsap.matchMedia();
  mm.add("(min-width: 64rem)", () => {
    gsap.fromTo(
      ".nav-name",
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

    const aboutTl = gsap.timeline({ paused: true });

    ScrollTrigger.create({
      animation: aboutTl,
      start: 2900,
      end: 8450,
      scrub: true,
    });

    aboutTl
      .to(".nav-about", {
        y: 100,
        x: "-80%",
        fontSize: "17.5rem",
        fontWeight: 700,
        ease: "none",
      })
      .to(
        ".nav-about",
        {
          y: 0,
          x: 0,
          fontSize: "1.5625rem",
          fontWeight: 500,
          ease: "none",
        },
        "+=300%"
      );
  });
}
