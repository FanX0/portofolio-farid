import gsap, { ScrollTrigger } from "@/shared/lib/gsap";

type LogoTransitionParams = {
  container: HTMLElement;
};

export default function initLogoTransitionAnimation({
  container,
}: LogoTransitionParams) {
  const q = gsap.utils.selector(container);

  const leftLogo = q(".left-logo");
  const rightLogo = q(".right-logo");

  const heavyEaseIn = (x: number) => x ** 5; // Even slower start, feels significantly "heavier" to open

  ScrollTrigger.create({
    trigger: container,
    start: "top top",
    end: "+=250%",
    pin: true,
    scrub: 1.5,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: "+=100%",
      scrub: 1.5,
    },
  });

  tl.to(leftLogo, {
    x: "-110%",
    ease: heavyEaseIn,
  });
  tl.to(
    rightLogo,
    {
      x: "110%",
      ease: heavyEaseIn,
    },
    0,
  );
}
