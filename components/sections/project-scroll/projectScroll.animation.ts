import gsap from "@/shared/lib/gsap";

type projectScrollParams = {
  container: HTMLElement;
};
export default function initProjectScroll({ container }: projectScrollParams) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: "+=400%",
      scrub: 1, // Changed from true to 1 for silky smooth interpolation
      pin: true,
    },
  });

  tl.to(".title-left", {
    x: "-40%",
    opacity: 0,
    duration: 1,
    ease: "power1.inOut",
  });
  tl.to(
    ".title-right",
    {
      x: "40%",
      opacity: 0,
      duration: 1,
      ease: "power1.inOut",
    },
    0,
  );
  tl.to(container, {
    backgroundColor: "var(--black-color)",
    duration: 1,
    ease: "power1.inOut",
  });

  const slowMiddleEase = (x: number) =>
    0.7 * (4 * Math.pow(x - 0.5, 3) + 0.5) + 0.3 * x;

  const mm = gsap.matchMedia();
  mm.add("(min-width: 80rem)", () => {
    tl.fromTo(
      ".line-1",
      {
        y: "150%",
      },
      {
        y: "10%",
        duration: 1,
        ease: "power1.inOut",
      },
      1,
    );
    tl.fromTo(
      ".line-2",
      {
        y: "-150%",
      },
      {
        y: "10%",
        duration: 1,
        ease: "power1.inOut",
      },
      1,
    );
    tl.fromTo(
      ".line-3",
      {
        y: "150%",
      },
      {
        y: "10%",
        duration: 1,
        ease: "power1.inOut",
      },
      1,
    );
    tl.to(
      ".line-1",
      {
        x: "-400%",
        duration: 1,
        opacity: 0,
        ease: slowMiddleEase,
      },
      2,
    );
    tl.to(
      ".line-2",
      {
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
      },
      2,
    );
    tl.to(
      ".line-3",
      {
        x: "400%",
        opacity: 0,
        duration: 1,
        ease: slowMiddleEase,
      },
      2,
    );
  });
  mm.add("(max-width: 80rem)", () => {
    tl.fromTo(
      ".line-1",
      { x: "100%" },
      {
        x: "-100%",
        duration: 1,
        ease: slowMiddleEase,
      },
      1,
    );
    tl.fromTo(
      ".line-2",
      { x: "-100%" },
      {
        x: "10%",
        duration: 1,
        ease: slowMiddleEase,
      },
      1,
    );
    tl.fromTo(
      ".line-3",
      { x: "100%" },
      {
        x: "-51%",
        duration: 1,
        ease: slowMiddleEase,
      },
      1,
    );
    tl.to(
      ".line-1",
      {
        y: "-120%",
        duration: 1,
        ease: "power1.inOut",
        opacity: 0,
      },
      2,
    );
    tl.to(
      ".line-2",
      {
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
      },
      2,
    );
    tl.to(
      ".line-3",
      {
        y: "120%",
        duration: 1,
        ease: "power1.inOut",
        opacity: 0,
      },
      2,
    );
  });
}
