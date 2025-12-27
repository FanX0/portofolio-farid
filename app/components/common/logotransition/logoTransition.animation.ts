import gsap, { ScrollTrigger } from "@/app/lib/gsap";

type LogoTransitionParams = {
  container: HTMLElement;
};

export default function initLogoTransitionAnimation({
  container,
}: LogoTransitionParams) {
  const q = gsap.utils.selector(container);

  const leftLogo = q(".left-logo");
  const rightLogo = q(".right-logo");

  ScrollTrigger.create({
    trigger: container,
    start: "top top",
    end: "+=250%",
    pin: true,
    scrub: true,
  });

  const tl = gsap.timeline({});

  tl.to(leftLogo, {
    x: "-110%",
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: "+=100%",
      scrub: true,
    },
  });
  tl.to(
    rightLogo,
    {
      x: "110%",
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=100%",
        scrub: true,
      },
    },
    0
  );
}
